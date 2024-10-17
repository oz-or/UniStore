"use client";

import FlashSaleButton from "./FlashSaleButton";
import { getFlashSaleProducts } from "@/utils/apiProducts";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";

const FlashSaleItems = () => {
  const [flashSaleItems, setFlashSaleItems] = useState<ProductsType[]>([]);
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    getFlashSaleProducts().then((data) => {
      data !== null && setFlashSaleItems(data);
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 750:grid-cols-3 1200:grid-cols-4 1440:grid-cols-5">
        {flashSaleItems.map(
          (
            {
              discount: discountLabel,
              img,
              name,
              price,
              old_price: oldPrice,
              rating: starRating,
              num_ratings: numberOfRatings,
            },
            i
          ) => (
            <ProductCard
              key={i}
              i={i}
              img={img}
              name={name}
              price={price}
              oldPrice={oldPrice}
              rating={starRating}
              numberOfRatings={numberOfRatings}
              discount={discountLabel}
              hovered={hovered}
              setHovered={setHovered}
            />
          )
        )}
      </div>
      {/* 
        TODO: Render 1 row of products here from the DB. The rest should appear when the user clicks on the view all products button
        */}
      <FlashSaleButton />
    </>
  );
};

export default FlashSaleItems;
