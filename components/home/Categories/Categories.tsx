"use client";

import { useState, useEffect } from "react";
import CategoryItems from "./CategoryItems";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import { getProducts } from "@/utils/apiProducts";
import Spinner from "@/components/ui/Spinner";

function shuffleArray(array: any[]) {
  // Fisher-Yates shuffle
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [shuffledProducts, setShuffledProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        if (data !== null) setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Shuffle products when a category is selected
  useEffect(() => {
    if (selectedCategory && products.length > 0) {
      setShuffledProducts(shuffleArray(products));
    }
  }, [selectedCategory, products]);

  return (
    <section
      id="categories"
      className="1440:flex 1440:flex-col 1440:items-center "
    >
      <div className="px-2 mt-2 1200:px-6 1440:px-12 1440:w-[1440px]">
        <Header text="Categories" title="Browse By Category" />

        <CategoryItems
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
          hoveredCategory={hoveredCategory}
          setHoveredCategory={setHoveredCategory}
        />

        {selectedCategory && (
          <>
            <div className=" mt-6 mb-2">
              <div className="grid grid-cols-2 gap-4 750:grid-cols-3 1024:grid-cols-4 1200:grid-cols-5">
                <h2 className="ml-[10px] 500:ml-[13px] 1200:ml-[15px] text-base col-span-2 750:col-span-3 1024:col-span-4 1200:col-span-5 500:text-xl font-bold">
                  Showing all products for &quot;{selectedCategory}&quot;
                </h2>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Spinner />
              </div>
            ) : (
              <ProductList products={shuffledProducts} />
            )}
          </>
        )}
      </div>

      <hr className="border-black w-full my-16 opacity-10 max-w-[1440px]" />
    </section>
  );
};

export default Categories;
