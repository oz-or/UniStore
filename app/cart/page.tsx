"use client";

import React, { useState, useEffect } from "react";
import NavigationHeading from "@/components/NavigationHeading";
import Spinner from "@/components/ui/Spinner";
import PageLoadingSpinner from "@/components/ui/PageLoadingSpinner";
import {
  deleteCartItem,
  getUserCartItems,
  updateCartItemQuantity,
  validateCoupon,
} from "../(auth)/login/actions";
import { useSession } from "@/contexts/SessionContext/SessionContext";
import { useCart } from "@/contexts/CartContext/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { session, loading } = useSession();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { cartItemCount, fetchCartItems } = useCart();
  const router = useRouter();
  const [couponError, setCouponError] = useState("");

  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleApplyCoupon = async () => {
    setIsApplyingCoupon(true);
    setCouponError(""); // Clear previous error
    setCouponApplied(false); // Clear previous success

    try {
      const result = await validateCoupon(couponCode, subtotal);

      if (!result.valid) {
        setCouponError(result.error || "");
      } else {
        setDiscountPercent((subtotal * result.discount) / 100); // Apply the discount
        setCouponApplied(true);
        setCouponCode(""); // Clear the input field
      }
    } catch (err) {
      console.error("Error applying coupon:", err);
      setCouponError("An error occurred while applying the coupon.");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const discount = (calculateSubtotal() * discountPercent) / 100;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !session) {
      router.replace("/login");
    }
  }, [session, loading, router]);

  useEffect(() => {
    if (!loading && session) {
      getUserCartItems(session.user.id).then((cartItems) => {
        if (cartItems) {
          setCartItems(cartItems);
        }
      });
    }
  }, [loading, session]);

  if (loading || (session && cartItems.length === 0 && cartItemCount === 0)) {
    // Show spinner while loading, or show empty cart UI only if you know for sure the cart is empty
    if (loading) {
      return (
        <div className="max-w-full mx-auto px-4 py-8 ...">
          <Spinner />
        </div>
      );
    }
    // Show empty cart UI only if not loading, session exists, and cart is empty
    return (
      <div className="flex flex-col 1440:items-center  ">
        <div className="px-2 1200:px-6 1440:px-0 1440:pb-24 1440:w-[1440px]">
          <div className="1440:pl-8">
            <NavigationHeading pageName1="Cart" />
          </div>
          <div
            className="max-w-full mx-auto px-4 py-8
          500:max-w-[500px]
          750:max-w-[750px]
          1024:max-w-[1024px]
          1200:max-w-[1200px]
          1440:max-w-[1440px]
          500:mb-12 1200:mb-20 pb-16"
          >
            <Toaster />

            <div className="flex flex-col items-center justify-center min-h-[40vh]">
              <h2
                className="font-bold mb-4
              text-2xl
              500:text-3xl
              750:text-4xl
              1024:text-[40px]
              
            "
              >
                Your cart is empty
              </h2>
              <p
                className="text-gray-500 mb-6
              text-[15px]
              500:text-lg
              750:text-xl
              1024:text-[22px]
              
            "
              >
                Looks like you haven&apos;t added anything yet.
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-secondary-2 text-white px-6 py-2 rounded hover:bg-secondary-3 transition-colors duration-200
                text-base
                500:text-lg
                750:text-xl
                1024:text-[22px]
                500:px-8
                750:px-10
                1024:px-12
                500:py-3
                750:py-4
                1024:py-5
                500:mt-4
                750:mt-6
                1024:mt-8
              "
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                if (session) {
                  deleteCartItem(id, session.user.id);
                  setCartItems((prevItems) =>
                    prevItems.filter((item) => item.id !== id)
                  );
                  fetchCartItems();
                }
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

  const calculateShipping = (subtotal: number): string => {
    if (subtotal > 100) {
      return "Free"; // Free shipping for orders above $100
    } else if (subtotal >= 50) {
      return `$${5}`; // Flat rate for orders between $50 and $100
    } else {
      return `$${10}`; // Higher rate for orders below $50
    }
  };

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const total =
    subtotal +
    (shipping === "Free" ? 0 : parseFloat(shipping.slice(1))) -
    discount;

  if (redirecting) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PageLoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-4 py-8 500:max-w-[500px] 750:max-w-[750px] 1024:max-w-[1024px] 1200:max-w-[1200px] 1440:max-w-[1440px] 500:mb-12 1200:mb-20">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <div>
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
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    setCouponError(""); // Clear previous error
                    setCouponApplied(false); // Clear previous success
                  }}
                  className="flex-grow border border-gray-300 rounded-l px-4 py-2 text-sm 750:text-base 1024:text-lg 1024:py-3 750:w-20 focus:outline-none focus:ring-[0.5px] focus:ring-secondary-2 focus:border-secondary-2 hover:border-secondary-2"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon}
                  className={`bg-secondary-2 text-white px-4 py-2 rounded-r text-sm 750:text-base 1024:text-lg text-nowrap hover:bg-red-600 transition-colors duration-200 ${
                    isApplyingCoupon ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isApplyingCoupon ? "Applying..." : "Apply Coupon"}
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 text-sm mt-2">{couponError}</p>
              )}
              {couponApplied && (
                <p className="text-green-500 text-sm mt-2">
                  Coupon applied successfully!
                </p>
              )}
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
                  Discount:
                </span>
                <span className="text-gray-900 font-medium text-sm 500:text-base 750:text-lg 1024:text-xl">
                  -${discount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2 500:mb-4">
                <span className="text-gray-700 text-sm 500:text-base 750:text-lg 1024:text-xl">
                  Shipping:
                </span>
                <span className="text-gray-900 font-medium text-sm 500:text-base 750:text-lg 1024:text-xl">
                  {shipping}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2 500:mb-4">
                <span className="text-gray-700 text-sm 500:text-base 750:text-lg 1024:text-xl">
                  Total:
                </span>
                <span className="text-gray-900 font-medium text-sm 500:text-base 750:text-lg 1024:text-xl">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => {
                  setRedirecting(true);
                  router.push("/checkout");
                }}
                className="w-full bg-secondary-2 text-white text-sm 500:text-base 750:text-lg 1024:text-xl py-2 rounded-md  ease-in-out hover:bg-secondary-3 mt-2 hover:bg-red-600 transition-colors duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
