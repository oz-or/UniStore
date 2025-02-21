"use client";

import ProductCard from "@/components/ui/ProductCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getBestSellingProducts } from "@/utils/apiProducts";
import { useEffect, useState } from "react";

const BestSellingItems = () => {
  const [bestSellingItems, setBestSellingItems] = useState<ProductsType[]>([]);
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    getBestSellingProducts().then((data) => {
      data !== null && setBestSellingItems(data);
    });
  }, []);

  const isMoreThan1440 = useMediaQuery("(min-width: 1440px)");
  return (
    <>
      <div className="grid grid-cols-2 750:grid-cols-3 1024:grid-cols-4 1440:grid-cols-5">
        {bestSellingItems.map(
          ({
            id,
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
              rating={starRating}
              numberOfRatings={numberOfRatings}
              hovered={hovered}
              setHovered={setHovered}
              oldPrice={oldPrice}
            />
          )
        )}
      </div>
    </>
  );
};

export default BestSellingItems;
