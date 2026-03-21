import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Sessions() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let active = true;

    async function load(session) {
      if (!session) return;

      const token = session.access_token;
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const currentRes = await fetch("http://localhost:8000/sessions/current", { headers });
        const historyRes = await fetch("http://localhost:8000/sessions/history", { headers });

        if (!active) return;

        setCurrent(await currentRes.json());
        setHistory(await historyRes.json());
      } catch (err) {
        console.error("Failed to load sessions:", err);
      }
    }

    // Load initial session
    supabase.auth.getSession().then(({ data }) => {
      load(data.session);
    });

    // Listen for token refresh, login, logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      load(session);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function startSession() {
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;

    const res = await fetch("http://localhost:8000/sessions/start", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    // Open Presenter in a new tab
    window.open(
      `https://presenter.versecast.ca.ngrok.app/presenter/${data.id}`,
      "_blank"
    );

    // Redirect current tab to Control Panel
    window.location.href = `https://control.versecast.ca.ngrok.app/control/${data.id}`;
  }

  function goToCurrent() {
    if (current?.id) {
      window.location.href = `https://control.versecast.ca.ngrok.app/control/${current.id}`;
    }
  }

  return (
    <div className="p-8">

      <h1 className="text-2xl font-semibold mb-4">Sessions</h1>

      {/* Current Session */}
      <div className="mb-6">
        <h2 className="text-lg font-medium">Current Session</h2>

        {current ? (
          <div className="mt-2">
            <p className="text-gray-700">{current.name}</p>
            <button
              onClick={goToCurrent}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Open Control Panel
            </button>
          </div>
        ) : (
          <p className="text-gray-500 mt-2">No active session.</p>
        )}

        <button
          onClick={startSession}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Start New Session
        </button>
      </div>

      {/* Session History */}
      <div>
        <h2 className="text-lg font-medium">Past Sessions</h2>
        <ul className="mt-2 space-y-1 text-gray-700">
          {history.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
