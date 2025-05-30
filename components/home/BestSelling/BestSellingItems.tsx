"use client";

import ProductCard from "@/components/ui/ProductCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getBestSellingProducts } from "@/utils/apiProducts";
import { useEffect, useState } from "react";
import BestSellingButton from "./BestSellingButton";

const BestSellingItems = () => {
  const [bestSellingItems, setBestSellingItems] = useState<ProductsType[]>([]);
  const [hovered, setHovered] = useState(0);

  const [itemsToRender, setItemsToRender] = useState<ProductsType[]>([]);
  const [viewAll, setViewAll] = useState(false);

  const isMoreThan750 = useMediaQuery("(min-width: 750px)");
  const isMoreThan1024 = useMediaQuery("(min-width: 1024px)");
  const isMoreThan1440 = useMediaQuery("(min-width: 1440px)");

  useEffect(() => {
    getBestSellingProducts().then((data) => {
      data !== null && setBestSellingItems(data);
    });
  }, []);

  useEffect(() => {
    if (viewAll) {
      setItemsToRender(bestSellingItems);
    } else {
      if (isMoreThan1440) {
        setItemsToRender(bestSellingItems.slice(0, 5));
      } else if (isMoreThan1024) {
        setItemsToRender(bestSellingItems.slice(0, 4));
      } else if (isMoreThan750) {
        setItemsToRender(bestSellingItems.slice(0, 3));
      } else {
        setItemsToRender(bestSellingItems.slice(0, 2));
      }
    }
  }, [
    bestSellingItems,
    viewAll,
    isMoreThan750,
    isMoreThan1024,
    isMoreThan1440,
  ]);

  return (
    <>
      <div className="grid grid-cols-2 750:grid-cols-3 1024:grid-cols-4 1440:grid-cols-5">
        {itemsToRender.map(({ id, img, name, price, in_stock: inStock }) => (
          <ProductCard
            key={id}
            i={id}
            img={img}
            name={name}
            price={price}
            inStock={inStock}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
      <BestSellingButton viewAll={viewAll} setViewAll={setViewAll} />
    </>
  );
};

export default BestSellingItems;
