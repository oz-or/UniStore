"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProducts } from "@/utils/apiProducts";
import ProductList from "@/components/ProductList";
import Spinner from "@/components/ui/Spinner";
import NavigationHeading from "@/components/NavigationHeading";
import { slugify } from "@/lib/helpers";
import { heroNavLinks } from "@/data";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatCategory(category: string | string[] | undefined) {
  if (!category) return "";
  const cat = Array.isArray(category) ? category[0] : category;
  return decodeURIComponent(cat).replace(/-/g, " ");
}

function getCategoryTitle(category: string | string[] | undefined) {
  if (!category) return "";
  const cat = Array.isArray(category) ? category[0] : category;
  const match = heroNavLinks.find((link) => slugify(link.text) === cat);
  return match ? match.text : "";
}

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        if (data !== null) setProducts(shuffleArray(data).slice(0, 30));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const categoryTitle = getCategoryTitle(category);

  return (
    <section className="flex flex-col 1440:items-center px-2 1200:px-6">
      <div className="pb-16 1024:pb-16 w-full">
        <div className="1440:pl-8">
          <NavigationHeading pageName1={categoryTitle} />
        </div>
        <div className="w-full flex justify-center">
          <h1 className="text-3xl 1024:text-4xl font-bold mt-8 mb-8 text-center">
            {categoryTitle}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Spinner />
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </section>
  );
}
