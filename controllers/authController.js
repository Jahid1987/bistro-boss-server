const { getDb } = require("../db/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};
// signup usign mongodb
async function signUp(req, res) {
  try {
    const { email, pass } = req.body;
    const isExist = await getDb().collection("users").findOne({ email });
    if (isExist) {
      return res.status(409).send("This email is already exist.");
    }
    const hashedPass = await bcrypt.hash(pass, 10);
    const user = { email, password: hashedPass };
    const result = await getDb().collection("users").insertOne(user);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// signin using mongodb
async function signIn(req, res) {
  try {
    const { email, pass } = req.body;
    const user = await getDb().collection("users").findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRETE, {
      expiresIn: "1h",
    });
    res.cookie("token", token, cookieOptions).send({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function createUser(req, res) {
  try {
    const isExist = await getDb()
      .collection("users")
      .findOne({ email: req.body.email });
    if (isExist) {
      return res.status(409).send("This email is already exist.");
    }
    const result = await getDb().collection("users").insertOne(req.body);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function createJwt(req, res) {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRETE, {
    expiresIn: "1h",
  });
  res.cookie("token", token, cookieOptions).send({ token });
}

async function deleteJwt(req, res) {
  console.log(req.body);
  res
    .clearCookie("token", { ...cookieOptions, maxAge: 0 })
    .send({ success: true });
}

module.exports = { signUp, signIn, createJwt, deleteJwt, createUser };
