import Header from "@/components/Header";
import OurProductsItems from "./OurProductsItems";

//TODO: Implement the OurProducts component (copy the best selling products component and modify it)
const OurProducts = () => {
  return (
    <section
      id="ourProducts"
      className="1440:flex 1440:flex-col 1440:items-center "
    >
      <div className="px-2 mt-2 1200:px-6 1440:px-12 1440:w-[1440px]">
        <Header text="Our Products" title="Explore Our Products" />

        <OurProductsItems />
      </div>
    </section>
  );
};

export default OurProducts;
