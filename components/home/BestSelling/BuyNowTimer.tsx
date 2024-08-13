const BuyNowTimer = ({ value, text }: { value: number; text: string }) => {
  return (
    <div className="rounded-full bg-primary-1 w-7 h-7 flex flex-col items-center justify-center  750:w-10 750:h-10">
      <span className="font-semibold text-[10px] 750:text-sm">{value}</span>
      <span className="text-[5px] mt-[-2px] 750:text-[7px]">{text}</span>
    </div>
  );
};

export default BuyNowTimer;
