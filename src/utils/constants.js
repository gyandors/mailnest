import { MdOutlineOutbox } from "react-icons/md";
import { RiInboxArchiveLine } from "react-icons/ri";
import { TbTagStarred } from "react-icons/tb";

export const apiUrl = import.meta.env.VITE_FIREBASE_API_URL;
export const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
export const dbUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL;

export const navLinkClass = ({ isActive }) => {
  return `flex items-center gap-2 px-2 py-2 rounded-r-2xl border-l-4 transition-colors ${
    isActive
      ? "bg-blue-100 text-blue-600 font-semibold border-l-blue-500"
      : "hover:bg-blue-100"
  }`;
};

export const links = [
  { name: "Inbox", icon: RiInboxArchiveLine },
  { name: "Sent", icon: MdOutlineOutbox },
  { name: "Stared", icon: TbTagStarred },
];
