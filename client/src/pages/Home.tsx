import { useSelector } from "react-redux";
import Hero from "../components/main/home/Hero";
import Progress from "../components/main/home/Progress";
import { RootState } from "../store/store";

const Home = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center">
      {!isAuthenticated && (
        <div>
          <Hero />
        </div>
      )}
      {isAuthenticated && <Progress />}
    </div>
  );
};

export default Home;
