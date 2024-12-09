import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/auth/authSlice";
import { NavLink } from "react-router-dom";
import AuthModal from "../auth/AuthModal";
import { HiDotsHorizontal } from "react-icons/hi";
import Cookies from "js-cookie";

const Topbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    // Clear cookies directly on logout
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("username");
    dispatch(logout());
  };

  return (
    <div className="navbar bg-base-100 flex justify-between pr-5 pl-1 pt-4">
      <div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          <img src="/favicon-ss.png" alt="Logo" /> StayStrong
        </NavLink>
      </div>

      {isAuthenticated && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1 p-2">
            <HiDotsHorizontal size={28} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 ring-1 ring-base-300 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <span></span>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={handleLogout}>Log out</button>
            </li>
          </ul>
        </div>
      )}

      {!isAuthenticated && (
        <div>
          <AuthModal />
        </div>
      )}
    </div>
  );
};

export default Topbar;
