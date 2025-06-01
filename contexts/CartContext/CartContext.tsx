import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useSession } from "@/contexts/SessionContext/SessionContext";
import { getUserCartItems } from "@/app/(auth)/login/actions";

interface CartContextType {
  cartItems: CartItemType[];
  cartItemCount: number;
  fetchCartItems: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartItemCount: 0,
  fetchCartItems: () => {},
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { session } = useSession();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const fetchCartItems = useCallback(async () => {
    if (session && session.user && session.user.id) {
      const items = await getUserCartItems(session.user.id);
      setCartItems(items);
      setCartItemCount(items.length);
    }
  }, [session]);

  useEffect(() => {
    fetchCartItems();
  }, [session, fetchCartItems]);

  return (
    <CartContext.Provider value={{ cartItems, cartItemCount, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
