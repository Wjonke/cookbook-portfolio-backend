const db = require("../../database/db-config");

module.exports = {
  find,
  findBy,
  findById,
  insert,
  update,
  remove
};

function insert(item) {
  return db("items")
    .insert(item)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db("items");
}

function findBy(filter) {
  return db("items").where(filter);
}

function findById(id) {
  return db("items").where({ id });
}

function update(id, changes) {
  return db("items")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("items")
    .where({ id })
    .del();
}
