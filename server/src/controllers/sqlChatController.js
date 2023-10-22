const { Op } = require('sequelize');
const {
  Conversation,
  Message,
  Catalog,
  User,
  sequelize,
} = require('../models');
const controller = require('../socketInit');
const { handleParticipants, handleList } = require('../utils/functions');

module.exports.addMessage = async (req, res, next) => {
  try {
    const {
      tokenData: { userId, firstName, lastName, displayName, avatar, email },
      body: { messageBody, recipient },
    } = req;

    const { participant1, participant2 } = handleParticipants(
      userId,
      recipient
    );
    const newConversation = await Conversation.findOrCreate({
      where: { participant1, participant2 },
    });
    const newMessage = await Message.create({
      sender: userId,
      body: messageBody,
      conversationId: newConversation[0].dataValues.id,
    });

    newMessage.dataValues.participants = [participant1, participant2];

    const preview = {
      id: newConversation[0].dataValues.id,
      sender: userId,
      text: messageBody,
      createAt: newMessage.createdAt,
      participants: [participant1, participant2],
      blackList: newConversation[0].dataValues.blackList,
      favoriteList: newConversation[0].dataValues.favoriteList,
      interlocutor: {
        userId,
        firstName,
        lastName,
        displayName,
        avatar,
        email,
      },
    };

    controller.getChatController().emitNewMessage(recipient, {
      newMessage,
      preview,
    });
    res.send({ newMessage, preview });
  } catch (error) {
    next(error);
  }
};

module.exports.getChat = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
      body: { interlocutorId },
    } = req;
    const { participant1, participant2 } = handleParticipants(
      userId,
      interlocutorId
    );
    const messages = await Message.findAll({
      include: [
        {
          model: Conversation,
          where: { participant1, participant2 },
        },
      ],
    });

    const interlocutor = await User.findByPk(interlocutorId, {
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    res.send({ messages, interlocutor });
  } catch (error) {
    next(error);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
    } = req;

    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [{ participant1: userId }, { participant2: userId }],
      },
    });
    const interlocutors = [];
    conversations.forEach(conversation => {
      if (conversation.participant1 === userId) {
        interlocutors.push(conversation.participant2);
      } else {
        interlocutors.push(conversation.participant1);
      }
    });
    const senders = await User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    conversations.forEach(conversation => {
      conversation.dataValues.participants = [
        conversation.participant1,
        conversation.participant2,
      ];
      senders.forEach(
        ({ dataValues: { id, firstName, lastName, displayName, avatar } }) => {
          conversation.participant1 === id || conversation.participant2 === id
            ? (conversation.dataValues.interlocutor = {
                id,
                firstName,
                lastName,
                displayName,
                avatar,
              })
            : null;
        }
      );
      delete conversation.dataValues.participant1;
      delete conversation.dataValues.participant2;
    });
    res.send({ conversations });
  } catch (error) {
    next(error);
  }
};

module.exports.blackList = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
      body: {
        participants: [participant1, participant2],
        blackListFlag,
      },
    } = req;
    const chat = await Conversation.findOne({
      where: {
        participant1,
        participant2,
      },
    });
    handleList(chat, userId, 'blackList', blackListFlag);

    await chat.save();

    const interlocutorId =
      participant1 !== userId ? participant1 : participant2;

    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);

    res.send({ chat });
  } catch (error) {
    next(error);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
      body: {
        participants: [participant1, participant2],
        favoriteFlag,
      },
    } = req;
    const chat = await Conversation.findOne({
      where: {
        participant1,
        participant2,
      },
    });

    handleList(chat, userId, 'favoriteList', favoriteFlag);
    
    await chat.save();
    console.log(chat);
    res.send({ chat });
  } catch (error) {
    next(error);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
      body: { catalogName, chatId },
    } = req;
    const catalog = await Catalog.create({
      userId: userId,
      catalogName: catalogName,
      conversations: [chatId],
    });
    res.send({ catalog });
  } catch (error) {
    next(error);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const { catalogName, catalogId } = req.body;
    const [affectedRows, catalog] = await Catalog.update(
      { catalogName },
      { where: { id: catalogId }, returning: true }
    );
    res.send(...catalog);
  } catch (error) {
    next(error);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const {
      body: { chatId, catalogId },
    } = req;

    const [affectedRows, catalog] = await Catalog.update(
      {
        conversations: sequelize.fn(
          'array_append',
          sequelize.col('conversations'),
          chatId
        ),
      },
      {
        where: {
          id: catalogId,
          [Op.not]: { conversations: { [Op.contains]: [chatId] } },
        },
        returning: true,
      }
    );
    res.send(...catalog);
  } catch (error) {
    next(error);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const {
      body: { chatId, catalogId },
    } = req;
    const [affectedRows, catalog] = await Catalog.update(
      {
        conversations: sequelize.fn(
          'array_remove',
          sequelize.col('conversations'),
          chatId
        ),
      },
      {
        where: { id: catalogId },
        returning: true,
      }
    );
    res.send(...catalog);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const {
      body: { catalogId },
    } = req;
    await Catalog.destroy({
      where: {
        id: catalogId,
      },
    });
    res.send();
  } catch (error) {
    next(error);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
    } = req;
    const catalogs = await Catalog.findAll({
      where: {
        userId,
      },
    });
    res.send({ catalogs });
  } catch (error) {
    next(error);
  }
};
