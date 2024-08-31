"use client";

import { heroNavLinks } from "@/data";
import HeroNavLink from "./HeroNavLink";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RemoveScroll } from "react-remove-scroll";

const MobileMenu = ({ isMoreThan1024 }: { isMoreThan1024: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isHovered, setIsHovered] = useState(0);

  return (
    !isMoreThan1024 && (
      <div className="relative">
        <div>
          <div className="flex py-2 gap-x-5 500:gap-x-14 750:py-3 750:px-6 750:gap-x-16 px-2 50:px-4">
            <button
              className="flex gap-x-1 items-center"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <span>Categories</span>
              <img className="w-3.5 " src="/ArrowRightBlack.svg" alt="" />
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

        {/*  The RemoveScroll from the react-remove-scroll package removes the option to scroll while the mobile menu is open */}

        <RemoveScroll enabled={isOpen}>
          <div
            className={`absolute z-40 bg-primary-1 top-[-94px] 500:top-[-90px] 750:top-[-112px] w-screen flex justify-between py-3 px-5 items-start h-screen 500:py-4 500:px-7 750:px-9 750:py-6 pt-4 ease-in-out duration-300 right-0 ${
              isOpen ? "translate-x-0 " : "translate-x-[-100%]"
            } `}
          >
            {/* TODO: Style the Mobile Menu somehow (I think that I should do it exactly like in the Crypto project) */}
            <div className="flex flex-col gap-y-4 ">
              {heroNavLinks.map(({ href, text }, i) => (
                <HeroNavLink
                  key={i}
                  href={href}
                  className={
                    "flex justify-between items-center gap-x-4 font-medium text-lg "
                  }
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
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <Image
                className="m-1"
                src="/x.png"
                alt=""
                width={20}
                height={20}
              />
            </button>
          </div>
        </RemoveScroll>
      </div>
    )
  );
};

export default MobileMenu;
