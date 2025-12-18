import { useSelector, useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

import { onLogout } from "../../reducers/authSlice";

export default function ProfileOverlay({ onCloseOverlay }) {
  const { email } = useSelector((state) => state.auth.loggedUser);
  const dispatch = useDispatch();

  return (
    <div
      className="fixed inset-0 z-40 bg-black/50"
      onClick={() => onCloseOverlay()}
    >
      <div className="absolute right-6 top-14 min-w-72 rounded-xl bg-blue-50 py-8 px-6 flex flex-col gap-4 items-center justify-around">
        <div className="border-2 rounded-full text-blue-500 border-blue-500">
          <CgProfile className="size-8" />
        </div>
        <div className="text-center">
          <h1 className="text-xl">User Name</h1>
          <h1 className="text-sm font-semibold text-gray-600">{email}</h1>
        </div>
        <div>
          <button
            className="flex items-center border gap-1 bg-white rounded-3xl p-3 hover:bg-gray-200 transition-colors focus:outline-gray-200"
            onClick={() => dispatch(onLogout())}
          >
            <FiLogOut className="size-6" />
            <span className="text-sm">Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
