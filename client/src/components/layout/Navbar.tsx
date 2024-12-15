import { NavLink } from "react-router-dom";
import { HiChartBar, HiHome } from "react-icons/hi";
import { HiMiniPlusCircle } from "react-icons/hi2";

const Navbar = () => {
  return (
    <>
      {/* Mobile Navbar */}
      <div className="flex md:hidden btm-nav btm-nav-lg z-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active border-primary text-primary " : "nav-item"
          }
        >
          <HiHome size={32} />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? "active border-primary text-primary" : "nav-item"
          }
        >
          <HiMiniPlusCircle size={32} />
          <span className="text-xs">Workout</span>
        </NavLink>
        <NavLink
          to="/activity"
          className={({ isActive }) =>
            isActive ? "active border-primary text-primary" : "nav-item"
          }
        >
          <HiChartBar size={32} />
          <span className="text-xs">Activity</span>
        </NavLink>
      </div>
      {/* Desktop Navbar */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 md:flex hidden z-10 shadow-xl">
        <ul className="menu menu-lg menu-horizontal bg-base-200 rounded-box mt-6">
          <li className="active">
            <NavLink to="/" className="tooltip" data-tip="Home">
              <HiHome size={28} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" className="tooltip" data-tip="Add Workout">
              <HiMiniPlusCircle size={28} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/activity" className="tooltip" data-tip="Activity">
              <HiChartBar size={28} />
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
