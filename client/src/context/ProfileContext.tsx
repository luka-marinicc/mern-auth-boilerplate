import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, updateProfile, changePassword, deleteAccount } from "../api/users";
import { useAuth } from "../hooks/useAuth";
import type { User } from "../types/auth";

interface ProfileContextType {
    profile: User | null;
    loading: boolean;
    error: string | null;
    refreshProfile: () => Promise<void>;
    updateUserProfile: (payload: { username?: string; avatar?: string }) => Promise<void>;
    changeUserPassword: (payload: { oldPassword: string; newPassword: string }) => Promise<void>;
    removeAccount: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, logout, updateUser } = useAuth();
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refreshProfile = async () => {
        try {
            setLoading(true);
            const data = await getProfile();
            setProfile(data);

            if (data && data._id !== user?._id) updateUser(data);
        } catch (err: any) {
            console.error("Error fetching profile:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (payload: { username?: string; avatar?: string }) => {
        try {
            setLoading(true);
            const updated = await updateProfile(payload);
            setProfile(updated);
            updateUser(updated);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const changeUserPassword = async (payload: { oldPassword: string; newPassword: string }) => {
        try {
            await changePassword(payload);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        }
    };

    const removeAccount = async () => {
        try {
            await deleteAccount();
            setProfile(null);
            logout();
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        }
    };

    useEffect(() => {
        if (!user) {
            setProfile(null);
            return;
        }
        if (!profile) refreshProfile();
    }, [user]);

    return (
        <ProfileContext.Provider
            value={{
                profile,
                loading,
                error,
                refreshProfile,
                updateUserProfile,
                changeUserPassword,
                removeAccount,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) throw new Error("useProfile must be used within a ProfileProvider");
    return context;
};
