// src/pages/Dashboard.tsx
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";

export default function Dashboard() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center">
            <div className="bg-neutral-800 p-8 rounded-2xl shadow-lg text-center w-[24rem]">
                <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

                {user ? (
                    <>
                        <p className="text-neutral-300 mb-1">
                            <span className="font-medium text-green-400">Username:</span> {user.username}
                        </p>
                        <p className="text-neutral-300 mb-1">
                            <span className="font-medium text-green-400">Email:</span> {user.email}
                        </p>
                        <p className="text-neutral-300 mb-6">
                            <span className="font-medium text-green-400">Role:</span> {user.role}
                        </p>
                        <Button onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <p className="text-neutral-400">Loading user info...</p>
                )}
            </div>
        </div>
    );
}
