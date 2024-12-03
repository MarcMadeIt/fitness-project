import { HiDotsHorizontal } from "react-icons/hi";

const Topbar = () => {
  return (
    <div className="navbar bg-base-100 flex justify-between pr-5 pl-1 pt-4">
      <div className="">
        <a className="btn btn-ghost text-xl">
          <img src="/favicon-ss.png" alt="" /> StayStrong
        </a>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="m-1">
          <HiDotsHorizontal size={30} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 ring-1 ring-base-300 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Log out</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
