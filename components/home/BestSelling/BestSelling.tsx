"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import BestSellingItems from "./BestSellingItems";
import BuyNow from "./BuyNow";

//TODO: Create the BestSelling component (literally copy-paste the FlashSales and FlashSaleItems components and refactor them)
const BestSelling = () => {
  const isMoreThan750 = useMediaQuery("(min-width: 750px)");

  return (
    <section
      id="bestSelling"
      className="flex flex-col 1440:items-center  px-2 1200:px-6 "
    >
      <div className="mt-2 1440:w-[1440px] 1440:px-12">
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center px-3 1024:pt-8 ">
            <span className="bg-secondary-2 w-3 h-6 block rounded" />
            <h2 className="text-secondary-2 font-semibold 750:text-base">
              This Month
            </h2>
          </div>
          <div className="flex flex-col 750:flex-row gap-x-6 px-3 750:gap-x-28  1024:pb-4 justify-between">
            <h1 className="text-xl font-medium 500:text-2xl 1024:text-4xl">
              Best Selling Products
            </h1>
            {/* 
            TODO: The View All button should take the user to a separate page
            */}
            <div className="hidden 750:block 1440:mr-4">
              <button className="bg-secondary-2 text-text py-2 px-8 text-xs w-[170px] font-medium 500:py-3 750:text-sm 500:w-[200px] rounded">
                View All
              </button>
            </div>
          </div>
        </div>
        <BestSellingItems />
        <div className="flex justify-center mt-2 750:hidden">
          <button className="bg-secondary-2 text-text py-2 px-8 text-xs w-[170px] font-medium 500:py-3 500:w-[200px] rounded">
            View All
          </button>
        </div>
      </div>

      <BuyNow />
    </section>
  );
};

export default BestSelling;
