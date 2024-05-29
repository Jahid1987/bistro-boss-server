const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");

async function getMenus(req, res) {
  try {
    const menus = await getDb().collection("menus").find().toArray();
    if (!menus) {
      res.status(404).send("Menus not found");
    }
    res.status(200).send(menus);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// creating single item
async function createMenu(req, res) {
  try {
    const menu = req.body;
    const result = await getDb().collection("menus").insertOne(menu);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// reading single item
async function getMenuById(req, res) {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const menu = await getDb().collection("menus").findOne(query);

    if (!menu) {
      return res.status(404).send("menu not found.");
    }
    res.status(200).send(menu);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function updateMenu(req, res) {
  try {
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = {
      $set: { ...req.body },
    };
    const result = await getDb()
      .collection("menus")
      .updateOne(filter, updateDoc);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// deleting item
async function deleteMenu(req, res) {
  try {
    const result = await getDb()
      .collection("menus")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(204).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { getMenus, createMenu, getMenuById, deleteMenu, updateMenu };
