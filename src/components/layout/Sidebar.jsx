import { NavLink } from "react-router";

import { links, navLinkClass } from "../../utils/constants";

export default function Sidebar({ unreadMails }) {
  return (
    <div className="hidden sm:block w-64 h-full px-5 py-2 fixed top-16">
      <ul className="rounded space-y-4">
        {links.map((link, index) => (
          <li key={index}>
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
  );
}
