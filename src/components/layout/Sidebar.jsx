import { NavLink } from "react-router";

const navLinkClass = ({ isActive }) => {
  return `block px-2 py-2 rounded-r-2xl border-l-4 transition-colors ${
    isActive
      ? "bg-blue-100 font-semibold border-l-blue-500"
      : "hover:bg-blue-100"
  }`;
};

const links = ["Inbox", "Sent", "Stared"];

export default function Sidebar({ unreadMails }) {
  return (
    <div className="hidden sm:block w-64 h-full px-5 py-2 fixed top-16">
      <ul className="rounded space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink className={navLinkClass} to={link.toLocaleLowerCase()}>
              {link}
              {link === "Inbox" && unreadMails > 0 && (
                <span className="float-end mr-4 font-bold">+{unreadMails}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
