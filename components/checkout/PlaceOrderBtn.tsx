"use client";

import React, { useState } from "react";

import emailjs from "@emailjs/browser";
import {
  placeOrder,
  saveBillingDetailsToProfile,
} from "@/app/(auth)/login/actions";

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
  paymentOption: string;
  onOrderPlaced: (orderId: string) => void;
  stripePaid?: boolean;
  setPaymentError?: (msg: string) => void;
  inputErrors: { [key: string]: string };
  validateInputs: () => { [key: string]: string };
  setInputErrors: (errors: { [key: string]: string }) => void;
}

const PlaceOrderBtn: React.FC<PlaceOrderBtnProps> = ({
  billingInfo,
  userId,
  cartItems,
  total,
  paymentOption,
  onOrderPlaced,
  stripePaid,
  setPaymentError,
  inputErrors,
  validateInputs,
  setInputErrors,
}) => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const serviceId = process.env.NEXT_PUBLIC_ORDER_SERVICE_ID!;
  const templateId = process.env.NEXT_PUBLIC_ORDER_TEMPLATE_ID!;
  const publicKey = process.env.NEXT_PUBLIC_ORDER_PUBLIC_KEY!;

  const sendOrderConfirmationEmail = async (orderId: string) => {
    try {
      const formattedCartItems = cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      // Convert to a string for EmailJS
      const cartItemsString = formattedCartItems
        .map((item) => `${item.name} (x${item.quantity}) - $${item.price}`)
        .join("\n");

      console.log({
        email: billingInfo.email,
        user_name: billingInfo.firstName + " " + billingInfo.lastName,
        order_id: orderId,
        cart_items: cartItemsString,
        total,
        payment_option: paymentOption,
        billing_firstName: billingInfo.firstName,
        billing_lastName: billingInfo.lastName,
        billing_address: billingInfo.address,
        billing_city: billingInfo.city,
        billing_email: billingInfo.email,
        billing_phone: billingInfo.phone,
      });

      await emailjs.send(
        serviceId,
        templateId,
        {
          email: billingInfo.email,
          user_name: billingInfo.firstName + " " + billingInfo.lastName,
          order_id: orderId,
          cart_items: cartItemsString, // <-- send as string!
          total,
          payment_option: paymentOption,
          billing_firstName: billingInfo.firstName,
          billing_lastName: billingInfo.lastName,
          billing_address: billingInfo.address,
          billing_city: billingInfo.city,
          billing_email: billingInfo.email,
          billing_phone: billingInfo.phone,
        },
        publicKey
      );
      console.log("Order confirmation email sent!");
    } catch (error) {
      console.error("Failed to send order confirmation email:", error);
    }
  };

  const handlePlaceOrder = async () => {
    const errors = validateInputs();
    setInputErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Block if Transfer in Advance is selected but payment not done
    if (paymentOption === "Transfer in Advance" && !stripePaid) {
      setPaymentError?.(
        "Please complete the payment before placing the order."
      );
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Place the order and move cart items to the orders table
      const orderId = await placeOrder(userId, cartItems, total, paymentOption);

      console.log("Order placed successfully!", orderId);

      // Save billing details to the public.profiles table
      await saveBillingDetailsToProfile(userId, billingInfo);

      console.log("Billing details saved successfully!");
      // Send confirmation email
      await sendOrderConfirmationEmail(orderId);

      console.log("Order confirmation email sent!");

      // Call the callback to notify the parent component
      onOrderPlaced(orderId);
    } catch (err) {
      setPaymentError?.("An error occurred while placing the order.");
      console.error("Error placing order:", err);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <>
      <button
        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder}
      >
        {isPlacingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </>
  );
};

export default PlaceOrderBtn;
