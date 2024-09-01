"use client";

import { useTimer } from "react-timer-hook";

const FlashSaleTimer = ({ expiryTimestamp }: { expiryTimestamp: Date }) => {
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp });

  //Logic, that makes sure that the time is displayed in 2 digits
  const secondsStr = seconds < 10 ? "0" + seconds : seconds;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const hoursStr = hours < 10 ? "0" + hours : hours;
  const daysStr = days < 10 ? "0" + days : days;

  return (
    <div className="flex gap-x-2 1024:gap-x-4">
      <div className="flex items-center gap-x-2 1024:gap-x-4">
        <div className="flex flex-col">
          <span className="text-[8px] 500:text-[10px]">Days</span>
          <span className="font-semibold text-xl 500:text-2xl">{daysStr}</span>
        </div>
        <span className="scale-75 1024:scale-100">
          <img src="/home/flashSales/Semicolon.svg" alt="" />
        </span>
      </div>
      <div className="flex items-center gap-x-2 1024:gap-x-4">
        <div className="flex flex-col">
          <span className="text-[8px] 500:text-[10px]">Hours</span>
          <span className="font-semibold text-xl 500:text-2xl">{hoursStr}</span>
        </div>

        <span className="scale-75 1024:scale-100">
          <img src="/home/flashSales/Semicolon.svg" alt="" />
        </span>
      </div>
      <div className="flex items-center gap-x-2 1024:gap-x-4">
        <div className="flex flex-col text-center">
          <span className="text-[8px] 500:text-[10px]">Minutes</span>
          <span className="font-semibold text-xl 500:text-2xl">
            {minutesStr}
          </span>
        </div>

        <span className="scale-75 1024:scale-100">
          <img src="/home/flashSales/Semicolon.svg" alt="" />
        </span>
      </div>
      <div className="flex items-center gap-x-2 1024:gap-x-4">
        <div className="flex flex-col text-center">
          <span className="text-[8px] 500:text-[10px]">Seconds</span>
          <span className="font-semibold text-xl 500:text-2xl">
            {secondsStr}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleTimer;
