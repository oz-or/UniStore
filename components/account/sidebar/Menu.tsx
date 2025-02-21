"use client";

import { logout } from "@/app/(auth)/login/actions";
import { accountSidebarItems } from "@/data";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Menu = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logging out");
    await logout();
    router.push("/login");
    console.log("Successfully Logged out");
  };
  return (
    <>
      <button className="inline-flex items-center justify-center gap-x-2 [&_svg]:size-4 500:[&_svg]:size-5 pt-6 750:pt-14 1024:mb-6 ">
        <Link
          href="/account"
          className={`flex items-center gap-x-2  ${
            isOpen && "translate-y-[-2px]"
          }`}
        >
          <PanelsTopLeft className="w-6 h-6 " />
          <h1
            className={`
                font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 h-[26px] 1024:text-2xl
                ${
                  !isOpen
                    ? "-translate-x-96 opacity-0 hidden"
                    : "translate-x-0 opacity-100 "
                }
              `}
          >
            UniStore
          </h1>
        </Link>
      </button>
      <ul
        className={`flex flex-col 500:gap-y-2.5 1024:gap-y-3 1200:gap-y-4 overflow-clip 1024:pl-3 ${
          !isOpen
            ? "mt-[24px] gap-y-1 500:gap-y-2.5"
            : "gap-y-[1px] mt-3 500:mt-[18px] "
        }`}
      >
        {accountSidebarItems.map(({ text, alt, icon, link }, i) => (
          <li key={i}>
            <Link
              href={!isOpen ? "" : link}
              className={`flex items-center gap-x-3 py-1.5 font-semibold text-xs 1024:text-sm 1200:text-base rounded opacity-85 1024:gap-x-4  ${
                !isOpen ? "px-3.5 " : "px-3.5 hover:bg-neutral-50"
              } transition-[padding] ease-in-out duration-300`}
            >
              <img
                src={icon}
                alt={alt}
                className="w-[13px] h-[13px] 500:w-[17px] 500:h-[17px] 1024:w-5 1024:h-5 1200:h-6 1200:w-6"
              />
              <span
                className={`
                  whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300
                ${
                  !isOpen
                    ? "-translate-x-96 opacity-0 hidden"
                    : "translate-x-0 opacity-100"
                }
              `}
              >
                {text}
              </span>
            </Link>
          </li>
        ))}

        <li>
          <button onClick={handleLogout}>
            <Link
              href={!isOpen ? "" : "/"}
              className={`flex items-center gap-x-3 py-1.5 font-semibold text-xs 1024:text-sm 1200:text-base rounded opacity-85 1024:gap-x-4  ${
                !isOpen ? "px-3.5 " : "px-3.5 hover:bg-neutral-50"
              } transition-[padding] ease-in-out duration-300`}
            >
              <img
                src="/account/logout.png"
                alt="Logout"
                className="w-[13px] h-[13px] 500:w-[17px] 500:h-[17px] 1024:w-5 1024:h-5 1200:h-6 1200:w-6 translate-x-[2px] 1024:translate-x-[3px]"
              />
              <span
                className={`
                whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300
                ${
                  !isOpen
                    ? "-translate-x-96 opacity-0 hidden"
                    : "translate-x-0 opacity-100"
                }
                `}
              >
                Logout
              </span>
            </Link>
          </button>
        </li>
      </ul>
    </>
  );
};

export default Menu;
