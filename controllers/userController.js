const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");

// creating single item
async function createUser(req, res) {
  try {
    const user = req.body;
    const isExist = await getDb()
      .collection("users")
      .findOne({ email: user.email });
    if (isExist) {
      return res.status(409).send("This email is already exist.");
    }
    const result = await getDb().collection("users").insertOne(user);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// update user's status
async function updateUser(req, res) {
  try {
    const filter = { _id: new ObjectId(req.params.id) };
    const updateUser = {
      $set: {
        role: "admin",
      },
    };
    await getDb().collection("users").updateOne(filter, updateUser);
    res.status(204).send("user updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// reading all items
async function getUsers(req, res) {
  try {
    const users = await getDb().collection("users").find(req.query).toArray();
    if (!users) {
      res.status(404).send("Cart items not found");
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// reading single item
async function getUserByEmail(req, res) {
  try {
    const query = { email: req.params.email };
    const user = await getDb().collection("users").findOne(query);
    if (!user) {
      return res.status(404).send("user not found.");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function deleteUser(req, res) {
  try {
    const result = await getDb()
      .collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(204).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// deleting item

module.exports = {
  getUsers,
  createUser,
  updateUser,
  getUserByEmail,
  deleteUser,
};
