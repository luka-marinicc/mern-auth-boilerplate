import express from "express";
import {
    getMe,
    updateProfile,
    changePassword,
    deleteAccount,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.patch("/me", protect, updateProfile);
router.patch("/password", protect, changePassword);
router.delete("/me", protect, deleteAccount);

export default router;

