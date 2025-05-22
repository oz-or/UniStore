"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import Link from "next/link";

const Sale = () => {
  /* TODO: make the link connect to the corresponding page */
  /* TODO: Make the language selector work later */

  const moreThan750 = useMediaQuery("(min-width: 750px)");

  return (
    <div className="bg-black text-text text-xs 1024:text-sm px-2 py-1 flex justify-center 500:py-2.5">
      <div className="flex 750:justify-between 750:w-[650px] 1024:w-[900px]">
        <div className="flex items-center gap-x-6 500:gap-x-2 1024:gap-x-3">
          <p>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <Link href="" className="underline text-nowrap font-semibold">
            Shop Now
          </Link>
        </div>
        {moreThan750 && (
          <div className="flex items-center cursor-pointer">
            <p className="text-xs 1024:text-sm">English</p>
            <img src="/DropDownWhite.svg" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sale;


