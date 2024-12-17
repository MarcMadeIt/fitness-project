import { useState } from "react";
import RouteModal from "../../auth/RouteModal";

const Hero = () => {
  const [getStarted, setGetStarted] = useState(false);

  const handleBtn = () => {
    setGetStarted((prevState) => !prevState);
  };
  return (
    <>
      <div className="hero bg-base-200  rounded-xl ">
        <div className="hero-content text-center lg:gap-16  px-4 py-6 flex-col md:flex-row ">
          <div className="relative">
            <img
              src="/fitness1.jpg"
              className="sm:max-w-xs lg:max-w-lg  rounded-lg shadow-2xl opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base-300 opacity-90 rounded-lg"></div>
          </div>
          <div className="max-w-md">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              Welcome to StayStrong
            </h1>
            <div className="py-6 flex flex-col gap-2">
              <p className="text-md md:text-md">
                Track your workout, a simple way!
              </p>
            </div>
            <button className="btn btn-primary" onClick={handleBtn}>
              Get Started
            </button>
          </div>
        </div>
      </div>
      {getStarted && <RouteModal defaultOpen="register" />}
    </>
  );
};

export default Hero;
