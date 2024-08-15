import BestSelling from "@/components/home/BestSelling/BestSelling";
import Categories from "@/components/home/Categories/Categories";
import FlashSales from "@/components/home/FlashSale/FlashSales";
import Footer from "@/components/home/Footer/Footer";
import Hero from "@/components/home/Hero/Hero";
import Navbar from "@/components/home/Navbar";
import NewArrival from "@/components/home/NewArrival/NewArrival";
import OurProducts from "@/components/home/OurProducts/OurProducts";
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
      <OurProducts />
      <NewArrival />
      <Footer />
    </div>
  );
};

export default Home;
