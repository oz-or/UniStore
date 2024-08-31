"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import HeroNav from "./HeroNav";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {
  const isMoreThan1024 = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="Hero" className="1440:flex 1440:justify-center">
      <div className="1024:flex 1440:w-[1440px]">
        {isMoreThan1024 && <HeroNav />}

        <HeroCarousel />
      </div>
    </section>
  );
};

export default Hero;
