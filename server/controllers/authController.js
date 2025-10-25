import crypto from "crypto";
import { sendEmail } from "../utils/mailer.js";
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
            avatar: user.avatar,
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

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const token = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        const baseUrl =
            process.env.NODE_ENV === "production"
                ? process.env.ORIGIN_PROD
                : process.env.ORIGIN_DEV;

        const resetLink = `${baseUrl}/reset/${token}`;
        const messageHTML = `
            <p>You requested a password reset.</p>
            <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
            <p>This link expires in 10 minutes.</p>
        `;

        await sendEmail(email, "Password Reset Request", messageHTML);

        res.status(200).json({
            success: true,
            message: "Password reset link sent to email",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: "Password has been reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error resetting password" });
    }
}