"use client";

import StarRatings from "@/components/StarRatings";
import { ourProductsItems } from "@/data";
import { useState } from "react";

const OurProductsItems = () => {
  //TODO: When any of the cards are hovered, show the Add To Cart button programmatically and remove it from the first one (the first one should have it by default)

  const [showAllItems, setShowAllItems] = useState(false);

  const handleShowitems = () => {
    setShowAllItems(!showAllItems);
  };

  return (
    <>
      <div className="grid grid-cols-2 750:grid-cols-3 1200:grid-cols-4 1440:grid-cols-5">
        {ourProductsItems.map(
          ({ img, name, price, rating: starRating, numberOfRatings }, i) => (
            <div key={i} className="scale-90 flex flex-col gap-y-4">
              <div className="flex flex-col relative bg-secondary items-center ">
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
                {/* TODO: Add this button on hover to every element with an animation that it goes in from under */}
                {/* {i === 0 && (
                  <button className="absolute bottom-0 bg-black text-primary-1 w-full py-1 rounded-b">
                    Add To Cart
                  </button>
                )} */}
              </div>
              <div className="flex flex-col">
                <h3 className="font-medium text-[14px] 500:text-[18px]">
                  {name}
                </h3>
                <div className="flex items-center gap-x-3 h-7">
                  <div className=" mb-[-5px] text-[14px] font-medium flex 500:text-base">
                    <span className="text-secondary-2">${price}</span>
                  </div>
                  <div className="flex items-center ml-[-35px] 500:ml-[-30px]">
                    <StarRatings starRating={starRating} />
                    <span className="opacity-60 ml-[-20px] ">
                      ({numberOfRatings})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {/* 
        TODO: Render 1 row of products here from the DB. The rest should appear when the user clicks on the view all products button
        */}
      <div className="flex justify-center mt-2 1024:mt-5">
        <button
          onClick={handleShowitems}
          className="bg-secondary-2 text-text py-2 px-8 text-xs w-[170px] font-medium 500:py-3 750:text-sm 500:w-[200px] rounded"
        >
          {!showAllItems ? "View All Products" : "Show Less"}
        </button>
      </div>
    </>
  );
};

export default OurProductsItems;
