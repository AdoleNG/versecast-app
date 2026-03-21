import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import VerseCastLogo from "./assets/VerseCastLogo.png";

export default function InvitationSuccess() {
  const [params] = useSearchParams();
  const loginUrl = params.get("loginUrl");

  // Optional auto-redirect after 3 seconds
  useEffect(() => {
    if (loginUrl) {
      const timer = setTimeout(() => {
        window.location.href = loginUrl;
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loginUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 text-center">

        <img
          src={VerseCastLogo}
          alt="VerseCast Logo"
          className="mx-auto h-20 w-20 mb-4"
        />

        <h1 className="text-2xl font-semibold text-green-700">
          Invitation Accepted
        </h1>

        <p className="text-gray-700 mt-3">
          Your operator access is now active.
        </p>

        <p className="text-gray-600 mt-1">
          Redirecting you to login…
        </p>

        <a
          href={loginUrl}
          className="inline-block mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Click here if not redirected
        </a>

        <p className="text-xs text-gray-500 mt-6">
          Or copy this link:
        </p>

        <p className="text-xs text-blue-600 break-all mt-1">
          {loginUrl}
        </p>
      </div>
    </div>
  );
}
