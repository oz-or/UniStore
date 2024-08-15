import Header from "@/components/Header";
import Perk from "./Perk";

const NewArrival = () => {
  return (
    <section
      id="newArrival"
      className="1440:flex 1440:flex-col 1440:items-center "
    >
      <div className="px-2 mt-2 1200:px-6 1440:px-12 1440:w-[1440px]">
        <Header text="Featured" title="New Arrival" />
        <div></div>
      </div>

      <div className="1024:flex 1024:justify-center">
        <div className="grid 750:grid-cols-2 1024:grid-cols-3 justify-center my-10 gap-y-24 1024:w-[1200px]">
          <Perk
            iconLink="/DeliveryIcon.svg"
            title="Free and fast delivery"
            desc="Free delivery for all orders over $140"
          />
          <Perk
            iconLink="/CustomerServiceIcon.svg"
            title="24/7 customer service"
            desc="Friendly 24/7 customer support"
          />
          <Perk
            iconLink="/SecureIcon.svg"
            title="Money back guarantee"
            desc="We return money within 30 days"
            className="750:col-span-2 1024:col-span-1"
          />
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
