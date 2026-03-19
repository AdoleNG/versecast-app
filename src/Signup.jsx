import { useMemo, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const nextUrl = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("next") || "/";
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      const accessToken = data?.session?.access_token;

      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        window.location.href = nextUrl;
        return;
      }

      setError(
        "Signup succeeded, but no session was returned. Check your Supabase email confirmation settings."
      );
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
        <p className="mt-3 text-slate-600">
          Create your VerseCast account to continue your operator invitation setup.
        </p>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#2b124c]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#2b124c]"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#2b124c]"
              placeholder="Confirm your password"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#2b124c] px-5 py-3 font-medium text-white transition hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <a
            href={`/login?next=${encodeURIComponent(nextUrl)}`}
            className="font-medium text-[#2b124c] hover:underline"
          >
            Sign in
          </a>
        </div>

        <a
          href="/"
          className="mt-4 inline-block text-sm text-slate-600 hover:text-slate-900"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}