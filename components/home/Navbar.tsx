"use client";

import Link from "next/link";
import { useState } from "react";
import UserDropDown from "../UserDropDown";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Navbar = () => {
  //Instead of Exclusive(which is on the design), I'll use the store's name at the end of the mobile navbar

  const [inputValue, setInputValue] = useState("");

  const isMoreThan1024 = useMediaQuery("(min-width: 1024px)");

  let userLoggedIn = true;
  let userHasItemInCart = true;

  return (
    //TODO: finish making the first part of the navbar responsive after 750 screen width
    <>
      <div className="1200:flex 1200:flex-col 1200:items-center">
        <nav className="flex justify-between items-center px-2 py-1.5 750:px-10   1200:w-[1200px] justify-self-center">
          <div className="flex items-center gap-x-16">
            <Link href="/">
              <img
                className="w-18 h-10 object-cover 750:w-[92px] 750:h-[54px]"
                src="/logoMain.png"
                alt="UniStore logo"
              />
            </Link>
            {isMoreThan1024 && (
              <div className="flex gap-x-12">
                {/* TODO: Give these the underline conditionally (if the user is on that page or not) */}
                <span className="border-b border-b-black">Home</span>
                <span>Contact</span>
                <span>About</span>
                <span>Sign Up</span>
              </div>
            )}
          </div>

          <div className="flex">
            <div className="relative h-[34px] mr-3 500:mr-4">
              <input
                className="pl-4 pr-10 py-[7px] relative text-[10px] placeholder:opacity-85 bg-secondary text-black rounded-[4px] border-none outline-neutral-100 h-full 500:pl-6 500:pr-16"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What are you looking for?"
              />
              <img
                src="/SearchMagnifyingGlass.svg"
                className="absolute h-3.5 right-3.5 top-[9px] opacity-65 hover:opacity-40 hover:cursor-pointer transition-opacity"
                alt=""
              />
            </div>
            <div className="flex items-center gap-x-1.5 500:gap-x-2 1024:gap-x-3">
              <img
                className="w-4 h-4 500:w-5 500:h-5"
                src="WishListHeart.svg"
                alt=""
              />
              {userHasItemInCart ? (
                <div className="relative">
                  <img
                    className="w-4 h-4 500:w-5 500:h-5 1024:w-6 1024:h-6"
                    src="Cart.svg"
                    alt=""
                  />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary-2 text-[9px] text-primary-1 rounded-full flex items-center justify-center">
                    <span className="top-[0.25px] absolute">
                      2
                      {/* TODO: Display the real number of items in the cart here */}
                    </span>
                  </span>
                </div>
              ) : (
                <img
                  className="w-5 h-5 750:w-6 750:h-6"
                  src="Cart.svg"
                  alt=""
                />
              )}

              {userLoggedIn && <UserDropDown />}
            </div>
          </div>
        </nav>
      </div>
      <div className="flex">
        <div>
          <Link href="#" className="flex">
            Exclusive <img src="/ArrowRight.svg" alt="" />
          </Link>
        </div>
        <div className="flex">
          <Link href="#">Home</Link>
          <Link href="#">Contact</Link>
          <Link href="#">About</Link>
          <Link href="#">Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
