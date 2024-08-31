"use client";

import MemberCard from "./MemberCard";
import { useCallback, useEffect, useState } from "react";
import { getMembers } from "@/services/apiMembers";

import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./CarouselDotButton";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";
import { NextButton, PrevButton } from "./MembersCarouselButtons";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const MembersCarousel = () => {
  const [members, setMembers] = useState<MembersType[]>([]);

  const isMoreThan750 = useMediaQuery("(min-width: 750px)");
  const isMoreThan1200 = useMediaQuery("(min-width: 1200px)");
  const isMoreThan1440 = useMediaQuery("(min-width: 1440px)");

  //This logic determines that how many slides do the carousel scroll at once at each screen size
  let numSlidesToScroll = 1;
  if (isMoreThan750) {
    numSlidesToScroll = 2;
    if (isMoreThan1200) {
      numSlidesToScroll = 3;
      if (isMoreThan1440) {
        numSlidesToScroll = 4;
      }
    }
  }

  //for the carousel
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      duration: isMoreThan1200 ? 100 : 60,
      slidesToScroll: numSlidesToScroll,
    },
    [Autoplay({ delay: 20000 })]
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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    getMembers().then((data) => {
      data !== null && setMembers(data);
    });

    emblaApi?.reInit({ slidesToScroll: numSlidesToScroll });
  }, [emblaApi, numSlidesToScroll]);

  return (
    <div className="flex justify-center ">
      <div
        className="embla w-[368px] 750:w-full 1440:w-[1440px]"
        ref={emblaRef}
      >
        <div className="embla__container ">
          {members.map(
            ({ name, position, img, twitter, instagram, linkedIn }, i) => (
              <MemberCard
                key={i}
                name={name}
                position={position}
                img={img}
                twitter={twitter}
                instagram={instagram}
                linkedIn={linkedIn}
              />
            )
          )}
        </div>

        <PrevButton onClick={scrollPrev}></PrevButton>
        <NextButton onClick={scrollNext}></NextButton>

        <div className="embla__controls ">
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersCarousel;
