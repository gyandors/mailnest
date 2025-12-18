import { Link } from "react-router";
import { IoMail } from "react-icons/io5";

import AuthCard from "../../components/ui/AuthCard";
import LoginForm from "../../components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard>
      <div>
        <IoMail className="size-14 mb-4 text-blue-500 rounded-full bg-blue-50 p-2" />
        <h1 className="text-3xl font-normal">Sign in</h1>
        <h3 className="mt-4 text-gray-800">to continue to MailNest</h3>
      </div>

      <div className="mt-3 sm:w-80">
        <LoginForm />

        <div className="text-center text-sm">
          <p className="inline-block">Don&apos;t have an account?</p>{" "}
          <Link
            className="font-semibold text-blue-600 hover:text-blue-700"
            to="/signup"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
