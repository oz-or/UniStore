import Link from "next/link";

const NavigationHeading = ({
  pageName1,
  pageName2,
}: {
  pageName1: string;
  pageName2?: string;
}) => {
  return (
    <div className="pb-14 pt-7 pl-4 500:text-base 1024:py-16 1024:pl-8 1440:pl-0 1440:py-20">
      <Link href="/">
        <span className="opacity-50">Home / </span>{" "}
      </Link>
      <Link href={"/${pageName1}"}>
        <span className={` ${pageName2 ? "opacity-50" : "font-semibold"}`}>
          {pageName1}{" "}
        </span>{" "}
      </Link>
      <span className="font-semibold">{pageName2}</span>
    </div>
  );
};

export default NavigationHeading;
