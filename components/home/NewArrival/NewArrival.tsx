import Perk from "./Perk";

const NewArrival = () => {
  return (
    <section
      id="newArrival"
      className="1200:flex 1200:flex-col 1200:items-center py-5"
    >
      <div className="1024:flex 1024:justify-center 1024:py-12">
        <div className="grid 750:grid-cols-2 1024:grid-cols-3 justify-center mb-10 mt-20 gap-y-24 1024:w-[1200px]">
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
