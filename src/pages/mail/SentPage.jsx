import { useSelector } from "react-redux";

import EmptyTab from "../../components/ui/EmptyTab";
import MailList from "../../components/mail/MailList";

export default function SentPage() {
  const sentMails = useSelector((state) => state.email.sentMails);

  let content = <EmptyTab tab="Sent" />;
  if (sentMails.length > 0) {
    content = (
      <ul>
        {sentMails.map((m) => {
          return <MailList key={m.id} id={m.id} mail={m.mail} label="To:" />;
        })}
      </ul>
    );
  }

  return (
    <div className="w-11/12 m-auto rounded overflow-hidden sm:w-auto sm:mx-2">
      {content}
    </div>
  );
}
