// src/pages/Login.tsx
import { type FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login({ email, password });
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-900 text-white">
            <form
                onSubmit={handleSubmit}
                className="w-88 p-6 rounded-2xl bg-neutral-800 shadow-lg flex flex-col gap-4"
            >
                <h1 className="text-2xl font-semibold text-center">Login</h1>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />

                <Button type="submit" loading={loading}>
                    {loading ? "Logging in..." : "Login"}
                </Button>

                <p className="text-center text-sm text-neutral-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-green-400 hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}
