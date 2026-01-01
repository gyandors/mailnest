import { useSelector } from "react-redux";

import MailListCard from "../../components/mail/MailListCard";

export default function SentPage() {
  const { sentMails } = useSelector((state) => state.email);

  return <MailListCard mails={sentMails} tab="Sent" />;
}
