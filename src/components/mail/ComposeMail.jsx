import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { LuSend } from "react-icons/lu";

import { setSentMails } from "../../reducers/emailSlice";

export default function ComposeMail({ setShowComposeMail }) {
  const { email } = useSelector((state) => state.auth.loggedUser);

  const [isValid, setIsValid] = useState(true);
  const [value, setValue] = useState("");

  const toMailRef = useRef();
  const subjectRef = useRef();

  const dispatch = useDispatch();

  function handleToMailChange() {
    setIsValid(true);
  }

  function handleSendEmail() {
    const enteredToMail = toMailRef.current.value;
    const enteredSubject = subjectRef.current.value;

    if (!enteredToMail || !enteredSubject) {
      setIsValid(false);
      return;
    }
    if (!enteredToMail.includes("@")) {
      setIsValid(false);
      return;
    }
    if (!value) {
      toast.warning("Did you forget to write the content of mail?");
      return;
    }

    const mailDetails = {
      from: email,
      to: enteredToMail,
      subject: enteredSubject,
      content: value,
    };

    async function sendMail() {
      const response = await fetch(
        `https://mail-box-c1237-default-rtdb.firebaseio.com/${email.replace(
          ".",
          ""
        )}/sentMails.json`,
        {
          method: "POST",
          body: JSON.stringify(mailDetails),
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(setSentMails({ id: data.name, mail: mailDetails }));

        await fetch(
          `https://mail-box-c1237-default-rtdb.firebaseio.com/${toMailRef.current.value.replace(
            ".",
            ""
          )}/receivedMails.json`,
          {
            method: "POST",
            body: JSON.stringify({ ...mailDetails, read: false }),
          }
        );
      }
      setShowComposeMail(false);
    }
    sendMail();
  }

  return (
    <div className="fixed bottom-28 right-2 ml-2 sm:right-12 max-w-md rounded-md overflow-hidden bg-white">
      <div className="px-4 py-2 bg-blue-500 text-white">
        <span>New Message</span>
        <button
          className="float-end hover:text-gray-800 transition-colors"
          onClick={() => setShowComposeMail(false)}
        >
          ✕
        </button>
      </div>
      <div className="p-3 flex flex-col border rounded-b">
        <div className="border-b flex p-1 items-center">
          <label
            className="font-semibold text-sm text-slate-600"
            htmlFor="email"
          >
            To:
          </label>
          <input
            className={`flex-1 px-2 focus:outline-none ${
              !isValid ? "bg-red-200" : ""
            }`}
            type="email"
            id="email"
            onChange={handleToMailChange}
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
            className={`flex-1 px-2 focus:outline-none ${
              !isValid ? "bg-red-200" : ""
            }`}
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
            className="rounded-full p-4 float-end font-semibold text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-blue-700 focus:outline-offset-2 transition-colors"
            onClick={handleSendEmail}
          >
            <LuSend className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
