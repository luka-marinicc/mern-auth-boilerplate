import { useState } from "react";
import api from "../api/axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        if (!email) return setMessage("Please enter your email.");
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/auth/forgot-password", { email });
            setMessage("Reset link sent! Check your email inbox.");
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Error sending reset link.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-dvh bg-neutral-950 text-neutral-100">
            <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="p-2 rounded bg-neutral-800 border border-neutral-700"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 p-2 rounded font-semibold"
                >
                    {loading ? "Sending link..." : "Send Reset Link"}
                </button>
            </form>
            {message &&
                <p
                    className={`mt-4 text-sm transition-all duration-300 ${message.includes("sent") || message.includes("successfully")
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                >
                    {message}
                </p>

            }
        </div>
    );
}
