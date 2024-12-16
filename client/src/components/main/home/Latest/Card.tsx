interface CardProps {
  date: string;
  totalWorkouts: number;
  totalWeight: number;
  creator: string;
}

const Card = ({ date, totalWorkouts, totalWeight, creator }: CardProps) => {
  return (
    <div className="bg-base-300 rounded-xl h-44 w-full lg:w-[475px] shadow-xl z-0 flex flex-col overflow-hidden relative">
      <div className="flex-initial h-16 bg-base-300 z-2 flex items-center px-5 justify-between">
        <span className="font-xs">{date}</span>
        <span className="text-primary">@{creator}</span>
      </div>
      <div className="flex-1 overflow-hidden z-1 relative flex items-center">
        <img
          src="/fitness1.jpg"
          alt=""
          className="w-full absolute opacity-20"
        />
        <div className="m-5 flex flex-col gap-5">
          <div>
            <span className="text-primary">{totalWorkouts} Workouts</span>
          </div>
          <div>
            <span className="font-bold">Total Weight: {totalWeight} kg</span>
          </div>
        </div>
      </div>
      <img
        src="/logo-ss.png"
        alt=""
        className="h-1/4 w-auto absolute right-3 bottom-3 opacity-70"
      />
    </div>
  );
};

export default Card;
