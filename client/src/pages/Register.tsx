// src/pages/Register.tsx
import { type FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register({ username, email, password });
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
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
                <h1 className="text-2xl font-semibold text-center">Register</h1>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <Input
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />

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
                    {loading ? "Registering..." : "Register"}
                </Button>

                <p className="text-center text-sm text-neutral-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-400 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
