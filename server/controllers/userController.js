import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.set("Cache-Control", "no-store");
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching profile" });
    }
};

export const updateMe = async (req, res) => {
    try {
        const { username, avatar } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ message: "User not found" });

        if (username) user.username = username;
        if (avatar) user.avatar = avatar;

        const updated = await user.save();
        res.set("Cache-Control", "no-store");
        res.json({
            _id: updated._id,
            username: updated.username,
            email: updated.email,
            role: updated.role,
            avatar: updated.avatar,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating profile" });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Both passwords required" });
        }

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect current password" });

        user.password = newPassword;
        await user.save();

        res.set("Cache-Control", "no-store");
        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error changing password" });
    }
};

export const deleteMe = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.set("Cache-Control", "no-store");
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting account" });
    }
};