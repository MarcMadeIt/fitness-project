import { useSelector } from "react-redux";
import Hero from "../components/main/home/Hero";
import Progress from "../components/main/home/Progress";
import { RootState } from "../store/store";
import Cards from "../components/main/home/Latest/Cards";

const Home = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center">
      {!isAuthenticated && (
        <>
          <Hero />
        </>
      )}
      {isAuthenticated && (
        <div className="flex flex-col gap-10 w-full mt-5">
          <Progress />
          <Cards />
        </div>
      )}
    </div>
  );
};

export default Home;
