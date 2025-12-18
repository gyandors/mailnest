import { NavLink } from "react-router";

import { IoClose } from "react-icons/io5";

const navLinkClass = ({ isActive }) => {
  return `block px-2 py-2 rounded-r-2xl border-l-4 transition-colors ${
    isActive
      ? "bg-blue-100 font-semibold border-l-blue-500"
      : "hover:bg-blue-100"
  }`;
};

const links = ["Inbox", "Sent", "Stared"];

export default function MobileSidebar({
  unreadMails,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const hideSideBar = () => setIsSidebarOpen(false);

  return (
    <div
      className={`sm:hidden fixed z-50 inset-0 bg-black/50 transition-opacity ${
        isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setIsSidebarOpen(false)}
    >
      <div
        className={`drop-shadow-lg w-64 h-full px-5 py-4 bg-gray-50 fixed top-0 z-50 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl text-gray-800">MailNest</h1>
          <button className="hover:text-blue-500" onClick={hideSideBar}>
            <IoClose className="size-6" />
          </button>
        </div>
        <div className="py-10">
          <ul className="rounded space-y-4">
            {links.map((link, index) => (
              <li key={index} onClick={hideSideBar}>
                <NavLink className={navLinkClass} to={link.toLocaleLowerCase()}>
                  {link}
                  {link === "Inbox" && unreadMails > 0 && (
                    <span className="float-end mr-4 font-bold">
                      +{unreadMails}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
