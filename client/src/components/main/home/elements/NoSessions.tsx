import { NavLink } from "react-router-dom";

const NoSessions = () => {
  return (
    <div className="hero bg-base-200 min-h-20 rounded-lg p-6">
      <div className="hero-content text-center flex flex-col items-center justify-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-semibold mb-4">No workout data!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Start by creating your first workout session!
          </p>
          <NavLink
            to="/add"
            className="btn btn-primary px-6 py-2 text-lg rounded-md shadow-md transition-all hover:bg-primary-focus"
          >
            Start Workout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NoSessions;
