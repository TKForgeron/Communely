// knex queries to crud our database
const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);
const dbOperationHelpers = require('./dbOperationHelpers');

module.exports = {
  findAllQuestions,
  findAllQuizzes,
  findAllTopics,
  findAllUsers,

  findTopicById,
  findTopicByQuizId,
  findQuizById,
  findQuestionAnswerById,
  findQuestionById,
  findUserByUsername,
  findUserById,
  findUserIdByUsername,

  findQuizzesByTopicId,
  findQuestionsByQuizId,
  findStatsByUserId,
  findStatsByUsername,
};

function findAllQuestions() {
  return db('question');
}

function findAllQuizzes() {
  return db('quiz');
}

function findAllTopics() {
  return db('topic');
}

function findAllUsers() {
  return db('user');
}

// expects: (number)
function findTopicById(id) {
  return dbOperationHelpers.finder('topic', id);
}

async function findTopicByQuizId(id) {
  let firstQuizButThenTopicForMemoryEfficiency = {};

  await dbOperationHelpers
    .finder('quiz', id)
    .then(resQuiz => {
      firstQuizButThenTopicForMemoryEfficiency = resQuiz; // quiz
      findTopicById(firstQuizButThenTopicForMemoryEfficiency.topicId_fk)
        .then(resTopic => {
          firstQuizButThenTopicForMemoryEfficiency = resTopic; // topic
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });

  return firstQuizButThenTopicForMemoryEfficiency;
}

// expects: (number)
function findQuizById(id) {
  return dbOperationHelpers.finder('quiz', id);
}

// expects: (number)
async function findQuestionAnswerById(id) {
  let question = {};
  await findQuestionById(id)
    .then(qstn => {
      question = qstn;
    })
    .catch(err => {
      console.log(err);
    });
  return question.answer;
}

// expects: (number)
function findQuestionById(id) {
  return dbOperationHelpers.finder('question', id);
}

// expects: (number)
function findUserById(id) {
  return dbOperationHelpers.finder('user', id);
}

// expects: (string)
function findUserByUsername(username) {
  return db('user').where({ username }).first();
}

// expects: (string)
function findUserIdByUsername(username) {
  return db('user').where({ username }).select('id').first();
}

// expects: (number)
function findQuizzesByTopicId(topicId_fk) {
  return db('quiz').where({ topicId_fk });
}

// expects: (number)
function findQuestionsByQuizId(quizId_fk) {
  return db('question').where({ quizId_fk }); // array of JS-objects
}

// expects: (number)
function findStatsByUserId(userId_fk) {
  
  return db('userQuizStats').where({ userId_fk }); // array of JS-objects
}

// expects: (string)
async function findStatsByUsername(username) {
  
  let returnVal = undefined;
  await findUserIdByUsername(username)
    .then(res => {
      console.log(res);
      returnVal = findStatsByUserId(res.id);
    })
    .catch(err => {
      console.log(err);
      returnVal = err;
    });

  return returnVal;
}
