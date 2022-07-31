// knex queries to crud our database
const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);
const dbOperationHelpers = require('./dbOperationHelpers');
const dbFinder = require('./dbFind');

module.exports = {
  removeTopic,
  removeTopics,
  removeQuiz,
  removeQuestion,
  removeUser,
  removeUserStat,
};

// all records with relations are removed recursively

function removeTopics() {
  dbFinder
    .findAllTopics()
    .then(topics => {
      topics.forEach(topic => {
        removeTopic(topic.id);
      });
    })
    .catch(err =>
      console.log(`unable to perform 'findAllTopics' operation: ${err}`)
    );
}

// expects: (number)
function removeTopic(id) { 

  return dbOperationHelpers.remover('topic', id);
}

// expects: (number)
function removeQuiz(id) {  
  return dbOperationHelpers.remover('quiz', id);
}

// expects: (number)
function removeQuestion(id) {
  return dbOperationHelpers.remover('question', id);
}

// expects: (number)
function removeUser(id) {
  const userStatsToRemove = db('userQuizStats')
    .where({ userId_fk: id })
    .select('id');

  userStatsToRemove.forEach(userStatId => {
    removeUserStat(userStatId);
  });

  return dbOperationHelpers.remover('user', id);
}

// expects: (number)
function removeUserStat(id) {
  return dbOperationHelpers.remover('userQuizStats', id);
}
