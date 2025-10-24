import { useAuth } from "../hooks/useAuth";

export default function AdminDashboard() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center">
            <div className="bg-neutral-800 p-8 rounded-2xl shadow-lg text-center w-[24rem]">
                <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
                <p className="text-neutral-300">
                    Welcome, <span className="text-green-400 font-medium">{user?.username}</span> 👑
                </p>
            </div>
        </div>
    );
}
