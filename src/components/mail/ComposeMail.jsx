import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { LuSend } from "react-icons/lu";

import { addSentMail } from "../../reducers/emailSlice";
import { dbUrl } from "../../utils/constants";
import { toggleSpinner } from "../../reducers/uiSlice";
import Spinner from "../ui/Spinner";

export default function ComposeMail({ setShowComposeMail }) {
  const { email, name, photoUrl } = useSelector(
    (state) => state.auth.loggedUser
  );
  const { spinner } = useSelector((state) => state.ui);

  const [value, setValue] = useState("");

  const toMailRef = useRef();
  const subjectRef = useRef();

  const dispatch = useDispatch();

  function handleSendEmail() {
    const enteredToMail = toMailRef.current.value;
    const enteredSubject = subjectRef.current.value;

    if (!enteredToMail || !enteredSubject || !value) {
      toast.warning("Please fill all the fields!");
      return;
    }

    if (!enteredToMail.includes("@")) {
      toast.warning("Please enter a valid email address!");
      return;
    }

    const mailDetails = {
      from: email,
      fromName: name,
      fromPhoto: photoUrl,
      to: enteredToMail,
      subject: enteredSubject,
      content: value,
      type: "sent",
      stared: false,
      timestamp: new Date().toISOString(),
    };

    async function sendMail() {
      dispatch(toggleSpinner(true));
      try {
        const response = await fetch(
          `${dbUrl}/${email.replace(".", "")}.json`,
          {
            method: "POST",
            body: JSON.stringify(mailDetails),
          }
        );

        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        dispatch(addSentMail({ id: data.name, mail: mailDetails }));

        await fetch(
          `${dbUrl}/${toMailRef.current.value.replace(".", "")}.json`,
          {
            method: "POST",
            body: JSON.stringify({
              ...mailDetails,
              type: "received",
              read: false,
            }),
          }
        );

        setShowComposeMail(false);
        toast.success("Mail sent successfully!");
      } catch (error) {
        toast.error(error.message);
      }
      dispatch(toggleSpinner(false));
    }

    sendMail();
  }

  return (
    <div className="fixed bottom-28 right-2 ml-2 sm:right-12 max-w-md rounded-md overflow-hidden bg-white shadow-xl">
      <div className="px-4 py-2 bg-blue-500 text-white">
        <span>New Message</span>
        <button
          className="float-end hover:text-gray-800 transition-colors"
          onClick={() => setShowComposeMail(false)}
        >
          ✕
        </button>
      </div>
      <div className="p-3 flex flex-col border border-t-0 rounded-b-md">
        <div className="border-b flex p-1 items-center">
          <label
            className="font-semibold text-sm text-slate-600"
            htmlFor="email"
          >
            To:
          </label>
          <input
            className="flex-1 px-2 mx-2 focus:outline-none"
            type="email"
            id="email"
            ref={toMailRef}
          />
          <div className="text-slate-400 text-sm">
            <span className="mr-1">Cc</span>
            <span>Bcc</span>
          </div>
        </div>

        <div className="border-b p-1 flex items-center">
          <label
            className="text-sm font-semibold text-slate-600"
            htmlFor="subject"
          >
            Subject:
          </label>
          <input
            className="flex-1 px-2 mx-2 focus:outline-none"
            type="text"
            id="subject"
            ref={subjectRef}
          />
        </div>
        <ReactQuill
          className="p-1"
          theme="snow"
          value={value}
          onChange={setValue}
        />

        <div className="border-t pt-3">
          <button
            className="rounded-full p-4 float-end font-semibold text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-blue-700 focus:outline-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSendEmail}
            disabled={spinner}
          >
            {!spinner ? <LuSend className="size-5" /> : <Spinner />}
          </button>
        </div>
      </div>
    </div>
  );
}
