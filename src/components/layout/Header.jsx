import { useState } from "react";
import { useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoMail } from "react-icons/io5";

import ProfileOverlay from "./ProfileOverlay";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const unreadMails = useSelector((state) => state.email.unreadMails);

  return (
    <header>
      <div className="flex justify-between items-center py-4 px-5">
        <h1 className="hidden sm:block font-semibold text-2xl text-gray-800">
          MailNest
        </h1>
        <button
          className="sm:hidden text-gray-800 hover:text-blue-500 focus:outline-blue-500 focus:outline-offset-2"
          onClick={() => setIsSidebarOpen(true)}
        >
          <BiMenu className="size-6" />
        </button>
        <div>
          <IoMail className="size-6 text-blue-500" />
        </div>

        <button
          className="rounded-full text-gray-800 hover:text-blue-500 focus:outline-blue-500 focus:outline-offset-2"
          onClick={() => setShowProfile(!showProfile)}
        >
          <CgProfile className="size-6" />
        </button>
      </div>
      {showProfile && (
        <ProfileOverlay onCloseOverlay={() => setShowProfile(!showProfile)} />
      )}
      <Sidebar unreadMails={unreadMails} />
      <MobileSidebar
        unreadMails={unreadMails}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </header>
  );
}
