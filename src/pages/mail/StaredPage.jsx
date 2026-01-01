import { useSelector } from "react-redux";

import MailListCard from "../../components/mail/MailListCard";

export default function StaredPage() {
  const { staredMails } = useSelector((state) => state.email);

  return <MailListCard mails={staredMails} tab="Stared" />;
}
