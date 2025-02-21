"use client";

import { SessionProvider } from "@/contexts/SessionContext/SessionContext";

const SessionProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
