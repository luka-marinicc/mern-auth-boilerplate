// src/api/users.ts
import api from "./axios";
import type {
    User,
    AuthResponse,
    LoginData,
    RegisterData
} from "../types/auth";

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/auth/register", data);
    return res.data;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/auth/login", data);
    return res.data;
};

export const logoutUser = async (): Promise<void> => {
    await api.post("/auth/logout");
    localStorage.removeItem("accessToken");
};

export const getMe = async (): Promise<User> => {
    const res = await api.get<User>("/auth/me");
    return res.data;
};
