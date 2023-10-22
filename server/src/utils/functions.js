const db = require('../models');
const CONSTANTS = require('../constants');

module.exports.createWhereForAllContests = (
  typeIndex,
  contestId,
  industry,
  awardSort
) => {
  const object = {
    where: {},
    order: [],
  };
  if (typeIndex) {
    Object.assign(object.where, { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) {
    Object.assign(object.where, { id: contestId });
  }
  if (industry) {
    Object.assign(object.where, { industry });
  }
  if (awardSort) {
    object.order.push(['prize', awardSort]);
  }
  Object.assign(object.where, {
    status: {
      [ db.Sequelize.Op.or ]: [
        CONSTANTS.CONTEST_STATUSES.FINISHED,
        CONSTANTS.CONTEST_STATUSES.ACTIVE,
      ],
    },
  });
  object.order.push(['id', 'desc']);
  return object;
};

function getPredicateTypes (index) {
  return { [ db.Sequelize.Op.or ]: [types[ index ].split(',')] };
}

module.exports.handleParticipants = (firstId, secondId) => {
  const participant1 = firstId < secondId ? firstId : secondId;
  const participant2 = firstId > secondId ? firstId : secondId;
  return { participant1, participant2 };
};

module.exports.handleList = (chat, id, property, flag) => {
  chat.participant1 === id
    ? (chat[property][0] = flag)
    : (chat[property][1] = flag);
  chat.dataValues.participants = [chat.participant1, chat.participant2];
  chat.changed(property, true);
  delete chat.dataValues.participant1;
  delete chat.dataValues.participant2;
  return chat;
};

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];
