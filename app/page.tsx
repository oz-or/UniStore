import BestSelling from "@/components/home/BestSelling/BestSelling";
import Categories from "@/components/home/Categories/Categories";
import FlashSales from "@/components/home/FlashSale/FlashSales";
import Hero from "@/components/home/Hero/Hero";
import NewArrival from "@/components/home/NewArrival/NewArrival";
import OurProducts from "@/components/home/OurProducts/OurProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
      <OurProducts />
      <NewArrival />
    </>
  );
};

export default Home;
