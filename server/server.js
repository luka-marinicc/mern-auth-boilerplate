import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { transporter } from "./utils/mailer.js";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
    process.env.ORIGIN_DEV,
    process.env.ORIGIN_PROD,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            console.warn(`CORS blocked: ${origin}`);
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/test-email", async (req, res) => {
    try {
        await transporter.sendMail({
            from: `"Auth System" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "SMTP Test",
            text: "If you see this, Gmail SMTP works!",
        });
        res.send("✅ Email sent successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ Email failed");
    }
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
