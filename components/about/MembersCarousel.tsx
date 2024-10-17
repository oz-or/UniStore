"use client";

import MemberCard from "./MemberCard";
import { useCallback, useEffect, useState } from "react";
import { getMembers } from "@/utils/apiMembers";

import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./CarouselDotButton";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";
import { NextButton, PrevButton } from "./MembersCarouselButtons";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const MembersCarousel = () => {
  const [members, setMembers] = useState<MembersType[]>([]);

  const [clickedBtn, setClickedBtn] = useState("");

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

  //Carousel previous and next buttons
  const scrollPrev = useCallback(() => {
    setClickedBtn("Prev");
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    setClickedBtn("Next");
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  //Getting the data for the carousel (the members from the DB) and reinitializing the carousel after it's done (the carousel would break without the reinitialization)
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

        <PrevButton onClick={scrollPrev} clickedBtn={clickedBtn}></PrevButton>
        <NextButton onClick={scrollNext} clickedBtn={clickedBtn}></NextButton>

        <div className=" hidden 1200:grid 1200:justify-center 1200:mt-[1.8rem]">
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
