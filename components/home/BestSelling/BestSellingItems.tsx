"use client";

import StarRatings from "@/components/StarRatings";
import { bestSellingItems } from "@/data";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const BestSellingItems = () => {
  const isMoreThan1440 = useMediaQuery("(min-width: 1440px)");
  return (
    <>
      <div className="grid grid-cols-2 750:grid-cols-3 1024:grid-cols-4 1440:grid-cols-5">
        {bestSellingItems.map(
          (
            { img, name, price, oldPrice, rating: starRating, numberOfRatings },
            i
          ) => {
            /* TODO: If screen width is more than 750 but less than 1024 there should be only three items rendered */
            return !isMoreThan1440 && i > 3 ? null : (
              <div key={i} className="scale-90 flex flex-col gap-y-4">
                <div className="flex flex-col relative bg-secondary items-center">
                  <img
                    className="pt-6 scale-75 h-[180px] 500:h-[250px]"
                    src={img}
                    alt={name}
                  />
                  <div className="bg-primary-1 absolute rounded-full p-1.5 right-2 top-2 w-7 h-auto 750:w-8 ">
                    <img src="/WishlistHeart.svg" alt="" />
                  </div>
                  <img
                    className="absolute right-2 top-11 w-7 750:w-8 h-auto 750:top-12"
                    src="/Eye.svg"
                    alt=""
                  />
                  {/* TODO: Only add this button when the item is hovered, not by default
                 
                  <button className="absolute bottom-0 bg-black text-primary-1 w-full py-1 rounded-b">
                    Add To Cart
                  </button>
                */}
                </div>
                <div className="flex flex-col 500:gap-y-1">
                  <h3 className="font-medium text-[14px] 500:text-[18px]">
                    {name}
                  </h3>
                  <div className="mt-1 mb-[-8px] text-[14px] font-medium flex gap-x-3 500:text-base">
                    <span className="text-secondary-2">${price}</span>
                    <span className="line-through opacity-60">${oldPrice}</span>
                  </div>
                  <div className="flex items-center ml-[-35px] 500:ml-[-30px]">
                    <StarRatings starRating={starRating} />
                    <span className="opacity-60 ml-[-20px] ">
                      ({numberOfRatings})
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default BestSellingItems;
