import api from "./axios";
import type { User, LoginData, RegisterData } from "../types/auth";

export const loginUser = async (credentials: LoginData) => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
};

export const registerUser = async (credentials: RegisterData) => {
    const { data } = await api.post("/auth/register", credentials);
    return data;
};

export const logoutUser = async () => {
    const { data } = await api.post("/auth/logout", {});
    return data;
};

export const getMe = async (): Promise<User> => {
    const { data } = await api.get("/users/me");
    return data;
};

export const getProfile = async (): Promise<User> => {
    const { data } = await api.get("/users/me");
    return data;
};

export const updateProfile = async (payload: { username?: string; avatar?: string }): Promise<User> => {
    const { data } = await api.patch("/users/me", payload);
    return data;
};

export const changePassword = async (payload: { oldPassword: string; newPassword: string }) => {
    const { data } = await api.patch("/users/password", payload);
    return data;
};

export const deleteAccount = async () => {
    const { data } = await api.delete("/users/me");
    return data;
};