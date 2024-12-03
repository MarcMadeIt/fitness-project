import { GiStrong } from "react-icons/gi";

const Progress = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 gap-3">
      <div
        className="radial-progress text-primary bg-base-200 border-4 border-base-200"
        style={
          {
            ["--value" as any]: 70,
            "--size": "7rem",
            "--thickness": "12px",
          } as React.CSSProperties
        }
        role="progressbar"
      >
        <GiStrong size={35} />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-3xl font-extrabold">3</span>
        <span className="text-md font-normal">Sessions</span>
      </div>
    </div>
  );
};

export default Progress;
