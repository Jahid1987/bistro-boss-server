const express = require("express");
const {
  getCartItems,
  createCart,
  getCartItemById,
  deleteCartItem,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCartItems);
router.post("/", createCart);
router.get("/:id", getCartItemById);
router.delete("/:id", deleteCartItem);

module.exports = router;
