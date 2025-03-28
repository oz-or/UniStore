"use client";

import FlashSaleButton from "./FlashSaleButton";
import { getFlashSaleProducts } from "@/utils/apiProducts";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const FlashSaleItems = () => {
  const [flashSaleItems, setFlashSaleItems] = useState<ProductsType[]>([]);
  const [hovered, setHovered] = useState(0);
  const [itemsToRender, setItemsToRender] = useState<ProductsType[]>([]);
  const [viewAll, setViewAll] = useState(false);

  const isMoreThan750 = useMediaQuery("(min-width: 750px)");
  const isMoreThan1200 = useMediaQuery("(min-width: 1200px)");
  const isMoreThan1440 = useMediaQuery("(min-width: 1440px)");

  useEffect(() => {
    getFlashSaleProducts().then((data) => {
      data !== null && setFlashSaleItems(data);
    });
  }, []);

  useEffect(() => {
    if (viewAll) {
      setItemsToRender(flashSaleItems);
    } else {
      if (isMoreThan1440) {
        setItemsToRender(flashSaleItems.slice(0, 5));
      } else if (isMoreThan1200) {
        setItemsToRender(flashSaleItems.slice(0, 4));
      } else if (isMoreThan750) {
        setItemsToRender(flashSaleItems.slice(0, 3));
      } else {
        setItemsToRender(flashSaleItems.slice(0, 2));
      }
    }
  }, [flashSaleItems, viewAll, isMoreThan750, isMoreThan1200, isMoreThan1440]);

  return (
    <>
      <div className="grid grid-cols-2 750:grid-cols-3 1200:grid-cols-4 1440:grid-cols-5">
        {itemsToRender.map(
          ({
            id,
            discount: discountLabel,
            img,
            name,
            price,
            old_price: oldPrice,
            rating: starRating,
            num_ratings: numberOfRatings,
          }) => (
            <ProductCard
              key={id}
              i={id}
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
      <FlashSaleButton viewAll={viewAll} setViewAll={setViewAll} />
    </>
  );
};

export default FlashSaleItems;
