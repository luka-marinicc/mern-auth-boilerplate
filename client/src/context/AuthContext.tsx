// src/context/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import type { AuthContextType, User, LoginData, RegisterData } from "../types/auth";
import { loginUser, registerUser, logoutUser, getMe } from "../api/users";

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [sessionActive, setSessionActive] = useState<boolean>(true);

    useEffect(() => {
        const initialize = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                try {
                    const currentUser = await getMe();
                    setUser(currentUser);
                    setSessionActive(true);
                } catch (error) {
                    console.error("Session expired or invalid token.");
                    localStorage.removeItem("accessToken");
                    setSessionActive(false);
                }
            } else {
                setLoading(false);
            }
        };
        initialize();
    }, []);

    useEffect(() => {
        const handleSessionExpired = () => setSessionActive(false);
        window.addEventListener("session-expired", handleSessionExpired);
        return () => window.removeEventListener("session-expired", handleSessionExpired);
    }, []);

    const updateUser = (updates: Partial<User>) => {
        setUser((prev) => (prev ? { ...prev, ...updates } : prev));
    };

    const login = async (data: LoginData) => {
        try {
            const res = await loginUser(data);
            localStorage.setItem("accessToken", res.token);
            setUser({
                _id: res._id,
                username: res.username,
                email: res.email,
                role: res.role,
                avatar: res.avatar
            });
            setSessionActive(true);
        } catch (error: any) {
            console.error(error.response?.data?.message || error.message);
            throw error;
        }
    };

    const register = async (data: RegisterData) => {
        try {
            const res = await registerUser(data);
            localStorage.setItem("accessToken", res.token);
            setUser({
                _id: res._id,
                username: res.username,
                email: res.email,
                role: res.role,
                avatar: res.avatar
            });
            setSessionActive(true);
        } catch (error: any) {
            console.error(error.response?.data?.message || error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            localStorage.removeItem("accessToken");
            setUser(null);
            setSessionActive(false);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                sessionActive,
                login,
                register,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
