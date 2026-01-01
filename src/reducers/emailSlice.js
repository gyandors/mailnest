import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sentMails: [],
  receivedMails: [],
  staredMails: [],
  unreadMails: 0,
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setMails(state, action) {
      const payload = action.payload;

      for (const key in payload) {
        if (payload[key].type === "sent")
          state.sentMails.unshift({ id: key, mail: payload[key] });
        else if (payload[key].type === "received")
          state.receivedMails.unshift({ id: key, mail: payload[key] });

        if (payload[key].stared)
          state.staredMails.push({ id: key, mail: payload[key] });

        if (payload[key].type === "received" && payload[key].read === false)
          state.unreadMails += 1;
      }
    },

    addSentMail(state, action) {
      state.sentMails.unshift({
        id: action.payload.id,
        mail: action.payload.mail,
      });
    },

    markAsRead(state, action) {
      state.receivedMails = state.receivedMails.map((m) => {
        if (m.id === action.payload) m.mail.read = true;
        return m;
      });

      state.unreadMails -= 1;
    },

    markAsUnread(state, action) {
      state.receivedMails = state.receivedMails.map((m) => {
        if (m.id === action.payload) m.mail.read = false;
        return m;
      });

      state.unreadMails += 1;
    },

    deleteMail(state, action) {
      const id = action.payload.id;
      const type = action.payload.type;
      if (type === "sent") {
        state.sentMails = state.sentMails.filter((m) => m.id != id);
      }

      if (type === "received") {
        state.receivedMails = state.receivedMails.filter((m) => m.id != id);
      }
    },

    toggleStarMail(state, action) {
      const id = action.payload.id;
      const mail = action.payload.mail;

      if (mail.type === "sent") {
        state.sentMails = state.sentMails.map((m) => {
          if (m.id === id) m.mail.stared = !m.mail.stared;
          return m;
        });
      }

      if (mail.type === "received") {
        state.receivedMails = state.receivedMails.map((m) => {
          if (m.id === id) m.mail.stared = !m.mail.stared;
          return m;
        });
      }

      const staredMail = state.staredMails.find((m) => m.id === id);

      if (staredMail)
        state.staredMails = state.staredMails.filter((m) => m.id != id);
      else state.staredMails.push(action.payload);
    },
  },
});

export const {
  setMails,
  addSentMail,
  markAsRead,
  markAsUnread,
  deleteMail,
  toggleStarMail,
} = emailSlice.actions;
export default emailSlice.reducer;
