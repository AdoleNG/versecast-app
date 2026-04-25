import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function StartSession() {
  const base = import.meta.env.VITE_KJV_URL;
  const [showReminder, setShowReminder] = useState(false);

  const handleStart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        alert("No Supabase token found.");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/sessions/start`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!res.ok) {
        const body = await res.text();
        alert("Failed to start session: " + body);
        return;
      }

      const json = await res.json();
      const sessionId = json.id;

      // Show inline reminder banner
      setShowReminder(true);

      window.open(
        `${base}/control/${sessionId}?token=${token}`,
        "_blank",
        "noopener,noreferrer"
      );

      window.open(
        `${base}/presenter/${sessionId}`,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (err) {
      console.error(err);
      alert("Could not start session.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Start Session
      </h1>

      {showReminder && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">
          Remember to disable STT when service ends
        </div>
      )}

      <p className="text-gray-600 text-lg leading-relaxed">
        Starting a session will open the Control Panel.{" "}
        Use the <strong>Open Presenter</strong> button inside the Control Panel to launch the Presenter.
      </p>

      <button
        type="button"
        onClick={handleStart}
        className="
          bg-[#0078ff] 
          hover:bg-[#005fcc] 
          transition 
          text-white 
          px-8 
          py-4 
          rounded-lg 
          text-lg 
          font-semibold 
          shadow-md
        "
      >
        Start Session
      </button>
    </div>
  );
}