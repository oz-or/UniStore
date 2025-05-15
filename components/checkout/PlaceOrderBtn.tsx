"use client";

import React, { useState } from "react";
import { placeOrder } from "@/app/(auth)/login/actions";
import { saveBillingDetailsToProfile } from "@/app/(auth)/login/actions";

interface PlaceOrderBtnProps {
  billingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    apartment: string;
  };
  userId: string;
  cartItems: {
    product_id: string;
    quantity: number;
    price: number;
    name: string;
    img: string;
  }[];
  total: number;
  onOrderPlaced: (orderId: string) => void;
}

const PlaceOrderBtn: React.FC<PlaceOrderBtnProps> = ({
  billingInfo,
  userId,
  cartItems,
  total,
  onOrderPlaced,
}) => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);

    try {
      // Place the order and move cart items to the orders table
      const orderId = await placeOrder(userId, cartItems, total);

      console.log("Order placed successfully!", orderId);

      // Save billing details to the public.profiles table
      await saveBillingDetailsToProfile(userId, billingInfo);

      // Call the callback to notify the parent component
      onOrderPlaced(orderId);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("An error occurred while placing the order.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <button
      className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
      onClick={handlePlaceOrder}
      disabled={isPlacingOrder}
    >
      {isPlacingOrder ? "Placing Order..." : "Place Order"}
    </button>
  );
};

export default PlaceOrderBtn;
