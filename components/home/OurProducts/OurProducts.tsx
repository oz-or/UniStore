import OurProductsItems from "./OurProductsItems";

//TODO: Implement the OurProducts component (copy the best selling products component and modify it)
const OurProducts = () => {
  return (
    <section
      id="ourProducts"
      className="1440:flex 1440:flex-col 1440:items-center "
    >
      <div className="px-2 mt-2 1200:px-6 1440:px-12 1440:w-[1440px]">
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center px-4 pt-5 1024:pt-16 1024:px-5">
            <span className="bg-secondary-2 w-3 h-6 block rounded" />
            <h2 className="text-secondary-2 font-semibold 750:text-base">
              Our Products
            </h2>
          </div>
          <div className="flex gap-x-6 items-center px-4 750:gap-x-28 1024:px-5 1024:pb-4">
            <h1 className="text-xl font-medium 500:text-2xl 1024:text-4xl">
              Explore Our Products
            </h1>
          </div>
        </div>
        <OurProductsItems />
      </div>

      <hr className="border-black w-full my-16 opacity-10 max-w-[1440px]" />
    </section>
  );
};

export default OurProducts;
