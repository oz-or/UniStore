"use client";

import { SidebarToggle } from "@/components/account/sidebar/SidebarToggle";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Menu from "./Menu";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside
      className={`fixed top-0 left-0 z-20 h-screen translate-y-[138px] 1024:translate-y-[118px] lg:translate-x-0 transition-[width] ease-in-out duration-300 
        ${!isOpen ? "w-[75px]" : "w-72"}`}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <button className="inline-flex items-center justify-center gap-2 [&_svg]:size-5">
          <Link href="/account" className="flex items-center gap-2">
            <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
              className={`
                font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300
                ${
                  !isOpen
                    ? "-translate-x-96 opacity-0 hidden"
                    : "translate-x-0 opacity-100"
                }
              `}
            >
              UniStore
            </h1>
          </Link>
        </button>

        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}
