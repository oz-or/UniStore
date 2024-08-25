const FlashSaleTimer = () => {
  return (
    <div className="flex gap-x-2 1024:gap-x-4">
      {/*TODO: programmatically display the remaining time here (make copilot create the code for this)*/}

      <div className="flex items-center gap-x-2 1024:gap-x-4">
        <div className="flex flex-col">
          <span className="text-[8px] 500:text-[10px]">Days</span>
          <span className="font-semibold text-xl 500:text-2xl">03</span>
        </div>
        <span className="scale-75 1024:scale-100">
          <img src="/home/flashSales/Semicolon.svg" alt="" />
        </span>
      </div>
      <div className="flex items-center gap-x-2 1024:gap-x-4">
        <div className="flex flex-col">
          <span className="text-[8px] 500:text-[10px]">Hours</span>
          <span className="font-semibold text-xl 500:text-2xl">23</span>
        </div>

        <span className="scale-75 1024:scale-100">
          <img src="/home/flashSales/Semicolon.svg" alt="" />
        </span>
      </div>
      <div className="flex items-center gap-x-2 1024:gap-x-4">
        <div className="flex flex-col text-center">
          <span className="text-[8px] 500:text-[10px]">Minutes</span>
          <span className="font-semibold text-xl 500:text-2xl">19</span>
        </div>

        <span className="scale-75 1024:scale-100">
          <img src="/home/flashSales/Semicolon.svg" alt="" />
        </span>
      </div>
      <div className="flex items-center gap-x-2 1024:gap-x-4">
        <div className="flex flex-col text-center">
          <span className="text-[8px] 500:text-[10px]">Seconds</span>
          <span className="font-semibold text-xl 500:text-2xl">56</span>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleTimer;
