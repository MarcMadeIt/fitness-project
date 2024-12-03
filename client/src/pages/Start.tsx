import StartSession from "../components/main/StartSession";
import StartOverview from "../components/main/StartOverview";

const Start = () => {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-5">
      <div className="flex-1">
        <StartOverview />
      </div>
      <div className="flex-3">
        <StartSession />
      </div>
    </div>
  );
};

export default Start;
