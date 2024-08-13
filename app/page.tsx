import BestSelling from "@/components/home/BestSelling/BestSelling";
import Categories from "@/components/home/Categories/Categories";
import FlashSales from "@/components/home/FlashSale/FlashSales";
import Hero from "@/components/home/Hero/Hero";
import Navbar from "@/components/home/Navbar";
import Sale from "@/components/Sale";

const Home = () => {
  //TODO!: Edit the hover states on every clickable element on the page
  return (
    <div>
      <Sale />
      <Navbar />
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
    </div>
  );
};

export default Home;
