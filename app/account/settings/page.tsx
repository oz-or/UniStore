"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@/contexts/UserContext/UserContext";
import { useRouter } from "next/navigation";

export default function AccountSettingsPage() {
  const { user, setUser } = useUser();
  const router = useRouter();

  // Notification Preferences state
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    smsDelivery: false,
  });

  // Privacy & Security state
  const [twoFA, setTwoFA] = useState(false);

  // Account Actions state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Load settings on mount
  useEffect(() => {
    if (!user) return;
    // Fetch notification preferences and 2FA from your backend
    const fetchSettings = async () => {
      // Example: fetch from Supabase user_metadata
      setNotifications({
        orderUpdates: user.user_metadata?.orderUpdates ?? true,
        promotions: user.user_metadata?.promotions ?? false,
        smsDelivery: user.user_metadata?.smsDelivery ?? false,
      });
      setTwoFA(user.user_metadata?.twoFA ?? false);
    };
    fetchSettings();
  }, [user]);

  // Save notification preferences
  const handleNotificationsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving notification preferences...", notifications);
    if (!user) {
      toast.error("No user found.");
      return;
    }
    const { error } = await supabase.auth.updateUser({
      data: {
        orderUpdates: notifications.orderUpdates,
        promotions: notifications.promotions,
        smsDelivery: notifications.smsDelivery,
        twoFA,
      },
    });
    console.log("Supabase error:", error);
    if (error) {
      toast.error("Failed to save preferences.");
    } else {
      // Refetch the user to get the latest metadata
      const { data: refreshedUser, error: userError } = await supabase.auth.getUser();
      if (userError) {
        toast.error("Preferences saved, but failed to refresh user.");
      } else {
        toast.success("Notification preferences saved!");
        setUser(refreshedUser.user);
      }
    }
  };

  // Save 2FA preference
  const handleSecuritySave = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving security settings...");
    if (!user) return;
    const { error } = await supabase.auth.updateUser({
      data: {
        twoFA,
      },
    });
    if (error) {
      toast.error("Failed to update security settings.");
    } else {
      // Refetch the user to get the latest metadata
      const { data: refreshedUser, error: userError } = await supabase.auth.getUser();
      if (userError) {
        toast.error("Security settings updated, but failed to refresh user.");
      } else {
        toast.success("Security settings updated!");
        setUser(refreshedUser.user);
      }
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    setShowDeleteModal(false);
    if (!user) return;
    const res = await fetch("/api/delete-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });
    if (res.ok) {
      toast.success("Account deleted.");
      setUser(null);
      router.push("/");
    } else {
      toast.error("Failed to delete account.");
    }
  };

  // Sign out of all devices
  const handleSignOutAll = async () => {
    const { error } = await supabase.auth.signOut({ scope: "global" });
    if (error) {
      toast.error("Failed to sign out of all devices.");
    } else {
      toast.success("Signed out of all devices.");
      setUser(null);
      // Force a full reload to clear all state and cached images
      window.location.href = "/login";
    }
  };

  return (
    <main className="ml-[52px] mt-2.5 750:ml-[70px] 750:mr-5 px-2 1024:pb-20 1024:mx-8 1440:mr-0">
      <section className="grid gap-y-4 500:gap-y-7">
        <h1 className="font-semibold ml-2 500:text-base translate-y-[4px] 750:text-lg 500:translate-y-4 1200:text-2xl 1200:mb-6 1440:text-[26px] 1440:translate-y-6">
          Account Settings
        </h1>

        {/* 1. Notification Preferences */}
        <div className="shadow-account-rectangle bg-white p-3 1200:p-7 rounded 500:p-5">
          <h2 className="font-semibold mb-3 text-base 1200:text-lg text-gray-800">
            Notification Preferences
          </h2>
          <form
            className="flex flex-col gap-y-3"
            onSubmit={handleNotificationsSave}
          >
            <label className="flex items-center gap-x-2 text-sm 500:text-base">
              <input
                type="checkbox"
                checked={notifications.orderUpdates}
                onChange={(e) =>
                  setNotifications((n) => ({
                    ...n,
                    orderUpdates: e.target.checked,
                  }))
                }
                className="accent-red-500"
              />
              Email me about order updates
            </label>
            <label className="flex items-center gap-x-2 text-sm 500:text-base">
              <input
                type="checkbox"
                checked={notifications.promotions}
                onChange={(e) =>
                  setNotifications((n) => ({
                    ...n,
                    promotions: e.target.checked,
                  }))
                }
                className="accent-red-500"
              />
              Email me about promotions
            </label>
            <label className="flex items-center gap-x-2 text-sm 500:text-base">
              <input
                type="checkbox"
                checked={notifications.smsDelivery}
                onChange={(e) =>
                  setNotifications((n) => ({
                    ...n,
                    smsDelivery: e.target.checked,
                  }))
                }
                className="accent-red-500"
              />
              SMS notifications for delivery
            </label>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full w-fit mt-3 text-sm 500:text-base"
              type="submit"
            >
              Save Preferences
            </button>
          </form>
        </div>

        {/* 2. Privacy & Security */}
        <div className="shadow-account-rectangle bg-white p-3 1200:p-7 rounded 500:p-5">
          <h2 className="font-semibold mb-3 text-base 1200:text-lg text-gray-800">
            Privacy & Security
          </h2>
          <form className="flex flex-col gap-y-3" onSubmit={handleSecuritySave}>
            <label className="flex items-center gap-x-2 text-sm 500:text-base">
              <input
                type="checkbox"
                checked={twoFA}
                onChange={(e) => setTwoFA(e.target.checked)}
                className="accent-red-500"
              />
              Enable Two-Factor Authentication (2FA)
            </label>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full w-fit mt-3 text-sm 500:text-base"
              type="submit"
            >
              Save Security Settings
            </button>
          </form>
          {/* Sign out of all devices */}
          <div className="mt-5">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm 500:text-base"
              onClick={handleSignOutAll}
              type="button"
            >
              Sign out of all devices
            </button>
            <p className="text-xs text-gray-500 mt-2">
              This will revoke all active sessions on all devices.
            </p>
          </div>
        </div>

        {/* 3. Account Actions */}
        <div className="shadow-account-rectangle bg-white p-3 1200:p-7 rounded 500:p-5">
          <h2 className="font-semibold mb-3 text-base 1200:text-lg text-gray-800">
            Account Actions
          </h2>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm 500:text-base"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </button>
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 min-w-[90vw] max-w-xs 500:max-w-sm">
                <h2 className="font-bold text-lg mb-2 text-red-600">
                  Delete Account
                </h2>
                <p className="mb-4 text-gray-700 text-sm">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    className="px-4 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                    onClick={handleDeleteAccount}
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
