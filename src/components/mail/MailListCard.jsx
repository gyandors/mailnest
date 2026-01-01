import { useSelector } from "react-redux";

import MailsLoader from "../ui/MailsLoader";
import MailList from "./MailList";
import EmptyTab from "../ui/EmptyTab";

export default function MailListCard({ mails, tab = "" }) {
  const { mailsLoading } = useSelector((state) => state.ui);

  return (
    <div className="rounded overflow-hidden sm:w-auto sm:mx-2 sm:py-2">
      {mailsLoading ? (
        <MailsLoader />
      ) : mails.length > 0 ? (
        <ul className="divide-y-2 last:border-b-2">
          {mails.map((m) => (
            <MailList key={m.id} id={m.id} mail={m.mail} />
          ))}
        </ul>
      ) : (
        <EmptyTab tab={tab} />
      )}
    </div>
  );
}
