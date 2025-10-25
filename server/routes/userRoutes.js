import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMe,
  updateMe,
  changePassword,
  deleteMe,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
router.patch("/password", protect, changePassword);
router.delete("/me", protect, deleteMe);

export default router;
