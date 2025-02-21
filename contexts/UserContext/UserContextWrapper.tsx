"use client";

import { UserProvider } from "@/contexts/UserContext/UserContext";

const UserProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default UserProviderWrapper;
