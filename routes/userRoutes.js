const express = require("express");

const {
  getUsers,
  createUser,
  getUserByEmail,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", authenticateToken, roleMiddleware("admin"), getUsers);
router.post("/", createUser);
router.get("/:email", authenticateToken, getUserByEmail);
router.delete("/:id", authenticateToken, roleMiddleware("admin"), deleteUser);
router.patch("/:id", updateUser);

module.exports = router;
