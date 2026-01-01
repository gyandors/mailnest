import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { MdAccountCircle } from "react-icons/md";

import { dbUrl } from "../../utils/constants";
import MailBodyHeader from "../../components/mail/MailBodyHeader";
import { toggleMailsLoading } from "../../reducers/uiSlice";
import MailsLoader from "../../components/ui/MailsLoader";
import MailNotFound from "../error/MailNotFound";

export default function MailBodyPage() {
  const { mailId } = useParams();

  const [mail, setMail] = useState({});

  const { email } = useSelector((state) => state.auth.loggedUser);
  const { mailsLoading } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMail() {
      dispatch(toggleMailsLoading(true));

      try {
        const response = await fetch(
          `${dbUrl}/${email.replace(".", "")}/${mailId}.json`
        );

        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        setMail(data);
      } catch (error) {
        toast.error(error.message);
      }

      dispatch(toggleMailsLoading(false));
    }

    fetchMail();
  }, [dispatch, email, mailId]);

  return (
    <div className="sm:py-2 sm:mx-2">
      {mailsLoading ? (
        <MailsLoader />
      ) : mail ? (
        <>
          <MailBodyHeader id={mailId} mail={mail} setMail={setMail} />
          <section className="p-1">
            <div className="mb-5 mt-2">
              <h1 className="sm:text-xl text-lg font-medium bg-blue-50 p-2 mb-2 rounded-md">
                {mail.subject}
              </h1>
              <div className="flex gap-2">
                <div className="size-12 rounded-full shrink-0">
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
                <div>
                  <b>
                    {mail.type === "received"
                      ? mail.fromName
                        ? mail.fromName
                        : mail.from
                      : mail.to}
                  </b>
                  <span className="block text-sm text-slate-700">
                    {mail.type === "received"
                      ? `From: ${mail.from}`
                      : `To: ${mail.to}`}
                  </span>
                </div>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: mail.content }}></div>
          </section>
        </>
      ) : (
        <MailNotFound />
      )}
    </div>
  );
}
