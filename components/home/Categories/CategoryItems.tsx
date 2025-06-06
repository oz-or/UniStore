import { Categories } from "@/data";

interface Props {
  onCategorySelect: (category: string) => void;
  selectedCategory: string | null;
  hoveredCategory: string | null;
  setHoveredCategory: (category: string | null) => void;
  loading?: boolean;
}

const CategoryItems = ({
  onCategorySelect,
  selectedCategory,
  hoveredCategory,
  setHoveredCategory,
  loading = false,
}: Props) => {
  return (
    <div className="grid grid-cols-2 750:grid-cols-3 1024:grid-cols-4 1200:grid-cols-6">
      {Categories.map(({ img, name }, i) => {
        const isActive = selectedCategory === name || hoveredCategory === name;
        return (
          <div
            key={i}
            className={`scale-90 flex flex-col gap-y-4 cursor-pointer transition-all duration-200 ${
              isActive ? "bg-secondary-2 shadow-lg" : ""
            } rounded-lg ${loading ? "pointer-events-none opacity-60" : ""}`}
            onClick={() => !loading && onCategorySelect(name)}
            onMouseEnter={() => setHoveredCategory(name)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex flex-col relative items-center py-2">
              <img
                className={`scale-[60%] h-[180px] transition-all duration-200 ${
                  name === "Camera" && "scale-[85%]"
                } ${isActive ? "filter brightness-0 invert" : ""}`}
                src={img}
                alt=""
              />
              <div className="flex flex-col 500:gap-y-1 mt-[-30px] pb-3">
                <span
                  className={`font-medium text-base 500:text-[18px] transition-colors duration-200 ${
                    isActive ? "text-white" : "text-black"
                  }`}
                >
                  {name}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryItems;
