"use client";

import { buyNowTimerDate } from "@/lib/helpers";
import dynamic from "next/dynamic";

const BuyNow = () => {
  // The timer component is dynamically imported in order to make it work with SSR and don't get a hydration error
  const BuyNowTimer = dynamic(() => import("./BuyNowTimer"), {
    ssr: false,
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex bg-black my-20 rounded 500:max-w-[650px] 750:max-w-[850px] 1024:max-w-[1170px]">
        <div className="flex flex-col gap-y-3 500:justify-center 500:gap-y-4 py-5 pl-5 pr-2 w-full 1024:w-auto 1024:px-[56px]">
          <h2 className="text-button-1 font-semibold text-[10px] 500:text-[11px] 750:text-sm">
            Categories
          </h2>
          <h1 className="text-text font-semibold 500:text-base 750:text-xl 1024:text-4xl">
            Enhance Your Music Experience
          </h1>

          <BuyNowTimer expiryTimestamp={buyNowTimerDate} />

          <button className="text-text bg-button-1 font-medium py-1 w-[80px] mt-3 text-[10px] 500:py-1.5 500:w-[100px] 500:text-[11px]">
            Buy Now
          </button>
        </div>
        <div className="relative ">
          <img
            src="/home/bestSelling/JBL.svg"
            alt="JBL"
            className="absolute top-0 bottom-0 left-0 right-0 m-auto scale-75 500:min-w-[240px]"
          />

          <img
            src="/home/bestSelling/JBLBg.svg"
            alt=""
            className="h-full mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
