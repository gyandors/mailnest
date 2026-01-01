import { useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Zoom, ToastContainer, toast } from "react-toastify";

import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

import RootPage from "./pages/RootPage";
import InboxPage from "./pages/mail/InboxPage";
import SentPage from "./pages/mail/SentPage";
import StaredPage from "./pages/mail/StaredPage";
import MailBodyPage from "./pages/mail/MailBodyPage";

import { onLogout, onLogin, setAuthUser } from "./reducers/authSlice";
import { apiKey, apiUrl } from "./utils/constants";
import AppLoader from "./components/ui/AppLoader";
import { getNewIdToken } from "./utils/services";

let initial = true;

export default function App() {
  const { isLoggedIn, idToken, refreshToken } = useSelector(
    (state) => state.auth
  );

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function authenticateUser() {
      try {
        const response = await fetch(`${apiUrl}lookup?key=${apiKey}`, {
          method: "POST",
          body: JSON.stringify({ idToken: idToken }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (!response.ok && data.error.message === "INVALID_ID_TOKEN") {
          const data = await getNewIdToken(refreshToken);

          if (data.error) throw new Error(data.error.message);

          dispatch(
            onLogin({
              idToken: data.id_token,
              refreshToken: data.refresh_token,
              localId: data.user_id,
            })
          );
        } else {
          dispatch(setAuthUser({ ...data.users[0] }));
        }
      } catch (error) {
        dispatch(onLogout());
        toast.error(error.message);
      }
    }

    if (isLoggedIn && initial) {
      authenticateUser();
      initial = false;
    }
    setLoading(false);
  }, [dispatch, idToken, isLoggedIn, refreshToken]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/mail" />} />

        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route
          path="/signup"
          element={!isLoggedIn ? <SignUpPage /> : <Navigate to="/" />}
        />

        <Route
          path="/forgot-password"
          element={!isLoggedIn ? <ForgotPasswordPage /> : <Navigate to="/" />}
        />

        <Route
          path="/mail"
          element={isLoggedIn ? <RootPage /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate to="inbox" />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="inbox/:mailId" element={<MailBodyPage />} />
          <Route path="sent" element={<SentPage />} />
          <Route path="sent/:mailId" element={<MailBodyPage />} />
          <Route path="stared" element={<StaredPage />} />
          <Route path="stared/:mailId" element={<MailBodyPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </>
    )
  );

  return (
    <>
      {loading ? <AppLoader /> : <RouterProvider router={router} />}
      <ToastContainer
        transition={Zoom}
        position="top-center"
        pauseOnFocusLoss={false}
        hideProgressBar
        autoClose={2000}
      />
    </>
  );
}
