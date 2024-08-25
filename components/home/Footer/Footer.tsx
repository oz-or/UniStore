"use client";

import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  //TODO: Fix the links

  const [inputValue, setInputValue] = useState("");

  //TODO: Handle the email subscription(the Input field)

  return (
    <section
      id="footer"
      className="bg-black text-text 1440:flex 1440:flex-col 1440:items-center"
    >
      <div className="py-12 px-6 pb-20 max-w-[1440px] 1440:py-24">
        <div className="grid grid-cols-1 500:grid-cols-2 1024:grid-cols-4 1200:grid-cols-5 justify-center gap-y-12 1024:gap-x-12 ">
          <div className="flex flex-col items-center 1024:items-start gap-y-3 ">
            <Link href="/">
              <h2 className="font-bold text-3xl">UniStore</h2>
            </Link>
            <h3 className="font-medium text-2xl py-2">Subscribe</h3>
            <p className="1440:text-base">Get 10% off your first order</p>
            <div className="relative">
              <Input
                className="bg-black text-white w-60 h-10 rounded-md border border-white px-3 py-5 text-sm focus:outline-none focus:ring-1 focus:ring-white 1024:w-48"
                type="email"
                placeholder="Enter your email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <img
                src="/home/footer/Send.svg"
                alt=""
                className="absolute right-2.5 top-2 scale-[85%]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center 1024:items-start gap-y-4 ">
            <Link href="#">
              <h3 className="font-medium text-2xl">Support</h3>
            </Link>
            <ul className="1440:text-base flex flex-col text-center 1024:text-start gap-y-2 1024:gap-y-5">
              <li>
                221 Scotty Brook Crescent, Glossop, SK13 8UG, United Kingdom.
              </li>

              <Link href="#">
                <li>contact@unistore.com</li>
              </Link>
              <Link href="#">
                {/* TODO: Implement that this phone number could actually be called by clicking on it */}
                <li>+01457-864329</li>
              </Link>
            </ul>
          </div>
          <div className="flex flex-col items-center 1024:items-start gap-y-4">
            <Link href="#">
              <h3 className="font-medium text-2xl">Account</h3>
            </Link>
            <ul className="1440:text-base flex flex-col text-center 1024:text-start gap-y-1 1024:gap-y-3">
              <Link href="#">
                <li>My Account</li>
              </Link>
              <Link href="#">
                <li>Login / Register</li>
              </Link>
              <Link href="#">
                <li>Cart</li>
              </Link>
              <Link href="#">
                <li>Wishlist</li>
              </Link>
              <Link href="#">
                <li>Shop</li>
              </Link>
            </ul>
          </div>
          <div className="flex flex-col items-center 1024:items-start gap-y-4">
            <Link href="#">
              <h3 className="font-medium text-2xl">Quick Link</h3>
            </Link>
            <ul className="1440:text-base flex flex-col text-center 1024:text-start gap-y-1 1024:gap-y-5">
              <Link href="#">
                <li>Privacy Policy</li>
              </Link>
              <Link href="#">
                <li>Terms Of Use</li>
              </Link>
              <Link href="#">
                <li>FAQ</li>
              </Link>
              <Link href="/contact">
                <li>Contact</li>
              </Link>
            </ul>
          </div>
          <div className="flex flex-col items-center 1024:items-start gap-y-4">
            <Link href="#">
              <h3 className="font-medium text-2xl">Download App</h3>
            </Link>
            <div className="flex flex-col items-center 1024:items-start gap-y-3">
              <div className="flex flex-col gap-y-2">
                <span className="opacity-70 text-xs">
                  Save $3 with App - New User Only
                </span>
                <div className="flex justify-center gap-x-2">
                  <img src="/home/footer/QRCode.svg" alt="QR Code" />
                  <div className="flex flex-col ">
                    <button>
                      <img src="/home/footer/GooglePlay.svg" alt="Play Store" />
                    </button>
                    <button>
                      <img src="/home/footer/AppStore.svg" alt="App Store" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-8 mt-3">
                <Link href="#">
                  <img src="/home/footer/Facebook.svg" alt="Facebook" />
                </Link>
                <Link href="#">
                  <img src="/home/footer/Twitter.svg" alt="Twitter" />
                </Link>
                <Link href="#">
                  <img src="/home/footer/Instagram.svg" alt="Instagram" />
                </Link>
                <Link href="#">
                  <img src="/home/footer/Linkedin.svg" alt="Linkedin" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-x-2 opacity-40 items-center 1024:items-start pb-8">
        <img src="/home/footer/Copyright.svg" alt="" className="w-5 h-5" />
        <p>Copyright 2024 Unistore. All Rights Reserved</p>
      </div>
    </section>
  );
};

export default Footer;
