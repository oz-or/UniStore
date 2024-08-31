const MemberCard = ({
  name,
  position,
  img,
  twitter,
  instagram,
  linkedIn,
}: MembersType) => {
  return (
    <div className="embla__slide 750:[flex:_0_0_50%] 1200:[flex:_0_0_33.33%] 1440:[flex:_0_0_360px]">
      <div className="flex flex-col items-center gap-y-4 ">
        <div className="w-[330px] h-[410px] 1440:w-[320px] bg-secondary flex justify-center items-end mx-12 ">
          <img
            src={img}
            alt={`An image of ${name}`}
            className="px-2 object-contain"
          />
        </div>
        <div className="flex flex-col gap-y-1 items-center 1440:items-start 1440:self-start 1440:ml-5">
          <h3 className="text-[28px] font-medium">{name}</h3>
          <p className=" translate-y-[-8px] ">{position}</p>
          <div>
            <div className="flex gap-x-3">
              <div className="cursor-pointer w-5">
                <img src="/about/TwitterBlack.svg" alt={twitter} />
              </div>
              <div className="cursor-pointer w-5">
                <img src="/about/InstagramBlack.svg" alt={instagram} />
              </div>
              <div className="cursor-pointer w-5">
                <img src="/about/LinkedInBlack.svg " alt={linkedIn} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
