import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

interface AdminRouteProps {
    children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-neutral-400">
                Loading...
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== "admin") return <Navigate to="/dashboard" replace />;

    return <>{children}</>;
}
