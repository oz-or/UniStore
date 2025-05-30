"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import UserDropDown from "@/components/home/Navbar/UserDropDown";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileMenu from "../Hero/MobileMenu";
import PageLoadingSpinner from "@/components/ui/PageLoadingSpinner";

import { useSession } from "@/contexts/SessionContext/SessionContext";
import { useCart } from "@/contexts/CartContext/CartContext";

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
  const [redirectingHome, setRedirectingHome] = useState(false);
  const [redirectingWishlist, setRedirectingWishlist] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const [inputValue, setInputValue] = useState("");

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const isMoreThan1024 = useMediaQuery("(min-width: 1024px)");

  const [isHovered, setIsHovered] = useState<string | null>(null);

  const [isWishlistHeartHovered, setIsWishlistHeartHovered] = useState(false);

  const { session, loading } = useSession();
  const { cartItemCount, fetchCartItems } = useCart();

  useEffect(() => {
    if (!loading && session) {
      setUserLoggedIn(true);
      fetchCartItems();
    } else {
      setUserLoggedIn(false);
    }
  }, [loading, session, fetchCartItems]);

  useEffect(() => {
    if (redirectingWishlist && (pathname === "/account/wishlist" || pathname === "/login")) {
      setRedirectingWishlist(false);
    }
  }, [redirectingWishlist, pathname]);

  if (redirectingHome) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PageLoadingSpinner />
      </div>
    );
  }

  if (redirectingWishlist) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PageLoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="1200:flex 1200:flex-col 1200:items-center 1200:py-1 px-2 500:px-4">
        <nav className="flex justify-between items-center py-1.5 750:px-10 w-full 1200:w-[1200px] 1024:px-4 justify-self-center 500:w-[470px] 1440:w-[1440px] 1200:pl-12 750:w-[775px] 1024:w-full ">
          <div className="flex items-center gap-x-16 1440:gap-x-24">
            <Link href="/">
              <img
                className="w-18 h-10 object-cover 750:w-[92px] 750:h-[54px] 1440:ml-10"
                src="/logoMain.png"
                alt="UniStore logo"
              />
            </Link>
            {isMoreThan1024 && (
              <div className="flex gap-x-10 items-center text-base 1440:gap-x-16 1440:text-lg">
                {Navlinks.map((NavLink, i) =>
                  NavLink.name === "Home" ? (
                    <button
                      key={i}
                      type="button"
                      className={`${
                        pathname === NavLink.link
                          ? "border-b border-b-black"
                          : ""
                      } ${
                        isHovered === NavLink.link
                          ? "border-b border-b-black"
                          : ""
                      } font-inherit bg-transparent outline-none cursor-pointer`}
                      onClick={() => {
                        setRedirectingHome(true);
                        router.push("/");
                      }}
                      onMouseEnter={() => setIsHovered(NavLink.link)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      {NavLink.name}
                    </button>
                  ) : (
                    <Link
                      key={i}
                      href={NavLink.link}
                      className={`${
                        pathname === NavLink.link
                          ? "border-b border-b-black"
                          : ""
                      } ${
                        isHovered === NavLink.link
                          ? "border-b border-b-black"
                          : ""
                      }`}
                      onMouseEnter={() => setIsHovered(NavLink.link)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      {NavLink.name}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>

          <div className="flex">
            <div className="relative ">
              <input
                className="pl-4 py-[7px] relative text-[10px] placeholder:opacity-85 bg-secondary text-black rounded-[4px] border-none outline-neutral-100 h-full mx-3
    pr-8 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60
    max-w-full w-[clamp(140px,_52.5vw,_280px)] 750:w-[430px] 750:py-3 750:text-[14px] 1024:w-[300px] 1200:w-[450px] 1440:w-[525px]"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What are you looking for?"
              />
              <img
                src="/SearchMagnifyingGlass.svg"
                className="absolute h-3.5 right-4 top-[8px] 750:h-[18px] 750:right-6 750:top-[14px] opacity-50 hover:opacity-30 hover:cursor-pointer transition-opacity 1440:w-5 1440:h-5 1440:top-[13px] 1440:right-4"
                alt=""
              />
            </div>
            <div className="flex items-center gap-x-1.5 500:gap-x-4 1024:gap-x-5">
              <button
                type="button"
                aria-label="Go to wishlist"
                className={`group flex items-center justify-center rounded-full transition-colors duration-150 p-2
    ${isWishlistHeartHovered ? "bg-secondary-2/30" : ""}
  `}
                onMouseEnter={() => setIsWishlistHeartHovered(true)}
                onMouseLeave={() => setIsWishlistHeartHovered(false)}
                onClick={() => {
                  if (pathname === "/account/wishlist") return; // Don't show spinner or navigate if already there
                  setRedirectingWishlist(true);
                  if (userLoggedIn) {
                    router.push("/account/wishlist");
                  } else {
                    router.push("/login");
                  }
                }}
              >
                <img
                  className={`w-4 h-4 500:w-5 500:h-5 transition-transform duration-150 ${
                    isWishlistHeartHovered ? "scale-110" : ""
                  }`}
                  src="/WishlistHeart.svg"
                  alt="Wishlist"
                />
              </button>
              {cartItemCount > 0 ? (
                <Link href={"/cart"} className="relative">
                  <img
                    className="w-4 h-4 500:w-5 500:h-5 1024:w-6 1024:h-6"
                    src="/Cart.svg"
                    alt=""
                  />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary-2 text-[9px] text-primary-1 rounded-full flex items-center justify-center">
                    <span className="top-[0.25px] absolute">
                      {cartItemCount}
                    </span>
                  </span>
                </Link>
              ) : (
                <Link href={"/cart"}>
                  <img
                    className="w-5 h-5 750:w-6 750:h-6"
                    src="/Cart.svg"
                    alt=""
                  />
                </Link>
              )}

              <UserDropDown session={session} userLoggedIn={userLoggedIn} />
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
