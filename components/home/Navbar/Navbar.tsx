"use client";

import Link from "next/link";
import { useState } from "react";

import UserDropDown from "@/components/home/Navbar/UserDropDown";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileMenu from "../Hero/MobileMenu";
import { usePathname } from "next/navigation";

const Navlinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "Sign Up",
    link: "/sign-up",
  },
];

const Navbar = () => {
  const [inputValue, setInputValue] = useState("");

  const isMoreThan1024 = useMediaQuery("(min-width: 1024px)");

  const pathname = usePathname();

  const [isHovered, setIsHovered] = useState(pathname);

  const [isWishlistHeartHovered, setIsWishlistHeartHovered] = useState(false);

  //These will have to be states
  let userLoggedIn = true;
  let userHasItemInCart = true;

  return (
    <div>
      <div className="1200:flex 1200:flex-col 1200:items-center 1200:py-1 px-2 500:px-4">
        <nav className="flex justify-between items-center py-1.5 750:px-10 1200:w-[1200px] 1024:px-4 justify-self-center 1440:w-[1440px] 1200:pl-12">
          <div className="flex items-center gap-x-16 1440:gap-x-24">
            <Link href="/">
              <img
                className="w-18 h-10 object-cover 750:w-[92px] 750:h-[54px] 1440:ml-10"
                src="/logoMain.png"
                alt="UniStore logo"
              />
            </Link>
            {isMoreThan1024 && (
              <div className="flex gap-x-12 items-center text-base 1440:gap-x-16 1440:text-lg">
                {Navlinks.map((NavLink, i) => (
                  <Link
                    key={i}
                    href={NavLink.link}
                    className={`${
                      pathname === NavLink.link && "border-b border-b-black"
                    } ${
                      isHovered === NavLink.link && "border-b border-b-black"
                    }`}
                    onMouseEnter={() => setIsHovered(NavLink.link)}
                    onMouseLeave={() => setIsHovered(NavLink.link)}
                  >
                    {NavLink.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex">
            <div className="relative mr-3 500:mr-4">
              <input
                className="pl-4 pr-10 py-[7px] relative text-[10px] placeholder:opacity-85 bg-secondary text-black rounded-[4px] border-none outline-neutral-100 h-full 500:pl-6 500:pr-16 1440:w-[350px] 1440:text-[16px] 1440:py-3  1440:placeholder:opacity-60"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What are you looking for?"
              />
              {/* TODO: The search functionality needs to work when the enter key is pressed and when the magnifying glass is clicked too */}
              <img
                src="/SearchMagnifyingGlass.svg"
                className="absolute h-3.5 right-3 top-[8px] opacity-50 hover:opacity-30 hover:cursor-pointer transition-opacity 1440:w-5 1440:h-5 1440:top-[13px] 1440:right-4"
                alt=""
              />
            </div>
            <div className="flex items-center gap-x-1.5 500:gap-x-2 1024:gap-x-3">
              <button
                onMouseEnter={() =>
                  setIsWishlistHeartHovered(!isWishlistHeartHovered)
                }
                onMouseLeave={() =>
                  setIsWishlistHeartHovered(!isWishlistHeartHovered)
                }
              >
                <img
                  className="w-4 h-4 500:w-5 500:h-5 cursor"
                  src={
                    !isWishlistHeartHovered
                      ? "/WishlistHeart.svg"
                      : "/WishlistHeartFilled.svg"
                  }
                  alt=""
                />
              </button>
              {userHasItemInCart ? (
                <div className="relative">
                  <img
                    className="w-4 h-4 500:w-5 500:h-5 1024:w-6 1024:h-6"
                    src="/Cart.svg"
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
                  src="/Cart.svg"
                  alt=""
                />
              )}

              {userLoggedIn && <UserDropDown />}
            </div>
          </div>
        </nav>
      </div>

      <hr className="border-black mx-[-8px] 500:mx-[-16px] border-opacity-15" />

      <MobileMenu isMoreThan1024={isMoreThan1024} />
    </div>
  );
};

export default Navbar;
