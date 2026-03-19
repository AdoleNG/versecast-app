import { useEffect, useMemo, useState } from "react";

export default function AcceptInvite() {
  const token = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("token");
  }, []);

  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState("");
  const [success, setSuccess] = useState(false);

  const accessToken = localStorage.getItem("access_token") || "";
  const isAuthenticated = !!accessToken;

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("Invitation token is missing.");
      return;
    }

    const fetchInvite = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/operators/invitations/${token}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.detail || "Invalid or expired invitation.");
        }

        setInvite(data);
      } catch (err) {
        setError(err.message || "Failed to load invitation.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, [token]);

  const handleAccept = async () => {
    setError(null);

    if (!token) {
      setError("Invitation token is missing.");
      return;
    }

    if (!isAuthenticated) {
      setError("Please sign in first.");
      return;
    }

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/operators/accept-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          token: token,
          full_name: fullName.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to accept invitation.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to accept invitation.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-lg text-slate-700">Checking your invitation...</div>
      </div>
    );
  }

  if (error && !invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md rounded-2xl bg-white p-8 shadow">
          <h1 className="text-2xl font-bold text-slate-900">Invitation Error</h1>
          <p className="mt-4 text-sm text-red-600">{error}</p>
          <a
            href="/"
            className="mt-6 inline-block rounded-xl bg-[#2b124c] px-5 py-3 text-white"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md rounded-2xl bg-white p-8 shadow text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Invitation accepted
          </h1>
          <p className="mt-4 text-slate-600">
            Your VerseCast operator account is now ready.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-xl bg-[#2b124c] px-5 py-3 text-white"
          >
            Continue
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-slate-900">
          You’ve been invited
        </h1>

        <p className="mt-4 text-sm text-slate-600">
          Join <strong>{invite?.church_name}</strong> as an operator on VerseCast.
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Invited email: {invite?.email}
        </p>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#2b124c]"
          />
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {!isAuthenticated && (
          <p className="mt-4 text-sm text-slate-600">
            Please sign in with <strong>{invite?.email}</strong> to accept this
            invitation.
          </p>
        )}

        {!isAuthenticated ? (
         <div className="mt-6 space-y-3">
         <a
             href={`/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`}
             className="block w-full rounded-xl bg-[#2b124c] px-5 py-3 text-center font-medium text-white transition hover:opacity-95"
        >
            Sign in to continue
        </a>

        <a
             href={`/signup?next=${encodeURIComponent(window.location.pathname + window.location.search)}`}
            className="block w-full rounded-xl border border-slate-300 px-5 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-50"
        >
            Create account
        </a>
    </div>
) : (
          <button
            onClick={handleAccept}
            className="mt-6 w-full rounded-xl bg-[#2b124c] px-5 py-3 font-medium text-white transition hover:opacity-95"
          >
            Accept Invitation
          </button>
        )}
      </div>
    </div>
  );
}