"use client";
import { SidebarToggle } from "@/components/account/sidebar/SidebarToggle";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Menu from "./Menu";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen translate-y-[138px] 1024:translate-y-[118px] lg:translate-x-0 transition-[width] ease-in-out duration-300 ",
        !isOpen ? "w-[75px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !isOpen ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/account" className="flex items-center gap-2">
            <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                !isOpen
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              Brand
            </h1>
          </Link>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}
