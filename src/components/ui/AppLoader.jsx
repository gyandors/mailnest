import { IoMail } from "react-icons/io5";

export default function AppLoader() {
  return (
    <div className="fixed inset-0 bg-blue-50/50 z-50 flex justify-center items-center">
      <IoMail className="size-28 text-blue-500 animate-bounce" />
    </div>
  );
}
