import api from "./axios";
import type { User, LoginData, RegisterData } from "../types/auth";

const noCacheHeaders = {
    headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
    },
};

export const loginUser = async (credentials: LoginData) => {
    const { data } = await api.post("/auth/login", credentials, noCacheHeaders);
    return data;
};

export const registerUser = async (credentials: RegisterData) => {
    const { data } = await api.post("/auth/register", credentials, noCacheHeaders);
    return data;
};

export const logoutUser = async () => {
    const { data } = await api.post("/auth/logout", {}, noCacheHeaders);
    return data;
};

export const getMe = async (): Promise<User> => {
    const { data } = await api.get("/users/me", noCacheHeaders);
    return data;
};

export const getProfile = async (): Promise<User> => {
    const { data } = await api.get("/users/me", noCacheHeaders);
    return data;
};

export const updateProfile = async (payload: { username?: string; avatar?: string }): Promise<User> => {
    const { data } = await api.patch("/users/me", payload, noCacheHeaders);
    return data;
};

export const changePassword = async (payload: { oldPassword: string; newPassword: string }) => {
    const { data } = await api.patch("/users/password", payload, noCacheHeaders);
    return data;
};

export const deleteAccount = async () => {
    const { data } = await api.delete("/users/me", noCacheHeaders);
    return data;
};