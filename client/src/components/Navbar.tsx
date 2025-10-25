import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";

export default function Navbar() {
    const navigate = useNavigate();
    const { logout, sessionActive } = useAuth();
    const { profile } = useProfile();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const avatarSrc =
        profile?.avatar ||
        "https://ui-avatars.com/api/?name=User&background=333&color=fff&size=64";

    return (
        <nav className="bg-neutral-900 border-b border-neutral-800 text-white flex items-center justify-between px-6 py-3 shadow-md">
            {/* Left Side */}
            <div className="flex items-center gap-6">
                <Link to="/" className="text-lg font-semibold hover:text-green-400 transition-colors">
                    MERN Auth
                </Link>
            </div>

            {/* Right Side */}
            {sessionActive && (
                <div className="flex items-center gap-4">
                    {/* Profile Button */}
                    <Link to="/profile" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-neutral-700 group-hover:border-green-500 transition-colors">
                            {profile?.avatar ? (
                                <img
                                    src={avatarSrc}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex justify-center items-center w-full h-full bg-neutral-800">
                                    <User size={18} className="text-neutral-400" />
                                </div>
                            )}
                        </div>
                        <span className="hidden sm:inline text-sm font-medium group-hover:text-green-400 transition-colors">
                            {profile?.username || "Profile"}
                        </span>
                    </Link>

                    <Button onClick={handleLogout} className="text-sm">
                        Logout
                    </Button>
                </div>
            )}
        </nav>
    );
}
