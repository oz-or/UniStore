import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "@/components/about/CarouselDotButton";
import { heroCarouselItems } from "@/data";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import HeroCarouselCard from "./HeroCarouselCard";

const HeroCarousel = () => {
  //for the carousel
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      duration: 60,
      slidesToScroll: 1,
    },

    [Autoplay({ delay: 8000 })]
  );

  //needed for the carousel dot button navigation
  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  //carousel dot button navigation
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  return (
    <div className="p-2 flex justify-center 750:py-6 1024:px-7 1024:py-6 1024:w-full ">
      <div
        className="embla bg-black  500:flex 500:flex-col 500:justify-center"
        ref={emblaRef}
      >
        <div className="embla__container bg-black 500:max-w-[600px] 750:max-w-[850px] 1024:max-w-[750px] 1200:max-w-[950px]">
          {heroCarouselItems.map(
            ({ id, img, textFirst, textSecond, link }: HeroCarouselType) => (
              <HeroCarouselCard
                key={id}
                id={id}
                img={img}
                textFirst={textFirst}
                textSecond={textSecond}
                link={link}
              />
            )
          )}
        </div>

        <div className="embla__controls ">
          <div className="embla__dots2 my-3">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot2".concat(
                  index === selectedIndex ? " embla__dot2--selected" : ""
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
