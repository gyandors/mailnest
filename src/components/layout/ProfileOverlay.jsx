import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";

import { onLogout } from "../../reducers/authSlice";
import UpdateDetails from "./UpdateDetails";

export default function ProfileOverlay({ onCloseOverlay }) {
  const { loggedUser, idToken } = useSelector((state) => state.auth);
  const { name, email, photoUrl } = loggedUser;

  const dispatch = useDispatch();

  const [editingDetails, setEditingDetails] = useState(false);

  return (
    <>
      {editingDetails && (
        <UpdateDetails
          idToken={idToken}
          name={name}
          photoUrl={photoUrl}
          setEditingDetails={setEditingDetails}
        />
      )}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => onCloseOverlay()}
      >
        <div
          className="absolute right-6 top-14 min-w-72 rounded-xl shadow-md bg-blue-50 py-8 px-6 flex flex-col gap-4 items-center justify-around"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border rounded-full overflow-hidden">
            {photoUrl ? (
              <img className="size-20" src={photoUrl} alt="Profile" />
            ) : (
              <MdAccountCircle className="size-12 text-blue-500" />
            )}
          </div>
          <div className="text-center">
            <h1 className="text-xl">{name || "User Name"}</h1>
            <h2 className="text-sm font-semibold text-gray-600">{email}</h2>
          </div>
          <div className="flex items-center border gap-1 bg-white rounded-3xl overflow-hidden">
            <button
              className="p-3 hover:bg-gray-200 transition-colors focus:outline-gray-200"
              onClick={() => setEditingDetails(true)}
              title="Update details"
            >
              <RiEdit2Fill className="size-6" />
            </button>
            <button
              className="p-3 hover:bg-gray-200 transition-colors focus:outline-gray-200"
              onClick={() => dispatch(onLogout())}
              title="Logout"
            >
              <FiLogOut className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
