import { useParams, useNavigate, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBack, IoMailUnread } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import {
  deleteReceivedMails,
  deleteSentMails,
  markAsUnread,
} from "../../reducers/emailSlice";

export default function MailBodyPage() {
  const { mailId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const sentMails = useSelector((state) => state.email.sentMails);
  const receivedMails = useSelector((state) => state.email.receivedMails);
  const { email } = useSelector((state) => state.auth.loggedUser);

  const allMails = [...sentMails, ...receivedMails];
  const selectedMail = allMails.find((m) => m.id === mailId);

  if (!selectedMail) {
    return;
  }

  async function handleDeleteMail() {
    if (location.pathname.includes("inbox")) {
      const response = await fetch(
        `https://mail-box-c1237-default-rtdb.firebaseio.com/${email.replace(
          ".",
          ""
        )}/receivedMails/${mailId}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        dispatch(deleteReceivedMails(mailId));
        navigate("/mail/inbox");
      }
    }

    if (location.pathname.includes("sent")) {
      const response = await fetch(
        `https://mail-box-c1237-default-rtdb.firebaseio.com/${email.replace(
          ".",
          ""
        )}/sentMails/${mailId}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        dispatch(deleteSentMails(mailId));
        navigate("/mail/sent");
      }
    }
  }

  async function handleMarkAsUnread() {
    if (selectedMail.mail.read === true) {
      const response = await fetch(
        `https://mail-box-c1237-default-rtdb.firebaseio.com/${email.replace(
          ".",
          ""
        )}/receivedMails/${mailId}.json`,
        {
          method: "PUT",
          body: JSON.stringify({ ...selectedMail.mail, read: false }),
        }
      );
      if (response.ok) {
        dispatch(markAsUnread(mailId));
      }
    }
  }

  return (
    <div className="rounded overflow-hidden sm:w-auto sm:mx-2">
      <header className="p-1 border-b flex justify-between items-center">
        <button
          className="rounded-full p-2 hover:bg-gray-100 active:bg-gray-200 duration-300"
          title="Back"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack className="size-6" />
        </button>
        <div className="flex items-center">
          {location.pathname.includes("inbox") && (
            <button
              className="rounded-full p-2 hover:bg-gray-100 active:bg-gray-200 duration-300"
              title="Mark as unread"
              onClick={handleMarkAsUnread}
            >
              <IoMailUnread className="size-6" />
            </button>
          )}
          <button
            className="rounded-full p-3 hover:bg-gray-100 active:bg-gray-200 duration-300"
            title="Delete"
            onClick={handleDeleteMail}
          >
            <MdDelete className="size-6" />
          </button>
        </div>
      </header>
      <section className="p-3">
        <div className="mb-5 mt-2">
          <h1 className="text-xl font-medium">{selectedMail.mail.subject}</h1>
          <p className="text-sm text-slate-700">
            {location.pathname.includes("inbox")
              ? `<${selectedMail.mail.from}>`
              : `<${selectedMail.mail.to}>`}
          </p>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: selectedMail.mail.content }}
        ></div>
      </section>
    </div>
  );
}
