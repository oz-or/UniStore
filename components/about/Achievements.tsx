import { achievements } from "@/data";
import Achievement from "./Achievement";

const Achievements = () => {
  return (
    <div className="grid grid-cols-1 500:grid-cols-2 500:gap-x-6 500:px-4 750:grid-cols-4 gap-y-6 my-32 750:gap-x-4 ">
      {achievements.map(({ icon, stat, desc }, i) => (
        <div key={i} className="flex flex-col  justify-center items-center">
          <Achievement i={i} icon={icon} stat={stat} desc={desc} />
        </div>
      ))}
    </div>
  );
};

export default Achievements;
