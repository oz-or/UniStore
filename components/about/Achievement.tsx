const Achievement = ({
  i,
  icon,
  stat,
  desc,
}: {
  i: number;
  icon: string;
  stat: string;
  desc: string;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-[200px] w-[250px]  500:w-full 750:max-w-[250px] text-center border border-black border-opacity-30 rounded ${
        i === 1 ? "bg-secondary-2 text-primary-1 gap-y-4 " : "gap-y-6"
      } `}
    >
      <div
        className={`rounded-full p-2 ${
          i === 1
            ? "bg-primary-1 border-[10px] border-opacity-80 border-secondary-2 500:translate-y-[-7px]"
            : "bg-black shadow-[0px_0px_0px_10px_rgba(46,48,47,0.3)]"
        }`}
      >
        <img src={icon} alt="" className="w-[32px] h-auto" />
      </div>
      <div
        className={`flex flex-col items-center 500:gap-y-1.5 ${
          i === 1 && "translate-y-[-8px]"
        }`}
      >
        <h3 className="uppercase font-bold text-xl 500:text-[20px]">{stat}</h3>
        <p className="text-sm">{desc}</p>
      </div>
    </div>
  );
};

export default Achievement;
