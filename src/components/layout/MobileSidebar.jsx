import { NavLink } from "react-router";
import { IoClose } from "react-icons/io5";

import { links, navLinkClass } from "../../utils/constants";

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
          <button
            className="hover:text-blue-500 transition-colors"
            onClick={hideSideBar}
          >
            <IoClose className="size-6" />
          </button>
        </div>
        <div className="py-6">
          <ul className="rounded space-y-4">
            {links.map((link, index) => (
              <li key={index} onClick={hideSideBar}>
                <NavLink className={navLinkClass} to={link.name.toLowerCase()}>
                  <link.icon className="size-5" />{" "}
                  <span className="flex-1">{link.name}</span>
                  {link.name === "Inbox" && unreadMails > 0 && (
                    <span className="mr-4 font-bold">+{unreadMails}</span>
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
