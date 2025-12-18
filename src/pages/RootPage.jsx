import { useState } from "react";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { MdOutlineCreate } from "react-icons/md";

import { useFetch } from "../hooks/useFetch";
import Header from "../components/Layout/Header";
import ComposeMail from "../components/mail/ComposeMail";

export default function RootPage() {
  const { email } = useSelector((state) => state.auth.loggedUser);

  const [showComposeMail, setShowComposeMail] = useState(false);

  useFetch(
    `https://mail-box-c1237-default-rtdb.firebaseio.com/${email.replace(
      ".",
      ""
    )}/receivedMails.json`
  );

  useFetch(
    `https://mail-box-c1237-default-rtdb.firebaseio.com/${email.replace(
      ".",
      ""
    )}/sentMails.json`
  );

  return (
    <main className="bg-blue-50/50 h-screen flex flex-col overflow-hidden">
      <Header />
      <section className="sm:m-4 sm:mt-0 p-2 sm:ml-64 bg-white sm:rounded-3xl flex-1 overflow-y-auto">
        <Outlet />
      </section>
      <button
        className="border rounded-full p-4 fixed bottom-12 right-12 bg-blue-400 text-white hover:bg-blue-500 transition-colors"
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
