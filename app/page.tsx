import FlashSales from "@/components/home/FlashSales";
import Hero from "@/components/home/Hero";
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
    </div>
  );
};

export default Home;
