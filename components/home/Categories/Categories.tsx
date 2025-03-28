"use client";

import CategoryItems from "./CategoryItems";
import Header from "@/components/Header";

const Categories = () => {
  return (
    <section
      id="categories"
      className="1440:flex 1440:flex-col 1440:items-center "
    >
      <div className="px-2 mt-2 1200:px-6 1440:px-12 1440:w-[1440px]">
        <Header text="Categories" title="Browse By Category" />

        <CategoryItems />
      </div>

      <hr className="border-black w-full my-16 opacity-10 max-w-[1440px]" />
    </section>
  );
};

export default Categories;
