import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setSentMails, setReceivedMails } from "../reducers/emailSlice";

export function useFetch(url) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMails() {
      const response = await fetch(url);

      const data = await response.json();

      let unreadMails = 0;
      const mailArray = [];
      for (const key in data) {
        if (data[key].read === false) unreadMails += 1;
        mailArray.push({ id: key, mail: data[key] });
      }

      if (url.includes("receivedMails")) {
        dispatch(setReceivedMails({ mailArray, unreadMails }));
      }
      if (url.includes("sentMails")) {
        dispatch(setSentMails({ mailArray, initial: true }));
      }
    }

    fetchMails();

    let intervalId;
    if (url.includes("receivedMails")) {
      intervalId = setInterval(() => {
        fetchMails();
      }, 5000);
    }

    return () => clearInterval(intervalId);
  }, [dispatch, url]);
}
