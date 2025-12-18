import { Link } from "react-router";
import { IoMail } from "react-icons/io5";

import AuthCard from "../../components/ui/AuthCard";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthCard>
      <div>
        <IoMail className="size-14 mb-4 text-blue-500 rounded-full bg-blue-50 p-2" />
        <h1 className="font-normal text-3xl">Reset your Password</h1>
        <h3 className="mt-4 text-gray-800">Enter registered email</h3>
      </div>

      <div className="mt-3 sm:w-80">
        <ForgotPasswordForm />

        <div className="text-center text-sm">
          <p className="inline-block">Know your password?</p>{" "}
          <Link
            className="font-semibold text-blue-600 hover:text-blue-700"
            to="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
