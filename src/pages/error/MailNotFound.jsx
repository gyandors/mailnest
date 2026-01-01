import { MdError } from "react-icons/md";

export default function MailNotFound() {
  return (
    <div className="h-96 flex flex-col justify-center items-center text-center">
      <MdError className="size-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-medium text-slate-600 mb-2">
        Mail Not Found
      </h1>
      <p className="text-slate-500">
        The mail you&apos;re looking for doesn&apos;t exist or has been deleted.
      </p>
    </div>
  );
}
