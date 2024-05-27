const express = require("express");
const {
  signUp,
  signIn,
  createJwt,
  deleteJwt,
  createUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/createjwt", createJwt);
router.post("/deletejwt", deleteJwt);
router.post("/createuser", createUser);

module.exports = router;
