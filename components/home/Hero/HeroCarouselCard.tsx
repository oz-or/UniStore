const HeroCarouselCard = ({
  id,
  img,
  textFirst,
  textSecond,
  link,
}: {
  id: number;
  img: string;
  textFirst: string;
  textSecond: string;
  link: string;
}) => {
  return (
    <div className="embla__slide text-text flex items-center justify-center px-6 pt-4 gap-x-2 1200:justify-around">
      <div className="w-[300px] flex flex-col gap-y-5 1024:translate-y-[-20px] 1200:translate-y-0">
        <div className="flex gap-x-1.5 500:gap-x-3 750:gap-x-5">
          <img
            src="/home/hero/apple-logo.png"
            alt="Apple logo"
            className="w-4 h-5 500:w-6 500:h-7 750:w-8 750:h-9 "
          />
          <span className="text-xs translate-y-1 500:text-sm 500:translate-y-1.5 750:text-base 750:translate-y-2.5 ">
            iPhone 14 Series
          </span>
        </div>
        <div className="text-2xl 500:text-[32px] leading-snug font-medium 750:text-[40px] 1200:text-5xl 1200:leading-tight">
          {textFirst}
          <br />
          {textSecond}
        </div>
        <button className="flex text-base gap-x-1 font-medium 500:gap-x-2">
          <span className="underline-offset-[8px] underline 500:underline-offset-[10px]">
            Shop Now
          </span>
          <span>
            <img
              src="/ArrowRightWhite.svg"
              alt=""
              className="scale-[85%] 750:scale-[95%]"
            />
          </span>
        </button>
      </div>
      <div className="flex items-center ">
        <img src={img} alt="" className="" />
      </div>
    </div>
  );
};

export default HeroCarouselCard;
