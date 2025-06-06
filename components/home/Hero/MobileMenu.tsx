"use client";

import { heroNavLinks } from "@/data";
import HeroNavLink from "./HeroNavLink";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RemoveScroll } from "react-remove-scroll";
import { slugify } from "@/lib/helpers";

const MobileMenu = ({ isMoreThan1024 }: { isMoreThan1024: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    !isMoreThan1024 && (
      <div className="relative z-40 ">
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 transition-opacity z-30"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div className="500:w-full mx-auto flex items-center justify-between py-2 px-4 sm:px-4 w-[375px] bg-white 750:px-8 shadow-sm rounded-xl mb-2 750:w-[750px]">
          <button
            className={`group flex items-center gap-x-1 px-3 py-1 bg-primary-1 border border-gray-300 rounded-full shadow hover:bg-primary-2 transition-colors duration-200 text-sm 500:text-base font-semibold ${
              isOpen ? "text-white" : "text-gray-900"
            } focus:text-white active:text-white`}
            style={{ minWidth: 0 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <span className="text-sm 500:text-base">Categories</span>
            {/* Black arrow (default) */}
            <img
              className={`w-4 h-4 ${isOpen ? "hidden" : "group-active:hidden"}`}
              src="/ArrowRightBlack.svg"
              alt=""
            />
            {/* White arrow (when open or active) */}
            <img
              className={`w-4 h-4 ${
                isOpen ? "" : "hidden group-active:inline"
              }`}
              src="/ArrowRightWhite.svg"
              alt=""
            />
          </button>

          <div className="flex gap-x-3 500:gap-x-7 750:mr-4 750:gap-x-16">
            <Link
              href="/"
              className="font-semibold text-gray-800 hover:underline underline-offset-4 transition-colors text-xs 750:text-lg 500:text-base"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="font-semibold text-gray-800 hover:underline underline-offset-4 transition-colors text-xs 750:text-lg 500:text-base"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="font-semibold text-gray-800 hover:underline underline-offset-4 transition-colors text-xs 750:text-lg 500:text-base"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="#"
              className="font-semibold text-gray-800 hover:underline underline-offset-4 transition-colors text-xs 750:text-lg 500:text-base"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>

        <RemoveScroll enabled={isOpen}>
          <nav
            className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-primary-1 z-50 shadow-lg transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } overflow-y-auto`}
            aria-label="Mobile menu"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <Image src="/x.png" alt="Close" width={28} height={28} />
            </button>

            <div className="flex flex-col gap-y-6 mt-16 px-6 h-full">
              {heroNavLinks.map(({ text }, i) => (
                <HeroNavLink
                  key={i}
                  href={`/category/${slugify(text)}`}
                  className="flex items-center gap-x-4 font-semibold text-lg py-3 px-2 rounded hover:bg-secondary-2 transition"
                  text={text}
                  handleClick={() => setIsOpen(false)}
                >
                  {i <= 1 && (
                    <div className="rotate-[270deg]">
                      <img src="/DropDownBlack.svg" alt="" />
                    </div>
                  )}
                </HeroNavLink>
              ))}
            </div>
          </nav>
        </RemoveScroll>
      </div>
    )
  );
};

export default MobileMenu;
