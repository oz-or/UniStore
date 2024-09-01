import { useTimer } from "react-timer-hook";

const BuyNowTimer = ({ expiryTimestamp }: { expiryTimestamp: Date }) => {
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp });

  //Logic, that makes sure that the time is displayed in 2 digits
  const secondsStr = seconds < 10 ? "0" + seconds : seconds;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const hoursStr = hours < 10 ? "0" + hours : hours;
  const daysStr = days < 10 ? "0" + days : days;
  return (
    <div className="flex gap-x-2 1024:gap-x-3">
      <div className="rounded-full bg-primary-1 w-7 h-7 flex flex-col items-center justify-center 750:w-10 750:h-10">
        <span className="font-semibold text-[10px] 750:text-sm">{daysStr}</span>
        <span className="text-[5px] mt-[-2px] 750:text-[7px]">Days</span>
      </div>
      <div className="rounded-full bg-primary-1 w-7 h-7 flex flex-col items-center justify-center 750:w-10 750:h-10">
        <span className="font-semibold text-[10px] 750:text-sm">
          {hoursStr}
        </span>
        <span className="text-[5px] mt-[-2px] 750:text-[7px]">Hours</span>
      </div>
      <div className="rounded-full bg-primary-1 w-7 h-7 flex flex-col items-center justify-center 750:w-10 750:h-10">
        <span className="font-semibold text-[10px] 750:text-sm">
          {minutesStr}
        </span>
        <span className="text-[5px] mt-[-2px] 750:text-[7px]">Minutes</span>
      </div>
      <div className="rounded-full bg-primary-1 w-7 h-7 flex flex-col items-center justify-center 750:w-10 750:h-10">
        <span className="font-semibold text-[10px] 750:text-sm">
          {secondsStr}
        </span>
        <span className="text-[5px] mt-[-2px] 750:text-[7px]">Seconds</span>
      </div>
    </div>
  );
};

export default BuyNowTimer;
