import express from "express";
import {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", refreshToken)
router.post("/logout", logoutUser);

router.get("/me", protect, (req, res) => {
    res.json(req.user);
});

export default router;