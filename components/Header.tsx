const Header = ({
  text,
  title,
  children,
  className,
}: {
  text: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-y-2 pb-3">
      <div className="flex gap-x-2 items-center px-4 pt-5 1024:pt-16 1024:px-5">
        <span className="bg-secondary-2 w-3 h-6 block rounded" />
        <h2 className="text-secondary-2 font-semibold 750:text-base">{text}</h2>
      </div>
      <div
        className={`flex gap-x-6 items-center px-4 750:gap-x-28 1024:px-5 1024:pb-4 ${className}`}
      >
        <h1 className="text-xl font-medium 500:text-2xl 1024:text-4xl">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Header;
