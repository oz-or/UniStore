const ProductImages = ({ img }: { img: string }) => {
  return (
    <div className="flex flex-col items-center gap-y-4 750:flex-row-reverse 750:gap-x-6 750:w-[628px]">
      <div className="bg-secondary rounded 750:h-[500px] 1024:h-[585px] flex items-center 1200:w-full justify-center">
        <img src={img} alt="" className="scale-75 750:scale-[85%]" />
      </div>
      <div className="flex gap-x-4 750:flex-col 750:gap-y-4 750:h-[500px] 1024:h-[585px]">
        <div className="bg-secondary rounded p-3 750:h-[113px] 750:w-[150px] 1024:h-full flex items-center justify-center ">
          <img
            src={img}
            alt=""
            className="rotation-first-img 500:scale-[80%]"
          />
        </div>
        <div className="bg-secondary rounded p-3 750:h-[113px] 750:w-[150px] 1024:h-full flex items-center justify-center">
          <img
            src={img}
            alt=""
            className="rotation-second-img 500:scale-[80%]"
          />
        </div>
        <div className="bg-secondary rounded p-3 750:h-[113px] 750:w-[150px] 1024:h-full flex items-center justify-center">
          <img
            src={img}
            alt=""
            className="rotation-third-img 500:scale-[80%]"
          />
        </div>
        <div className="bg-secondary rounded p-3 750:h-[113px] 750:w-[150px] 1024:h-full flex items-center justify-center">
          <img
            src={img}
            alt=""
            className="rotation-fourth-img 500:scale-[80%]"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
