import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/utils/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js"; // Import Supabase User type

interface UserContextType {
  user: SupabaseUser | null; // Use Supabase User type
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUser: (user: SupabaseUser | null) => void; // Use Supabase User type
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        setUser(null); // Set user to null on error
      } else {
        console.log("Fetched user:", user); // Log the fetched user
        setUser(user);
      }
      setLoading(false);
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setLoading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
