const { getDb } = require("../db/connection");

async function getReviews(req, res) {
  try {
    const reviews = await getDb().collection("reviews").find().toArray();
    if (!reviews) {
      res.status(404).send("Reviews not found");
    }

    res.status(200).send(reviews);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { getReviews };
