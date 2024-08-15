import { Categories } from "@/data";

const CategoryItems = () => {
  return (
    <>
      <div className="grid grid-cols-2 750:grid-cols-3 1024:grid-cols-4 1200:grid-cols-6 ">
        {Categories.map(({ img, name }, i) => (
          <div key={i} className="scale-90 flex flex-col gap-y-4">
            <div className="flex flex-col relative bg-secondary items-center ">
              <img
                className={`scale-[60%] h-[180px]  ${
                  name === "Camera" && "scale-[85%]"
                }`}
                src={img}
                alt=""
              />
              <div className="flex flex-col 500:gap-y-1 mt-[-30px] pb-3">
                <span className="font-medium text-base 500:text-[18px]">
                  {name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryItems;
