const db = require("../../database/db-config");

module.exports = {
  find,
  findBy,
  findById,
  insert,
  update,
  remove,
  getPartiesUsers,
  getPartyImages,
  getPartyItems,
  insertUserParty
};

function insert(party) {
  return db("parties")
    .insert(party, "party")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function insertUserParty(user_id, party_id) {
  return db("user_party")
    .insert({ user_id, party_id, creator: true })

    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

function find() {
  return db("parties");
}

function findBy(name) {
  return db("parties")
    .select("id", "name", "date", "budget")
    .where(name);
}

function findById(id) {
  return db("parties")
    .select("id", "name", "date", "budget")
    .where("id", id)
    .first();
}

function update(id, changes) {
  return db("parties")
    .where("id", id)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}

function remove(id) {
  return db("parties")
    .where("id", id)
    .del();
}

function getPartyImages(id) {
  return db("images")
    .select("img_url", "party_id")
    .where("party_id", "=", id);
}

function getPartyItems(id) {
  return db("items")
    .select("name", "description", "cost", "party_id", "user_id")
    .where("party_id", "=", id);
}

function getPartiesUsers(id) {
  return db("user_party")
    .select(
      "user_id",
      "party_id",
      "creator",

      "users.first_name",
      "users.last_name",
      "users.username",
      "users.avatar"
    )
    .join("users", "user_id", "=", "users.id")
    .where("party_id", "=", id);
}
