import { useSelector } from "react-redux";

import MailListCard from "../../components/mail/MailListCard";

export default function InboxPage() {
  const { receivedMails } = useSelector((state) => state.email);

  return <MailListCard mails={receivedMails} tab="Inbox" />;
}
