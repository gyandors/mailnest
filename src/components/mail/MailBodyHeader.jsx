import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBack, IoMailUnread, IoStar } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import {
  deleteMail,
  markAsUnread,
  toggleStarMail,
} from "../../reducers/emailSlice";
import { dbUrl } from "../../utils/constants";

export default function MailBodyHeader({ id, mail, setMail }) {
  const { email } = useSelector((state) => state.auth.loggedUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleMarkAsUnread() {
    if (mail.read === true) {
      const response = await fetch(
        `${dbUrl}/${email.replace(".", "")}/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ read: false }),
        }
      );
      if (response.ok) {
        dispatch(markAsUnread(id));
        navigate(-1);
      }
    }
  }

  async function handleDeleteMail() {
    const response = await fetch(
      `${dbUrl}/${email.replace(".", "")}/${id}.json`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      dispatch(deleteMail({ id: id, type: mail.type }));
      navigate(-1);
    }
  }

  async function handleStarMail() {
    const response = await fetch(
      `${dbUrl}/${email.replace(".", "")}/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ stared: !mail.stared }),
      }
    );
    if (response.ok) {
      dispatch(
        toggleStarMail({ id: id, mail: { ...mail, stared: !mail.stared } })
      );
      setMail({ ...mail, stared: !mail.stared });
      if (location.pathname.includes("stared")) navigate(-1);
    }
  }

  return (
    <header className="p-1 border-b flex justify-between items-center">
      <button
        className="rounded-full p-1 sm:p-3 hover:bg-gray-100 active:bg-gray-200 duration-300"
        title="Back"
        onClick={() => navigate(-1)}
      >
        <IoArrowBack className="size-6" />
      </button>
      <div className="flex items-center gap-2 sm:gap-0">
        <button
          className="rounded-full p-1 sm:p-3 hover:bg-gray-100 active:bg-gray-200 duration-300"
          title="Star/Unstar"
          onClick={handleStarMail}
        >
          <IoStar
            className={`size-5 ${mail.stared ? "text-yellow-500" : ""}`}
          />
        </button>
        {mail.type === "received" && (
          <button
            className="rounded-full p-1 sm:p-3 hover:bg-gray-100 active:bg-gray-200 duration-300"
            title="Mark as unread"
            onClick={handleMarkAsUnread}
          >
            <IoMailUnread className="size-6" />
          </button>
        )}
        <button
          className="rounded-full p-1 sm:p-3 hover:bg-gray-100 active:bg-gray-200 duration-300"
          title="Delete"
          onClick={handleDeleteMail}
        >
          <MdDelete className="size-6" />
        </button>
      </div>
    </header>
  );
}
