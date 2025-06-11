import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@/contexts/UserContext/UserContext";
import toast, { Toaster } from "react-hot-toast";

interface ChangePasswordProps {
  showChangePassword: boolean;
  setShowChangePassword: (showChangePassword: boolean) => void;
}

const ChangePassword = ({
  showChangePassword,
  setShowChangePassword,
}: ChangePasswordProps) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useUser();

  // State to toggle password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmNewPassword) {
      setPasswordsMatch(false);
      setError("New passwords do not match.");
      return;
    } else {
      setPasswordsMatch(true);
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user?.email ?? "",
      password: oldPassword,
    });

    if (signInError) {
      setError("Old password is incorrect.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess("Password updated successfully.");
      toast.success("Password updated successfully!");
      setShowChangePassword(false);
    }

    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleCancel = () => {
    setShowChangePassword(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordsMatch(true);
    setError("");
    setSuccess("");
  };

  return (
    <form onSubmit={handleChangePassword} className="flex flex-col gap-8 ">
      <Toaster />
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="oldPassword"
          className="block text-xs 500:text-sm 1024:text-base font-medium text-gray-700"
        >
          Old Password
        </label>
        <input
          type={showOldPassword ? "text" : "password"}
          id="oldPassword"
          autoComplete="current-password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="flex py-0.5 1024:py-1.5 w-full 1024:text-md 1200:text-base rounded-md border bg-white px-2 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
        <button
          type="button"
          className={`absolute right-3 top-8 text-gray-500 500:top-9 1024:top-[42px] w-3 1024:w-4 ${
            oldPassword.length === 0 && "hidden"
          }`}
          onClick={() => setShowOldPassword(!showOldPassword)}
        >
          {showOldPassword ? (
            <img src="/account/eye-blocked.svg" alt="" />
          ) : (
            <img src="/account/eye.svg" alt="" />
          )}
        </button>
      </div>
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="newPassword"
          className="block text-xs 500:text-sm 1024:text-base font-medium text-gray-700"
        >
          New Password
        </label>
        <input
          type={showNewPassword ? "text" : "password"}
          id="newPassword"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="flex py-0.5 1024:py-1.5 w-full 1024:text-md 1200:text-base rounded-md border bg-white px-2 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
        <button
          type="button"
          className={`absolute right-3 top-8 text-gray-500 500:top-9 1024:top-[42px] w-3 1024:w-4 ${
            newPassword.length === 0 && "hidden"
          }`}
          onClick={() => setShowNewPassword(!showNewPassword)}
        >
          {showNewPassword ? (
            <img src="/account/eye-blocked.svg" alt="" />
          ) : (
            <img src="/account/eye.svg" alt="" />
          )}
        </button>
      </div>
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="confirmNewPassword"
          className="block text-xs 500:text-sm 1024:text-base font-medium text-gray-700"
        >
          Confirm New Password
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirmNewPassword"
          autoComplete="new-password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="flex py-0.5 1024:py-1.5 w-full 1024:text-md 1200:text-base rounded-md border bg-white px-2 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
        <button
          type="button"
          className={`absolute right-3 top-8 text-gray-500 500:top-9 1024:top-[42px] w-3 1024:w-4 ${
            confirmNewPassword.length === 0 && "hidden"
          }`}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <img src="/account/eye-blocked.svg" alt="" />
          ) : (
            <img src="/account/eye.svg" alt="" />
          )}
        </button>
      </div>
      {!passwordsMatch && (
        <p className="text-red-500 text-sm">Passwords do not match</p>
      )}
      <div className="flex justify-end gap-x-4 mt-4 text-[11px] 750:text-sm 1024:text-base ">
        <button
          type="button"
          className="opacity-75 border-2 border-solid bg-white px-2.5 mt-1.5 rounded-md ease-in-out hover:bg-secondary-3 hover:bg-neutral-300 hover:text-white transition-all duration-200 py-1.5 "
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-[50%] max-w-[200px] bg-secondary-2 text-white py-1.5 rounded-md ease-in-out hover:bg-secondary-3 mt-2 hover:bg-red-600 transition-colors duration-200"
        >
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
