import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import VerseCastLogo from "./assets/VerseCastLogo.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function load() {
      // 1. Check Supabase session
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        navigate("/login");
        return;
      }

      const token = session.access_token;

      // 2. Check onboarding status
      try {
        const res = await fetch(
          "https://versecast-backend.onrender.com/saas/onboarding/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 404) {
          // User exists in auth but not in public.users → onboarding required
          navigate("/create-church");
          return;
        }

        if (!res.ok) {
          console.error("Unexpected /me response:", await res.text());
          navigate("/login");
          return;
        }

        const data = await res.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard load error:", err);
        navigate("/login");
      }
    }

    load();
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading dashboard…</p>
      </div>
    );
  }

  // Safely choose the best display name
  const displayName =
    profile.full_name ||
    profile.email ||
    "User";

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <img src={VerseCastLogo} className="h-12 w-12" alt="VerseCast Logo" />
          <h1 className="text-xl font-semibold text-gray-800">VerseCast</h1>
        </div>

        <nav className="flex-1 space-y-3">
          <Link
            to="/control-panel"
            className="block px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium"
          >
            Control Panel
          </Link>

          <Link
            to="/sessions"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
          >
            Sessions
          </Link>

          <Link
            to="/operators"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
          >
            Operators
          </Link>

          <Link
            to="/settings"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
          >
            Settings
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome, {displayName}
        </h2>

        <p className="text-gray-600 mt-2">
          Church: {profile.church?.name}
        </p>

        <div className="mt-10 bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Control Panel (Coming Soon)
          </h3>
          <p className="text-gray-600">
            This is where you’ll manage live sessions, bible display,
            operator tools, and more.
          </p>
        </div>
      </main>
    </div>
  );
}
