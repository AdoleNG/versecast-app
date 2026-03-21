import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { supabase } from "./supabaseClient.js";
import VerseCastLogo from "./assets/VerseCastLogo.png";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    loadUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <img src={VerseCastLogo} className="h-12 w-12" alt="VerseCast Logo" />
          <h1 className="text-xl font-semibold text-gray-800">VerseCast</h1>
        </div>

        <nav className="flex-1 space-y-3">
          <a
            href="/control-panel"
            className="block px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium"
          >
            Control Panel
          </a>

          <a
            href="/sessions"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
          >
            Sessions
          </a>

          <a
            href="/operators"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
          >
            Operators
          </a>

          <a
            href="/settings"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
          >
            Settings
          </a>
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
          Welcome{user ? `, ${user.user_metadata?.full_name}` : ""}
        </h2>

        <p className="text-gray-600 mt-2">
          This is your VerseCast operator dashboard. More features coming soon.
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
