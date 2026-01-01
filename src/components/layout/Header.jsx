import { useState } from "react";
import { useSelector } from "react-redux";
import { MdAccountCircle, MdMail, MdMenu } from "react-icons/md";

import ProfileOverlay from "./ProfileOverlay";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { unreadMails } = useSelector((state) => state.email);
  const { photoUrl } = useSelector((state) => state.auth.loggedUser);

  return (
    <header>
      <div className="flex justify-between items-center py-4 px-2 sm:px-5">
        <h1 className="hidden sm:block font-semibold text-2xl text-gray-800">
          MailNest
        </h1>
        <button
          className="sm:hidden text-gray-800 hover:text-blue-500 focus:outline-blue-500 focus:outline-offset-2"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MdMenu className="size-6" />
        </button>
        <div>
          <MdMail className="size-6 text-blue-500" />
        </div>

        <button
          className="rounded-full overflow-hidden text-gray-800 hover:scale-110 transition-all focus:outline-blue-500 focus:outline-offset-2"
          onClick={() => setShowProfile(!showProfile)}
        >
          {photoUrl ? (
            <img className="size-8" src={photoUrl} alt="Profile" />
          ) : (
            <MdAccountCircle className="size-8 hover:text-blue-500 transition-colors" />
          )}
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
