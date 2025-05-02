"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="max-w-full mx-auto px-4 py-8 500:max-w-[500px] 750:max-w-[750px] 1024:max-w-[1024px] 1200:max-w-[1200px] 1440:max-w-[1440px]  flex items-center justify-center 1440:h-[700px] ">
      <div className="max-w-[800px] w-full bg-white shadow-md rounded-lg p-8 md:p-12 text-center 1024:my-12 my-6">
        <div className="flex justify-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m0 0a9 9 0 11-6 6 9 9 0 016-6z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Thank you for your purchase! Your order has been placed and is being
          processed. You will receive an email confirmation shortly.
        </p>
        <div className="space-y-6">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-secondary-2 text-white py-4 rounded-lg hover:bg-secondary-3 transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => router.push("/account/orders")}
            className="w-full bg-gray-100 text-gray-800 py-4 rounded-lg hover:bg-gray-200 transition"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
