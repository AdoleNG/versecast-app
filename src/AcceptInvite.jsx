import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VerseCastLogo from "./assets/VerseCastLogo.png";

export default function AcceptInvite() {
  const { token } = useParams();
  const [invite, setInvite] = useState(null);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch invitation details
  useEffect(() => {
    async function fetchInvite() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/operators/invitations/${token}`
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.detail || "Invalid or expired invitation.");
        } else {
          setInvite(data);
        }
      } catch {
        setError("Network error. Please try again.");
      }
    }

    fetchInvite();
  }, [token]);

  async function handleAccept(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/operators/accept-invite`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, full_name: fullName }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Unable to accept invitation.");
      } else {
        window.location.href = `/invite-success?loginUrl=${encodeURIComponent(
          data.login_url
        )}`;
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <img
          src={VerseCastLogo}
          alt="VerseCast Logo"
          className="mx-auto h-20 w-20 mb-4"
        />

        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Accept Invitation
        </h1>

        {error && (
          <p className="text-center text-red-600 mt-4">{error}</p>
        )}

        {invite && (
          <>
            <p className="text-gray-700 text-center mt-2">
              You have been invited to join:
            </p>

            <p className="text-blue-700 text-center font-semibold text-lg mt-1">
              {invite.church_name}
            </p>

            <p className="text-gray-500 text-center text-sm mb-6">
              Invited email: {invite.email}
            </p>

            <form onSubmit={handleAccept} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name here"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
              >
                {loading ? "Accepting…" : "Accept Invitation"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
