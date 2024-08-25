"use client";

import { heroNavLinks } from "@/data";
import HeroNavLink from "./HeroNavLink";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MobileMenu = ({ isMoreThan1024 }: { isMoreThan1024: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    !isMoreThan1024 && (
      <div className="relative">
        <div>
          <div className="flex py-2 gap-x-5 500:gap-x-14 750:py-3 750:px-6 750:gap-x-16 px-2 50:px-4">
            <button
              className="flex gap-x-1 items-center"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <span>Categories</span>
              <img
                className={`w-3.5 ${isOpen && "rotate-[180deg]"} transition `}
                src="/ArrowRight.svg"
                alt=""
              />
            </button>

            <div className="flex gap-x-4 500:gap-x-10 750:gap-x-16">
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link href="#" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* TODO: Disable scrolling while the mobile menu is open */}
        {/* TODO: The mobile navbaar should slide in from the left */}
        {isOpen && (
          <div className="absolute z-40 bg-primary-1 top-[-94px] 500:top-[-90px] 750:top-[-112px] w-screen flex justify-between py-3 px-5 items-start h-screen 500:py-4 500:px-7 750:px-9 750:py-6 ">
            <div>
              {heroNavLinks.map(({ href, text }, i) => (
                <HeroNavLink
                  key={i}
                  href={href}
                  className="flex justify-between items-center py-1.5 gap-x-4 font-medium 500:text-base 750:text-lg"
                  text={text}
                  handleClick={() => setIsOpen(false)}
                >
                  {i <= 1 && (
                    <div
                      className="rotate-[270deg] "
                      onClick={() => setIsOpen(false)}
                    >
                      <img src="/DropDownBlack.svg" alt="" />
                    </div>
                  )}
                </HeroNavLink>
              ))}
            </div>
            <button onClick={() => setIsOpen(false)}>
              <Image
                className="m-1"
                src="/x.png"
                alt=""
                width={20}
                height={20}
              />
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default MobileMenu;
