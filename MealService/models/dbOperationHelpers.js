// knex queries to crud our database
const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);

module.exports = {
  finder,
  updater,
  remover,
};

// expects: (string, number)
function finder(table, id) {
  return db(table).where({ id }).first();
}

// expects: (string, number, JSON string)
function updater(table, id, changes) {
  return db(table)
    .where({ id })
    .update(changes)
    .then(() => {
      return finder(table, id);
    }); // return complete record that was updated
}

// expects: (string, number)
function remover(table, id) {
  return db(table).where({ id }).del();
}
