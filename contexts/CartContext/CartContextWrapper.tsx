"use client";

import { CartProvider } from "@/contexts/CartContext/CartContext";

const CartProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default CartProviderWrapper;
