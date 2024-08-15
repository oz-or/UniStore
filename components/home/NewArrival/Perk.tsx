const Perk = ({
  iconLink,
  title,
  desc,
  className,
}: {
  iconLink: string;
  title: string;
  desc: string;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col items-center gap-y-6 ${className}`}>
      <div className="bg-black rounded-full p-2 shadow-[0px_0px_0px_10px_rgba(46,48,47,0.3)] border-t-primary-1 ">
        <img src={iconLink} alt="" className="w-[32px] h-auto" />
      </div>
      <div className="flex flex-col items-center 500:gap-y-1.5 ">
        <h3 className="uppercase font-semibold text-base 500:text-[20px]">
          {title}
        </h3>
        <p className="text-sm">{desc}</p>
      </div>
    </div>
  );
};

export default Perk;
