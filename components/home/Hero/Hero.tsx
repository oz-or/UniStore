"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";

import HeroNav from "./HeroNav";

const Hero = () => {
  const isMoreThan1024 = useMediaQuery("(min-width: 1024px)");
  return (
    <section id="Hero" className="1440:flex 1440:justify-center">
      <div className="1024:flex 1440:w-[1440px]">
        {isMoreThan1024 && <HeroNav />}

        <div className="p-2 flex justify-center 750:py-6 1024:px-7 1024:py-6 1200:w-full ">
          <img src="/home/hero/Carousel-3.svg" alt="" />
          {/* TODO: Make the carousel actually work(this is just the boilerplate of the shadcn component), for this, I'll need 4 more images instead of the placeholders*/}
          {/* <Carousel>
            <CarouselContent>
              <CarouselItem>
                <img src="/home/hero/Carousel-3.svg" alt="" />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://picsum.photos/800/300?random=1"
                  alt="Image 1"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://picsum.photos/800/300?random=2"
                  alt="Image 2"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://picsum.photos/800/300?random=3"
                  alt="Image 3"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://picsum.photos/800/400?random=4"
                  alt="Image 4"
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
