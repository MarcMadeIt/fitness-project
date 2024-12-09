import AddOverview from "../components/main/add/AddOverview";
import AddSession from "../components/main/add/AddSession";

const Add = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 md:gap-5">
      <div className="flex-1">
        <AddOverview />
      </div>
      <div className="flex-2">
        <AddSession />
      </div>
    </div>
  );
};

export default Add;
