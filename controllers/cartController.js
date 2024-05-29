const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");

// creating single item
async function createCart(req, res) {
  try {
    const cartItem = req.body;
    const result = await getDb().collection("carts").insertOne(cartItem);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// reading all items
async function getCartItems(req, res) {
  try {
    const cartItems = await getDb()
      .collection("carts")
      .find(req.query)
      .toArray();
    if (!cartItems) {
      res.status(404).send("Cart items not found");
    }
    res.status(200).send(cartItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// reading single item
async function getCartItemById(req, res) {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const cartItem = await getDb().collection("carts").findOne(query);
    if (!cartItem) {
      return res.status(404).send("cartItem not found.");
    }
    res.status(200).send(cartItem);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// deleting item
async function deleteCartItem(req, res) {
  try {
    const result = await getDb()
      .collection("carts")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(204).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { getCartItems, createCart, getCartItemById, deleteCartItem };
