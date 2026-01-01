import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { MdOutlineCreate } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/layout/Header";
import ComposeMail from "../components/mail/ComposeMail";
import { dbUrl } from "../utils/constants";
import { setMails } from "../reducers/emailSlice";
import { toast } from "react-toastify";
import { toggleMailsLoading } from "../reducers/uiSlice";

export default function RootPage() {
  const [showComposeMail, setShowComposeMail] = useState(false);
  const { email } = useSelector((state) => state.auth.loggedUser);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMails() {
      dispatch(toggleMailsLoading(true));

      try {
        const response = await fetch(`${dbUrl}/${email.replace(".", "")}.json`);

        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        dispatch(setMails(data));
      } catch (error) {
        toast.error(error.message);
      }

      dispatch(toggleMailsLoading(false));
    }

    fetchMails();
  }, [dispatch, email]);

  return (
    <main className="bg-blue-50/50 h-screen flex flex-col overflow-hidden">
      <Header />
      <section className="sm:m-4 sm:mt-0 p-2 sm:ml-64 bg-white sm:rounded-3xl flex-1 overflow-y-auto">
        <Outlet />
      </section>
      <button
        className="border rounded-full p-4 fixed bottom-12 right-2 sm:right-12 bg-blue-400 text-white hover:bg-blue-500 transition-colors"
        title="Compose"
        onClick={() => setShowComposeMail(!showComposeMail)}
      >
        <MdOutlineCreate className="size-6" />
      </button>

      {showComposeMail && (
        <ComposeMail setShowComposeMail={setShowComposeMail} />
      )}
    </main>
  );
}
