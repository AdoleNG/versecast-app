import { useState } from "react";
import { supabase } from "./supabaseClient";
import VerseCastLogo from "./assets/VerseCastLogo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Check your email for a login link.");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        {/* VerseCast Logo */}
        <img
          src={VerseCastLogo}
          alt="VerseCast Logo"
          className="mx-auto h-20 w-20 mb-4"
        />

        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Sign in to VerseCast
        </h2>

        <p className="text-gray-600 text-center mt-2 mb-6">
          Enter your email and we’ll send you a secure login link.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? "Sending…" : "Send Login Link"}
          </button>
        </form>

        {message && (
          <p className="text-center text-gray-700 mt-4">{message}</p>
        )}

        <p className="text-center text-xs text-gray-500 mt-6">
          Powered by VerseCast — Illuminating Lives with the Word.
        </p>
      </div>
    </div>
  );
}
