"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const warningToast = () => {
  toast.error("One person can only order 10 items at a time", {
    duration: 6000,
  });
};

const Btns = () => {
  const [quantity, setQuantity] = useState(2);

  const handleIncrement = () => {
    if (quantity >= 10) {
      return setQuantity(10), warningToast();
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleDecrement = () => {
    quantity <= 1 ? setQuantity(1) : setQuantity(quantity - 1);
  };

  const [isMinusHovered, setIsMinusHovered] = useState(false);
  const [isPlusHovered, setIsPlusHovered] = useState(false);

  const [isWishlistHeartHovered, setIsWishlistHeartHovered] = useState(false);

  return (
    <>
      <Toaster />
      <div className="mb-10 pt-6 750:pt-8 ">
        <div className="flex gap-x-4 500:gap-x-7 1024:gap-x-4 1200:gap-x-14">
          <div className="flex items-center h-[38px] 500:h-10 500:w-[159px] ">
            <button
              className={`w-8 h-full 500:w-10  flex justify-center items-center border border-[rgba(0,0,0,0.5)] ${
                quantity > 1 && "hover:border-secondary-2 hover:bg-secondary-2 "
              }`}
              onMouseEnter={() => {
                quantity <= 1
                  ? setIsMinusHovered(false)
                  : setIsMinusHovered(true);
              }}
              onMouseLeave={() => {
                setIsMinusHovered(false);
              }}
              onClick={handleDecrement}
            >
              <img
                src={`${
                  isMinusHovered
                    ? "/productDetails/MinusIconWhite.svg"
                    : "/productDetails/MinusIconBlack.svg"
                }`}
                alt=""
                className="scale-75 500:scale-100"
              />
            </button>
            <span className="font-medium px-5 text-lg h-full flex items-center justify-center flex-1 border-y border-[rgba(0,0,0,0.5)]">
              {quantity}
            </span>
            <button
              className={`w-8 h-full 500:w-10 flex justify-center items-center border border-[rgba(0,0,0,0.5)] ${
                quantity < 10 && "hover:border-secondary-2 hover:bg-secondary-2"
              } `}
              onMouseEnter={() =>
                quantity >= 10
                  ? setIsPlusHovered(false)
                  : setIsPlusHovered(true)
              }
              onMouseLeave={() => setIsPlusHovered(false)}
              onClick={handleIncrement}
            >
              <img
                src={`${
                  isPlusHovered
                    ? "/productDetails/PlusIconWhite.svg"
                    : "/productDetails/PlusIconBlack.svg"
                }`}
                alt=""
                className="scale-75 500:scale-100"
              />
            </button>
          </div>

          <button className="bg-secondary-2 text-text py-2 px-8 text-base  font-medium  750:text-sm 500:w-[200px] rounded w-[139px] h-[38px] 500:h-10 1024:w-[159px] 1440:w-[200px]">
            Buy Now
          </button>

          <div className="rounded border border-[rgba(0,0,0,0.5)] h-[38px] 500:h-10 w-[38px] 500:w-10 flex items-center justify-center">
            <button
              onMouseEnter={() =>
                setIsWishlistHeartHovered(!isWishlistHeartHovered)
              }
              onMouseLeave={() =>
                setIsWishlistHeartHovered(!isWishlistHeartHovered)
              }
            >
              <img
                src={
                  !isWishlistHeartHovered
                    ? "/WishlistHeart.svg"
                    : "/WishlistHeartFilled.svg"
                }
                alt=""
                className="scale-[60%] translate-y-[2px]"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Btns;
