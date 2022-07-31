// knex queries to crud our database
const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);
const dbOperationHelpers = require('./dbOperationHelpers');

module.exports = {
  updateTopic,
  updateQuiz,
  updateQuestion,
  updateUser,
  updateUserStat,
};

// expects: (number, JSON string)
function updateTopic(id, changes) {
  return dbOperationHelpers.updater('topic', id, changes);
}

// expects: (number, JSON string)
function updateQuiz(id, changes) {
  return dbOperationHelpers.updater('quiz', id, changes);
}

// expects: (number, JSON string)
function updateQuestion(id, changes) {
  return dbOperationHelpers.updater('question', id, changes);
}

// expects: (number, JSON string)
function updateUser(id, changes) {
  return dbOperationHelpers.updater('user', id, changes);
}

// expects: (number, JSON string)
function updateUserStat(id, changes) {
  const table = 'userQuizStats';


  return dbOperationHelpers.updater(table, id, changes);
}
