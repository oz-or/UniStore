"use client";

import React, { useState, useEffect } from "react";
import NavigationHeading from "@/components/NavigationHeading";
import {
  deleteCartItem,
  getUserCartItems,
  updateCartItemQuantity,
} from "../(auth)/login/actions";
import { useSession } from "@/contexts/SessionContext/SessionContext";
import { useCart } from "@/contexts/CartContext/CartContext";
import toast, { Toaster } from "react-hot-toast";

const CartPage = () => {
  const { session, loading } = useSession();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { cartItemCount, fetchCartItems } = useCart();

  //TODO: The UI of the cart items at 375px width is not looking good, fix it

  useEffect(() => {
    if (!loading && session) {
      getUserCartItems().then((cartItems) => {
        if (cartItems) {
          console.log("Cart items:", cartItems);
          setCartItems(cartItems);
        }
      });
    }
  }, [loading, session]);

 const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleQuantityChange = async (id: number, quantity: number) => {
    // Optimistically update the local state
    const previousCartItems = [...cartItems];
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

    try {
      // Update the database
      await updateCartItemQuantity(id, quantity);
      toast.success("Quantity updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity. Reverting changes.");
      // Roll back to the previous state
      setCartItems(previousCartItems);
    }
  };

  const handleDeleteItem = (id: number) => {
    toast(
      (t) => (
        <div className="toast-content">
          <p>Are you sure you want to delete this item?</p>
          <div className="flex justify-center gap-2 mt-2">
            <button
              onClick={() => {
                deleteCartItem(id);
                setCartItems((prevItems) =>
                  prevItems.filter((item) => item.id !== id)
                );
                fetchCartItems();
                toast.dismiss(t.id);
              }}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-500 text-white px-2 py-1 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: "top-center",
      }
    );
  };

  if (loading) {
    //TODO: Add a global loader copmonent instead of this(this can be achieved through the next js convention about loaders)
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>User is not authenticated</div>;
  }

  return (
    <div className="max-w-full mx-auto px-4 py-8 500:max-w-[500px] 750:max-w-[750px] 1024:max-w-[1024px] 1200:max-w-[1200px] 1440:max-w-[1440px] 500:mb-12 1200:mb-20">
      <Toaster />
      <div className="1440:pl-8">
        <NavigationHeading pageName1="Cart" />
      </div>

      <h1 className="text-xl font-semibold text-center 1200:text-3xl mb-4 500:mb-6 500:text-2xl 1440:text-4xl 1200:mb-10">
        Cart
      </h1>

      {/* Cart Items */}
      <div className="space-y-4 mb-4 500:space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="relative flex items-center justify-between p-3 500:p-4 750:p-5 1024:p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-[56px] 750:w-20 1024:w-24 h-auto object-contain"
            />
            <div className="flex-1 text-left px-2 500:ml-1 750:ml-2">
              <h3 className="text-sm 750:text-base 1024:text-lg font-medium">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm 750:text-base 1024:text-lg">
                ${item.price}
              </p>
            </div>
            <div className="flex items-center space-x-6 mr-4 1024:space-x-8">
              <div className="relative">
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="w-16 750:w-20 1024:w-24 h-8 750:h-10 1024:h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-[0.5px] focus:ring-secondary-2 focus:border-secondary-2 hover:bg-gray-100 appearance-none"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option
                      key={num + 1}
                      value={num + 1}
                      className="text-center"
                    >
                      {num + 1}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-24 text-center">
                <p className="text-gray-500 text-sm 750:text-base 1024:text-lg">
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="absolute top-[-6px] right-[-6px] w-4 h-4 flex items-center justify-center bg-secondary-2 text-white rounded-full 1024:scale-[125%]"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Coupon Code */}
      <div className="750:flex 750:space-x-16 mt-12">
        <div className="flex flex-col items-center my-1 750:w-1/2 ">
          <div className="flex w-full mb-2">
            <input
              type="text"
              placeholder="Coupon Code"
              className="flex-grow border border-gray-300 rounded-l px-4 py-2 text-sm 750:text-base 1024:text-lg 1024:py-3 750:w-20 focus:outline-none focus:ring-[0.5px] focus:ring-secondary-2 focus:border-secondary-2 hover:border-secondary-2"
            />
            <button className="bg-secondary-2 text-white px-4 py-2 rounded-r text-sm 750:text-base 1024:text-lg text-nowrap hover:bg-red-600 transition-colors duration-200">
              Apply Coupon
            </button>
          </div>
        </div>

        {/* Cart Total */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md 500:p-6 750:p-8 1024:p-10 750:w-1/2 mt-3 750:mt-0">
          <h2 className="text-lg font-semibold mb-4 500:text-xl 750:text-2xl 1024:text-3xl">
            Cart Total
          </h2>
          <div className="flex justify-between items-center mb-2 500:mb-4">
            <span className="text-gray-700 text-sm 500:text-base 750:text-lg 1024:text-xl">
              Subtotal:
            </span>
            <span className="text-gray-900 font-medium text-sm 500:text-base 750:text-lg 1024:text-xl">
              ${calculateSubtotal()}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2 500:mb-4">
            <span className="text-gray-700 text-sm 500:text-base 750:text-lg 1024:text-xl">
              Shipping:
            </span>
            <span className="text-gray-900 font-medium text-sm 500:text-base 750:text-lg 1024:text-xl">
              Free
            </span>
          </div>
          <div className="flex justify-between items-center mb-2 500:mb-4">
            <span className="text-gray-700 text-sm 500:text-base 750:text-lg 1024:text-xl">
              Total:
            </span>
            <span className="text-gray-900 font-medium text-sm 500:text-base 750:text-lg 1024:text-xl">
              ${calculateSubtotal()}
            </span>
          </div>
          <button className="w-full bg-secondary-2 text-white text-sm 500:text-base 750:text-lg 1024:text-xl py-2 rounded-md  ease-in-out hover:bg-secondary-3 mt-2 hover:bg-red-600 transition-colors duration-200">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
