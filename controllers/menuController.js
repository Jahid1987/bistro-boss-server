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

module.exports = { getMenus };
