// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";

export default function Navbar() {
    const { user, logout, sessionActive } = useAuth();

    return (
        <nav className="w-full bg-neutral-800 text-white flex justify-between items-center px-6 py-3 shadow">
            <div className="flex items-center gap-4">
                <Link to="/dashboard" className="font-semibold text-lg text-green-400">
                    MERN Auth
                </Link>
                {user?.role === "admin" && (
                    <Link to="/admin" className="text-neutral-300 hover:text-green-400 transition">
                        Admin
                    </Link>
                )}
            </div>

            {user && (
                <div className="flex items-center gap-3">
                    <div
                        className={`w-3 h-3 rounded-full ${sessionActive ? "bg-green-500" : "bg-red-500"
                            }`}
                        title={sessionActive ? "Session active" : "Session expired"}
                    />
                    <span className="text-sm text-neutral-400">{user.username}</span>
                    <Button onClick={logout} className="py-1 px-3 text-sm">
                        Logout
                    </Button>
                </div>
            )}
        </nav>
    );
}
