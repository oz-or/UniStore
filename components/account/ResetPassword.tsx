"use client";

import { useState } from "react";
import { Input } from "../ui/Input";

const ResetPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = () => {
    if (newPassword === confirmNewPassword) {
      setPasswordsMatch(true);
      // Add logic to handle password change
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordsMatch(true);
  };

  return (
    <div>
      <button
        className="Text-secondary-2 underline"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Reset Password
      </button>
      {isOpen && (
        <div>
          <div>
            <Input
              type="password"
              name="current_password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="pl-4 py-2.5 relative placeholder:opacity-90 bg-secondary rounded-[4px] border-none 500:pl-6 border-neutral-300 focus:outline-none focus:ring-[1px] focus:ring-neutral-300 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 "
            />
          </div>
          <div>
            <Input
              type="password"
              name="new_password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pl-4 py-2.5 relative placeholder:opacity-90 bg-secondary rounded-[4px] border-none 500:pl-6 border-neutral-300 focus:outline-none focus:ring-[1px] focus:ring-neutral-300 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 "
            />
          </div>
          <div>
            <Input
              type="password"
              name="confirm_new_password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="pl-4 py-2.5 relative placeholder:opacity-90 bg-secondary rounded-[4px] border-none 500:pl-6 border-neutral-300 focus:outline-none focus:ring-[1px] focus:ring-neutral-300 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 "
            />
          </div>
          {!passwordsMatch && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}
          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-secondary-2 text-white py-2 px-4 rounded"
              onClick={handlePasswordChange}
            >
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
