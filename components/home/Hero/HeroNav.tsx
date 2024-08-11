import { heroNavLinks } from "@/data";
import HeroNavLink from "./HeroNavLink";

const HeroNav = () => {
  return (
    <div className="flex justify-center 1200:w-[30%]">
      <div className="flex flex-col min-w-[250px] text-base px-7 py-5 gap-y-3 border-r 1200:pr-10 1440:ml-10 1440:pt-7 1200:gap-y-4">
        {heroNavLinks.map(({ href, text }, i) => (
          <HeroNavLink
            key={i}
            href={href}
            className="flex justify-between items-center 1200:gap-x-10"
            text={text}
          >
            {i <= 1 && (
              <div className="rotate-[270deg]">
                <img src="/DropDownBlack.svg" alt="" />
              </div>
            )}
          </HeroNavLink>
        ))}
      </div>
    </div>
  );
};

export default HeroNav;
