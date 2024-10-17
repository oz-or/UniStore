"use client";

import ProductCard from "@/components/ui/ProductCard";
import { getProducts } from "@/utils/apiProducts";
import { useEffect, useState } from "react";

const OurProductsItems = () => {
  const [showAllItems, setShowAllItems] = useState(false);
  const [products, setProducts] = useState<ProductsType[]>([]);

  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    getProducts().then((data) => {
      data !== null && setProducts(data);
    });
  }, []);

  const handleShowitems = () => {
    setShowAllItems(!showAllItems);
  };

  return (
    <>
      <div className="grid grid-cols-2 750:grid-cols-3 1200:grid-cols-4 1440:grid-cols-5">
        {products.map(
          (
            {
              img,
              name,
              price,
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
              rating={starRating}
              numberOfRatings={numberOfRatings}
              hovered={hovered}
              setHovered={setHovered}
            />
          )
        )}
      </div>
      {/* 
        TODO: Render 1 row of products here from the DB. The rest should appear when the user clicks on the view all products button
        */}
      <div className="flex justify-center mt-4 750:mt-6 1024:mt-8">
        <button
          onClick={handleShowitems}
          className="bg-secondary-2 text-text py-3 px-10 text-sm  font-medium 500:py-3 750:text-sm 500:w-[220px] rounded"
        >
          {!showAllItems ? "View All Products" : "Show Less"}
        </button>
      </div>
    </>
  );
};

export default OurProductsItems;
