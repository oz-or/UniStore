import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";

interface SessionProviderProps {
  children: ReactNode;
}

const SessionContext = createContext<{
  session: Session | null;
  loading: boolean;
}>({ session: null, loading: true });

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error fetching session:", sessionError);
      } else {
        setSession(sessionData.session);
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  console.log(session);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
