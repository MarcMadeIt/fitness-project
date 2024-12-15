import { IoIosFitness } from "react-icons/io";
import { RiWeightFill } from "react-icons/ri";
import { totalAmount } from "../../../store/workout/workoutSlice";
import { useSelector } from "react-redux";

const AddOverview = () => {
  const { totalWeight, totalSets } = useSelector(totalAmount);
  return (
    <div className="bg-base-300 flex flex-row lg:flex-col justify-between lg:justify-start gap-3 p-5 rounded-2xl ">
      <h3 className="text-primary">Overview</h3>
      <hr className="h-0 w-full border-1 border-slate-600 hidden lg:block" />
      <div className="flex flex-row lg:flex-col gap-3">
        <h5 className="text-sm flex items-center gap-2">
          <IoIosFitness size={24} /> {totalSets}
        </h5>
        <h5 className="text-xs flex items-center gap-2">
          <RiWeightFill size={20} /> {totalWeight}kg
        </h5>
      </div>
    </div>
  );
};

export default AddOverview;
