"use client";

import ProductCard from "@/components/ui/ProductCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getProducts } from "@/utils/apiProducts";
import { useEffect, useState } from "react";
import OurProductsBtn from "./OurProductsBtn";

const OurProductsItems = () => {
  const [ourProductsItems, setOurProductsItems] = useState<ProductsType[]>([]);
  const [hovered, setHovered] = useState(0);

  const [itemsToRender, setItemsToRender] = useState<ProductsType[]>([]);
  const [viewAll, setViewAll] = useState(false);

  const isMoreThan750 = useMediaQuery("(min-width: 750px)");
  const isMoreThan1200 = useMediaQuery("(min-width: 1200px)");
  const isMoreThan1440 = useMediaQuery("(min-width: 1440px)");

  useEffect(() => {
    getProducts().then((data) => {
      data !== null && setOurProductsItems(data);
    });
  }, []);

  useEffect(() => {
    if (viewAll) {
      setItemsToRender(ourProductsItems);
    } else {
      if (isMoreThan1440) {
        setItemsToRender(ourProductsItems.slice(0, 5));
      } else if (isMoreThan1200) {
        setItemsToRender(ourProductsItems.slice(0, 4));
      } else if (isMoreThan750) {
        setItemsToRender(ourProductsItems.slice(0, 3));
      } else {
        setItemsToRender(ourProductsItems.slice(0, 2));
      }
    }
  }, [
    ourProductsItems,
    viewAll,
    isMoreThan750,
    isMoreThan1200,
    isMoreThan1440,
  ]);

  return (
    <>
      <div className="grid grid-cols-2 750:grid-cols-3 1200:grid-cols-4 1440:grid-cols-5">
        {itemsToRender.map(
          ({
            id,
            img,
            name,
            price,
            rating: starRating,
            num_ratings: numberOfRatings,
          }) => (
            <ProductCard
              key={id}
              i={id}
              img={img}
              name={name}
              price={price}
              rating={starRating}
              numberOfRatings={numberOfRatings}
              hovered={hovered}
              setHovered={setHovered}
            />
          )
        )}
      </div>
      <OurProductsBtn viewAll={viewAll} setViewAll={setViewAll} />
    </>
  );
};

export default OurProductsItems;
