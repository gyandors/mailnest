import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { markAsRead } from "../../reducers/emailSlice";

export default function MailList({ id, mail, label }) {
  const { email } = useSelector((state) => state.auth.loggedUser);

  const dispatch = useDispatch();

  async function handleMailClick() {
    if (mail.read === false) {
      const response = await fetch(
        `https://mail-box-c1237-default-rtdb.firebaseio.com/${email.replace(
          ".",
          ""
        )}/receivedMails/${id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({ ...mail, read: true }),
        }
      );
      if (response.ok) {
        dispatch(markAsRead(id));
      }
    }
  }

  return (
    <Link
      className={mail.read === false ? "font-semibold" : "font-normal"}
      to={`${id}`}
      onClick={handleMailClick}
    >
      <li className="px-2 py-3 border-b flex justify-between items-center gap-3 sm:gap-36 hover:bg-blue-50 transition-colors">
        <div className="basis-32 sm:basis-52 overflow-hidden whitespace-nowrap text-ellipsis">
          {mail.read === false && (
            <div className="inline-block mr-2 h-2.5 w-2.5 rounded-full bg-blue-700"></div>
          )}
          <span className="text-slate-500 text-sm">{label}</span>{" "}
          <span>{label === "To:" ? mail.to : mail.from}</span>
        </div>
        <span className="flex-1 text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">
          {mail.subject}
        </span>
      </li>
    </Link>
  );
}
