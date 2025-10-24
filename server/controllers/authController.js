import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ username, email, password });
        const token = generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = generateToken(res, user._id);
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                password: user.password,
                token,
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        next(error);
    }
}

export const refreshToken = (req, res) => {
    const cookie = req.cookies.refreshToken;
    if (!cookie) return res.status(401).json({ message: "No refresh token" });

    jwt.verify(cookie, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });
        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });
        res.json({ token: accessToken });
    });
};

export const logoutUser = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
};