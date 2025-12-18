import { Link } from "react-router";
import { IoMail } from "react-icons/io5";

import AuthCard from "../../components/ui/AuthCard";
import SignUpForm from "../../components/Auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthCard>
      <div>
        <IoMail className="size-14 mb-4 text-blue-500 rounded-full bg-blue-50 p-2" />
        <h1 className="text-3xl font-normal">Create a MailNest Account</h1>
        <h3 className="mt-4 text-gray-800">Enter email and password</h3>
      </div>

      <div className="mt-3 sm:w-80">
        <SignUpForm />

        <div className="text-center text-sm">
          <p className="inline-block">Already have an account?</p>{" "}
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
