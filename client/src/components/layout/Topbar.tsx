import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/auth/authSlice";
import { NavLink } from "react-router-dom";
import AuthModal from "../auth/AuthModal";
import Cookies from "js-cookie";
import { HiMiniUser } from "react-icons/hi2";

const Topbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const username = useSelector((state: RootState) => state.auth.user?.username);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("username");
    dispatch(logout());
  };

  return (
    <div className="navbar bg-base-100 flex justify-between p-5 pt-4">
      <div>
        <NavLink to="/" className="flex items-center gap-1 text-xl">
          <img src="/favicon-ss.png" alt="Logo" /> StayStrong
        </NavLink>
      </div>

      {isAuthenticated && (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="m-1 p-[6px] bg-base-300 rounded-full"
          >
            <HiMiniUser size={26} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 ring-1 ring-base-300 rounded-box z-[5] w-52 p-4 shadow"
          >
            <div className="px-4 py-2 flex gap-2 text-primary">
              <span>@{username}</span>
            </div>
            <li>
              <span>Settings</span>
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
