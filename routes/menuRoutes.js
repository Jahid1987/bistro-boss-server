const express = require("express");
const {
  getMenus,
  createMenu,
  getMenuById,
  deleteMenu,
  updateMenu,
} = require("../controllers/menuController");
const authenticateToken = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getMenus);
router.post("/", authenticateToken, roleMiddleware("admin"), createMenu);
router.get("/:id", authenticateToken, roleMiddleware("admin"), getMenuById);
router.delete("/:id", authenticateToken, roleMiddleware("admin"), deleteMenu);
router.patch("/:id", updateMenu);
module.exports = router;
