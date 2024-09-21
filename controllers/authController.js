const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../utils/validate');

const generateToken = (user) => {
    return jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        registerSchema.parse(req.body);  // Zod validation
        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ username, email, password });
        res.status(201).json({
            username: user.username,
            token: generateToken(user),
        });
    } catch (error) {
        res.status(400).json({ message: error.errors || 'Invalid data' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        loginSchema.parse(req.body);  // Zod validation
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                username: user.username,
                token: generateToken(user),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.errors || 'Invalid data' });
    }
};

module.exports = { registerUser, loginUser };
