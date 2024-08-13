import BuyNowTimer from "./BuyNowTimer";

const BuyNow = () => {
  //TODO: Implement countdown timer
  return (
    <div className="flex flex-col items-center">
      <div className="flex bg-black my-20 rounded 500:max-w-[650px] 750:max-w-[850px] 1024:max-w-[1170px]">
        <div className="flex flex-col gap-y-3 500:justify-center 500:gap-y-4 py-5 pl-5 pr-2 w-full 1024:w-auto 1024:px-[56px]">
          <h2 className="text-button-1 font-semibold text-[10px] 500:text-[11px] 750:text-sm">
            Categories
          </h2>
          <h1 className="text-text font-semibold 500:text-base 750:text-xl 1024:text-4xl">
            Enhance Your Music Experience
          </h1>
          <div className="flex gap-x-2 1024:gap-x-3">
            <BuyNowTimer value={0o5} text="Days" />
            <BuyNowTimer value={23} text="Hours" />
            <BuyNowTimer value={59} text="Minutes" />
            <BuyNowTimer value={35} text="Seconds" />
          </div>
          <button className="text-text bg-button-1 font-medium py-1 w-[80px] mt-3 text-[10px] 500:py-1.5 500:w-[100px] 500:text-[11px]">
            Buy Now
          </button>
        </div>
        <div className="relative ">
          <img
            src="/home/bestSelling/JBL.svg"
            alt="JBL"
            className="absolute top-0 bottom-0 left-0 right-0 m-auto scale-75 500:min-w-[240px]"
          />

          <img
            src="/home/bestSelling/JBLBg.svg"
            alt=""
            className="h-full mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
