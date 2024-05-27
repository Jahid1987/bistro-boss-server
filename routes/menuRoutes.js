const express = require("express");
const { getMenus } = require("../controllers/menuController");

const router = express.Router();

router.get("/", getMenus);

module.exports = router;
