const Progress = () => {
  return (
    <div>
      <div className="mb-3 text-sm  pl-2">
        <h3>My Progress</h3>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 bg-base-200 w-full rounded-lg py-8">
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
          <span className="text-4xl font-extrabold ">3</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-ms font-semibold text-primary">
            Total Workouts
          </span>
        </div>
      </div>
    </div>
  );
};

export default Progress;
