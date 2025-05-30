"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import BestSellingItems from "./BestSellingItems";
import BuyNow from "./BuyNow";
import Header from "@/components/Header";

const BestSelling = () => {
  const isMoreThan750 = useMediaQuery("(min-width: 750px)");

  return (
    <section
      id="bestSelling"
      className="flex flex-col 1440:items-center  px-2 1200:px-6 "
    >
      <div className="mt-2 1440:w-[1440px] 1440:px-12">
        <Header
          text="This Month"
          title="Best Selling Products"
          className="justify-between"
        ></Header>

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
