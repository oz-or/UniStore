"use client";

import { SidebarToggle } from "@/components/account/sidebar/SidebarToggle";
import { useState, useEffect } from "react";
import Menu from "./Menu";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMoreThan1024 = useMediaQuery("(min-width: 1024px)");

  const handleOpen = () => {
    if (!isMoreThan1024) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (isMoreThan1024) {
      setIsOpen(true);
    }
  }, [isMoreThan1024]);

  return (
    <aside
      className={`bottom-0 1024:translate-x-0 transition-[width] ease-in-out duration-300  absolute top-0 left-0 z-20 1024:static bg-gray-50 opacity-90 rounded-lg 1024:w-[300px] 1200:w-[320px] 
        ${!isOpen ? "w-[45px]" : "w-64"} `}
      onClick={handleOpen}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative h-full 1024:pb-24 flex flex-col py-1  shadow-md ">
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}
