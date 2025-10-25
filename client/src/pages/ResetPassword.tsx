import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ResetPassword() {
    const { token } = useParams<{ token: string }>();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        if (!password) return setMessage("Please enter a new password.");
        setLoading(true);
        e.preventDefault();
        try {
            await api.post(`/auth/reset-password/${token}`, { password });
            setMessage("Password reset successfully! Redirecting to login...");
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Error resetting password.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (message.includes("successfully")) {
            const timer = setTimeout(() => navigate("/login"), 2000);
            return () => clearTimeout(timer);
        }
    }, [message, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-dvh bg-neutral-950 text-neutral-100">
            <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                    className="p-2 rounded bg-neutral-800 border border-neutral-700"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 p-2 rounded font-semibold"
                >
                    Reset Password
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
