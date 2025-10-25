import { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Profile() {
  const {
    profile,
    loading,
    updateUserProfile,
    changeUserPassword,
    removeAccount,
  } = useProfile();

  const [form, setForm] = useState({
    username: profile?.username || "",
    avatar: profile?.avatar || "",
  });
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });

  useEffect(() => {
    if (profile) setForm({ username: profile.username, avatar: profile.avatar || "" });
  }, [profile]);

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex justify-center items-center p-6">
      <div className="max-w-md w-full bg-neutral-800 rounded-2xl p-6 shadow-lg space-y-6">
        <h1 className="text-3xl font-semibold text-center">Your Profile</h1>

        <div className="space-y-4">
          <Input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Username"
          />
          <Input
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            placeholder="Avatar URL"
          />
          <Button onClick={() => updateUserProfile(form)} disabled={loading} className="w-full">
            Save Changes
          </Button>
        </div>

        <div className="border-t border-neutral-700 pt-4 space-y-3">
          <h2 className="text-xl font-semibold">Change Password</h2>
          <Input
            type="password"
            placeholder="Old password"
            value={passwords.oldPassword}
            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
          />
          <Input
            type="password"
            placeholder="New password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          />
          <Button
            onClick={() => changeUserPassword(passwords)}
            disabled={loading}
            className="w-full"
          >
            Update Password
          </Button>
        </div>

        <div className="border-t border-neutral-700 pt-4 space-y-3">
          <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
          <Button onClick={removeAccount} className="w-full">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
