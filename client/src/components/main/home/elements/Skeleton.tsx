const Skeleton = () => {
  return (
    <div className=" flex flex-col md:flex-row flex-wrap gap-6 justify-evenly">
      <div className="flex w-full lg:w-[475px] flex-col gap-4">
        <div className="skeleton h-44 w-full"></div>
      </div>
      <div className="flex w-full lg:w-[475px] flex-col gap-4">
        <div className="skeleton h-44 w-full"></div>
      </div>
      <div className="flex w-full lg:w-[475px] flex-col gap-4">
        <div className="skeleton h-44 w-full"></div>
      </div>
      <div className="flex w-full lg:w-[475px] flex-col gap-4">
        <div className="skeleton h-44 w-full"></div>
      </div>
    </div>
  );
};

export default Skeleton;
