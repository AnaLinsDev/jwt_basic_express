const jwt = require("jsonwebtoken");
const { BadRequestError } = require('../errors')

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // just to practice JWT basics
  // it is normally provided by DB!!!!
  const id = new Date().getDate();

  // Never use a password to sign !
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.send({ msg: "Success on Login", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  // req.user is defined on middleware auth.js
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })

};

module.exports = {
  login,
  dashboard,
};
