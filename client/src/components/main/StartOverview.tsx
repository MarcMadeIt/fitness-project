import { IoIosFitness } from "react-icons/io";
import { RiWeightFill } from "react-icons/ri";

const StartOverview = () => {
  return (
    <div className="bg-base-200 flex flex-row md:flex-col justify-between md:justify-start gap-3 p-5 rounded-2xl ">
      <h3 className="text-primary">Workout Total</h3>
      <hr className="h-0 w-full border-1 border-slate-600 hidden md:block" />
      <div className="flex flex-row md:flex-col gap-3">
        <h5 className="text-sm flex items-center gap-2">
          <IoIosFitness size={24} /> 3 Sets
        </h5>
        <h5 className="text-xs flex items-center gap-2">
          <RiWeightFill size={20} /> 300 kg
        </h5>
      </div>
    </div>
  );
};

export default StartOverview;
