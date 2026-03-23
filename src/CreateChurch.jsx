import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function CreateChurch() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [churchName, setChurchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // Get current session token
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        setErrorMsg("You are not logged in.");
        setLoading(false);
        return;
      }

      const token = session.access_token;

      // Call backend onboarding endpoint
      const res = await fetch(
        "https://versecast-backend.onrender.com/saas/onboarding/create-church",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            full_name: fullName,
            church_name: churchName,
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Create church error:", text);
        setErrorMsg("Failed to create church. Please try again.");
        setLoading(false);
        return;
      }

      // Success → redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Onboarding error:", err);
      setErrorMsg("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create Your Church
        </h2>

        <p className="text-gray-600 text-center mt-2 mb-6">
          Welcome to VerseCast! Let’s set up your church profile.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Church Name
            </label>
            <input
              type="text"
              value={churchName}
              onChange={(e) => setChurchName(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="New Life Worship Center"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? "Creating…" : "Create Church"}
          </button>
        </form>

        {errorMsg && (
          <p className="text-center text-red-600 mt-4">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}
