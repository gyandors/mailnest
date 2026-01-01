import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { MdAccountCircle } from "react-icons/md";

import { markAsRead } from "../../reducers/emailSlice";
import { dbUrl } from "../../utils/constants";

export default function MailList({ id, mail }) {
  const { email } = useSelector((state) => state.auth.loggedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleMailClick() {
    if (mail.type === "received" && mail.read === false) {
      const response = await fetch(
        `${dbUrl}/${email.replace(".", "")}/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ read: true }),
        }
      );
      if (response.ok) {
        dispatch(markAsRead(id));
      }
    }
    navigate(id);
  }

  return (
    <li className={mail.read === false ? "font-semibold" : ""}>
      <Link
        className="relative px-2 py-3 grid grid-cols-5 gap-2 items-center hover:bg-blue-50 transition-colors"
        onClick={handleMailClick}
      >
        {mail.read === false && (
          <>
            <span className="absolute top-1 right-1 size-2.5 rounded-full bg-blue-700" />
            <span className="absolute top-1 right-1 size-2.5 rounded-full bg-blue-700 animate-ping" />
          </>
        )}
        <div className="col-span-2 flex items-center gap-2">
          <div className="size-8 rounded-full shrink-0">
            {mail.type === "received" && mail.fromPhoto ? (
              <img
                className="rounded-full size-full"
                src={mail.fromPhoto}
                alt="Profile picture"
              />
            ) : (
              <MdAccountCircle className="size-full text-slate-500 rounded-full border border-slate-600" />
            )}
          </div>
          <span className="text-nowrap overflow-hidden text-ellipsis">
            {mail.type === "received"
              ? mail.fromName
                ? mail.fromName
                : mail.from
              : mail.to}
          </span>
        </div>
        <span className="col-span-2 text-gray-500 text-nowrap overflow-hidden text-ellipsis">
          {mail.subject}
        </span>
        <span className="justify-self-end text-gray-500 text-sm text-nowrap">
          {new Date(mail.timestamp).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </Link>
    </li>
  );
}
