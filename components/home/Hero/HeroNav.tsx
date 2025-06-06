import Link from "next/link";
import { heroNavLinks } from "@/data";

const slugify = (str: string) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const HeroNav = () => (
  <div className="flex justify-center 1200:w-[30%]">
    <div className="flex flex-col min-w-[250px] text-base px-7 py-5 gap-y-3 border-r 1200:pr-10 1440:ml-10 1440:pt-7 1200:gap-y-4">
      {heroNavLinks.map(({ text }, i) => (
        <Link
          key={i}
          href={`/category/${slugify(text)}`}
          className="py-2 px-3 rounded transition hover:bg-secondary-2 hover:text-white"
        >
          {text}
        </Link>
      ))}
    </div>
  </div>
);

export default HeroNav;
