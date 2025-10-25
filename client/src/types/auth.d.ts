export interface User {
    _id: string;
    username: string;
    email: string;
    role: "user" | "admin";
    avatar: string;

}

export interface AuthResponse {
    _id: string;
    username: string;
    email: string;
    role: "user" | "admin";
    token: string;
    avatar: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    sessionActive: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (updates: Partial<User>) => void;
}
