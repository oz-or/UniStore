import Header from "@/components/Header";
import FlashSaleItems from "./FlashSaleItems";
import { flashSaleTimerDate } from "@/lib/helpers";
import dynamic from "next/dynamic";

const FlashSales = () => {
  // The timer component is dynamically imported in order to make it work with SSR and don't get a hydration error
  const FlashSaleTimer = dynamic(() => import("./FlashSaleTimer"), {
    ssr: false,
  });

  return (
    <section
      id="flashSales"
      className="1440:flex 1440:flex-col 1440:items-center "
    >
      <div className="px-2 mt-2 1200:px-6 1440:px-12 1440:w-[1440px]">
        <Header text="Today's" title="Flash Sales">
          <FlashSaleTimer expiryTimestamp={flashSaleTimerDate} />
        </Header>

        <FlashSaleItems />
      </div>

      <hr className="border-black w-full mt-16 opacity-10 max-w-[1440px]" />
    </section>
  );
};

export default FlashSales;
