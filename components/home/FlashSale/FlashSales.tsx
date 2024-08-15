import Header from "@/components/Header";
import FlashSaleItems from "./FlashSaleItems";
import FlashSaleTimer from "./FlashSaleTimer";

const FlashSales = () => {
  /* TODO: programmatically display the items that are on sale from the DB*/
  return (
    <section
      id="flashSales"
      className="1440:flex 1440:flex-col 1440:items-center "
    >
      <div className="px-2 mt-2 1200:px-6 1440:px-12 1440:w-[1440px]">
        <Header text="Today's" title="Flash Sales">
          <FlashSaleTimer />
        </Header>

        <FlashSaleItems />
      </div>

      <hr className="border-black w-full mt-16 opacity-10 max-w-[1440px]" />
    </section>
  );
};

export default FlashSales;
