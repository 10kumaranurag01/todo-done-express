const User = require("../models/User");
const { registerSchema, loginSchema } = require("../validators/validate");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");
const validateData = require("../utils/validateData");
const isEmailMatch = require("../utils/isEmail");
const updateUserPassword = require("../utils/updateUserPassword");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const { valid, errors } = validateData(registerSchema, req.body);

  if (!valid) {
    return res.status(400).json({ message: errors });
  }

  const userExists = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ username, email, password });

  if (!user) {
    return res
      .status(500)
      .json({ message: "Error occurred while creating user" });
  }

  return res.status(201).json({
    username: user?.username,
    token: generateToken(user),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const { valid, errors } = validateData(loginSchema, req.body);

  if (!valid) {
    return res.status(400).json({ message: errors });
  }

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      username: user?.username,
      token: generateToken(user),
    });
  }

  return res.status(401).json({ message: "Invalid username or password" });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const { valid, errors } = validateData(registerSchema, req.body);
  if (!valid) {
    return res.status(400).json({ message: errors });
  }

  // Find user and validate credentials
  const user = await User.findOne({ username });
  if (!user || !isEmailMatch(user.email, email)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  await updateUserPassword(user, password);

  return res.status(200).json({
    username: user.username,
    token: generateToken(user),
  });
});

module.exports = { registerUser, loginUser, forgotPassword };
