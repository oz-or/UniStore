"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
  };

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const isMoreThan1024 = useMediaQuery("(min-width: 1024px)");

  const [isHovered, setIsHovered] = useState<string | null>(null);

  const [isWishlistHeartHovered, setIsWishlistHeartHovered] = useState(false);

  const { session, loading } = useSession();
  const { cartItemCount, fetchCartItems } = useCart();

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!loading && session) {
      setUserLoggedIn(true);
      fetchCartItems();
    } else {
      setUserLoggedIn(false);
    }
  }, [loading, session, fetchCartItems]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!inputValue) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(
        `/api/products/search?q=${encodeURIComponent(inputValue)}`
      );
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(true);
      }
    }, 250);
    // eslint-disable-next-line
  }, [inputValue]);

  useEffect(() => {
    if (
      redirectingWishlist &&
      (pathname === "/account/wishlist" || pathname === "/login")
    ) {
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
              <form onSubmit={handleSearch} className="relative">
                <input
                  className="mx-2 pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white text-black transition-all duration-150 shadow-sm  placeholder:text-gray-400 w-[clamp(140px,_52.5vw,_280px)] 750:w-[430px] 1024:w-[300px] 1200:w-[450px] 1440:w-[525px] placeholder:text-[11px] 500:placeholder:text-sm"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="What are you looking for?"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 rounded-full p-2 transition-colors"
                  aria-label="Search"
                >
                  <img
                    src="/SearchMagnifyingGlass.svg"
                    alt="Search"
                    className="w-4 h-4 invert"
                  />
                </button>
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 bg-white border rounded shadow z-50 mt-1 max-h-60 overflow-y-auto">
                    {suggestions.map((product) => (
                      <div
                        key={product.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                        onClick={() => {
                          setShowSuggestions(false);
                          setInputValue("");
                          router.push(`/product/${product.id}`);
                        }}
                      >
                        <img
                          src={product.img || "/products/placeholder.png"}
                          alt={product.name}
                          className="w-6 h-6 object-contain"
                        />
                        <span>{product.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
            <div className="flex items-center gap-x-2">
              <button
                type="button"
                aria-label="Go to wishlist"
                className="group flex items-center justify-center rounded-full transition-colors duration-150 ml-1
                
                "
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
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isWishlistHeartHovered ? "scale-110" : ""
                  }`}
                  src="/WishlistHeart.svg"
                  alt="Wishlist"
                />
              </button>
              {cartItemCount > 0 ? (
                <Link href={"/cart"} className="relative">
                  <img className="w-6 h-6" src="/Cart.svg" alt="" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary-2 text-[9px] text-primary-1 rounded-full flex items-center justify-center">
                    <span className="top-[0.25px] absolute">
                      {cartItemCount}
                    </span>
                  </span>
                </Link>
              ) : (
                <Link href={"/cart"}>
                  <img className="w-6 h-6" src="/Cart.svg" alt="" />
                </Link>
              )}

              {userLoggedIn ? (
                <UserDropDown session={session} userLoggedIn={userLoggedIn} />
              ) : (
                <Link href="/login">Login</Link>
              )}
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
