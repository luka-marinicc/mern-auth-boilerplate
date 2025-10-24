import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/dashboard");
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl font-bold mb-4 text-green-400">Welcome to MERN Auth</h1>
            <p className="text-neutral-400 mb-6">
                Secure authentication system with refresh tokens, protected routes, and role-based access.
            </p>
            <div className="flex gap-4">
                <Link
                    to="/login"
                    className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 font-medium transition"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 font-medium transition"
                >
                    Register
                </Link>
            </div>
        </div>
    );
}
