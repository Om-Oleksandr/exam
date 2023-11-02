const db = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');
const { APPROVED, PENDING, REJECTED } = CONSTANTS.APPROVE_STATUSES;
module.exports.dataForContest = async (req, res, next) => {
  try {
    const response = {};
    const {
      body: { characteristic1, characteristic2 },
    } = req;
    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean
    );
    const characteristics = await db.Select.findAll({
      where: {
        type: {
          [db.Sequelize.Op.or]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError('not found selects'));
    }
    characteristics.forEach(characteristic => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    return res.send(response);
  } catch (err) {
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const { contestid, limit, page } = req.headers;
    const { role, userId } = req.tokenData;

    let contestInfo = await db.Contest.findOne({
      where: { id: contestid },
      order: [[db.Offer, 'id', 'asc']],
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Offer,
          required: false,
          where:
            req.tokenData.role === CONSTANTS.ROLES.CREATOR ? { userId } : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: db.Rating,
              required: false,
              where: { userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });

    contestInfo = contestInfo.get({ plain: true });
    const allOffers = await db.Offer.findAll({
      where: {
        contestId: contestInfo.id,
      },
    });
    contestInfo.validOffers =
      role === CONSTANTS.ROLES.CREATOR
        ? allOffers.length
        : contestInfo.Offers.filter(
            offer =>
              offer.approvedStatus ===
              (role === CONSTANTS.ROLES.MODERATOR ? PENDING : APPROVED)
          ).length;

    const offers = await db.Offer.findAll({
      where: {
        contestId: contestInfo.id,
        approvedStatus:
          role === CONSTANTS.ROLES.MODERATOR
            ? PENDING
            : role === CONSTANTS.ROLES.CUSTOMER
            ? APPROVED
            : { [db.Sequelize.Op.or]: [PENDING, APPROVED, REJECTED] },
      },
      order:
        role === CONSTANTS.ROLES.CUSTOMER
          ? [['buyerDecision', 'asc']]
          : [['id', 'desc']],
      offset: (page - 1) * limit,
      limit: limit,
      attributes: { exclude: ['userId', 'contestId'] },
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Rating,
          required: false,
          where: { userId },
          attributes: { exclude: ['userId', 'offerId'] },
        },
      ],
    });

    contestInfo.Offers = offers.map(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
      return offer;
    });

    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const contestId = req.body.contestId;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId,
    });
    return res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.CONTEST_TYPES.LOGO) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await db.Offer.create(obj, {
      include: [
        {
          model: db.User,
          through: {
            attributes: ['avatar', 'firstName', 'lastName', 'email', 'rating'],
          },
          required: true,
        },
      ],
    });
    const user = await result.getUser();
    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const data = { result, user };
    return res.send(data);
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { buyerDecision: CONSTANTS.OFFER_STATUSES.REJECTED },
    { id: offerId }
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Some of yours offers was rejected',
      contestId
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
        CONSTANTS.CONTEST_STATUSES.FINISHED
      }'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
        CONSTANTS.CONTEST_STATUSES.ACTIVE
      }'
            ELSE '${CONSTANTS.CONTEST_STATUSES.PENDING}'
            END
    `),
    },
    { orderId },
    transaction
  );
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction
  );
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      buyerDecision: db.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUSES.WON}'
            ELSE '${CONSTANTS.OFFER_STATUSES.REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction
  );
  transaction.commit();
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId
    );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
  return updatedOffers[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId
      );
      return res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction
      );
      return res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

module.exports.getCustomersContests = (req, res, next) => {
  db.Contest.findAll({
    where: { status: req.headers.status, userId: req.tokenData.userId },
    limit: req.headers.limit,
    offset: req.headers.offset ? req.headers.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offer,
        required: false,
        attributes: ['id', 'approvedStatus'],
        where: { approvedStatus: CONSTANTS.APPROVE_STATUSES.APPROVED },
      },
    ],
  })
    .then(contests => {
      contests.forEach(contest => {
        contest.dataValues.validOffers = contest.dataValues.Offers.length;
        delete contest.dataValues.Offers;
      });
      let haveMore = true;
      if (contests.length < req.headers.limit) {
        haveMore = false;
      }
      return res.send({ contests, haveMore });
    })
    .catch(err => next(new ServerError(err)));
};

module.exports.getContests = async (req, res, next) => {
  try {
    const contests = await db.Contest.findAll({
      where: { status: 'active' },
      include: [
        {
          model: db.Offer,
        },
      ],
    });
    contests.forEach(
      contest =>
        (contest.dataValues.validOffers = contest.dataValues.Offers.length)
    );
    res.send({ contests });
  } catch (error) {
    next(error);
  }
};

module.exports.getModeratorContests = async (req, res, next) => {
  try {
    const { page, limit } = req.headers;
    const contests = await db.Contest.findAll({
      include: [
        {
          model: db.Offer,
          where: { approvedStatus: CONSTANTS.APPROVE_STATUSES.PENDING },
          attributes: ['id'],
        },
      ],
      order: [['id', 'ASC']],
      offset: (page - 1) * limit,
      limit: limit,
    });
    contests.forEach(
      contest =>
        (contest.dataValues.validOffers = contest.dataValues.Offers.length)
    );
    res.send({ data: { contests, totalContests: contests.length } });
  } catch (error) {
    next(error);
  }
};

module.exports.setModeratorDecision = async (req, res, next) => {
  try {
    const { body } = req;
    await db.Offer.update(
      { approvedStatus: body.status },
      {
        where: { id: body.id },
      }
    );
    const contestOffers = await db.Offer.findAll({
      where: {
        contestId: body.contestId,
        approvedStatus: CONSTANTS.APPROVE_STATUSES.PENDING,
      },
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
      ],
      order: [['id', 'ASC']],
      offset: (body.page - 1) * body.limit,
      limit: body.limit,
    });
    res.send({ contestOffers });
  } catch (error) {
    next(error);
  }
};
