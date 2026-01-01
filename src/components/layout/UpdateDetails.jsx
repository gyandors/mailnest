import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { apiKey, apiUrl } from "../../utils/constants";
import { updateUser } from "../../reducers/authSlice";
import Spinner from "../ui/Spinner";
import { toggleSpinner } from "../../reducers/uiSlice";

export default function UpdateDetails({
  idToken,
  name,
  photoUrl,
  setEditingDetails,
}) {
  const dispatch = useDispatch();

  const spinner = useSelector((state) => state.ui.spinner);

  const [formData, setFormData] = useState({
    displayName: name || "",
    photoUrl: photoUrl || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(toggleSpinner(true));
    try {
      const response = await fetch(`${apiUrl}update?key=${apiKey}`, {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          ...formData,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      dispatch(updateUser({ name: data.displayName, photoUrl: data.photoUrl }));
      toast.success("Details updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(toggleSpinner(false));
    setEditingDetails(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <form onSubmit={handleSubmit}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg flex flex-col gap-4 shadow-lg">
          <h2 className="text-lg font-semibold">Update Details</h2>
          <input
            className="border px-4 py-2 rounded w-64 focus:outline-blue-500"
            type="text"
            placeholder="Enter new name"
            value={formData.displayName}
            onChange={(e) =>
              setFormData({ ...formData, displayName: e.target.value })
            }
          />
          <input
            className="border px-4 py-2 rounded w-64 focus:outline-blue-500"
            type="url"
            placeholder="Enter new photo URL"
            value={formData.photoUrl}
            onChange={(e) =>
              setFormData({ ...formData, photoUrl: e.target.value })
            }
          />

          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
              type="button"
              onClick={() => setEditingDetails(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={spinner}
            >
              {spinner ? <Spinner /> : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
