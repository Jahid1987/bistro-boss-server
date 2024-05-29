const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRETE);
const router = express.Router();

router.post("/", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
module.exports = router;
