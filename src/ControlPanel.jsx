import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function ControlPanel() {
  const { sid } = useParams();

  const [phrase, setPhrase] = useState("");
  const [pending, setPending] = useState(null);
  const [status, setStatus] = useState({ status: "idle" });

  async function authFetch(url, options = {}) {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    });
  }

  async function matchPhrase() {
    const res = await authFetch("http://localhost:8000/match", {
      method: "POST",
      body: JSON.stringify({
        phrase,
        session_id: sid
      })
    });

    const data = await res.json();
    setPending(data.best || null);
    setStatus({ status: "pending" });
  }

  async function approve() {
    await authFetch(`http://localhost:8000/approve/${sid}`, {
      method: "POST"
    });

    setStatus({ status: "approved" });
  }

  async function clearPending() {
    await authFetch(`http://localhost:8000/clear_pending/${sid}`, {
      method: "POST"
    });

    setPending(null);
    setStatus({ status: "idle" });
  }

  async function clearAll() {
    await authFetch(`http://localhost:8000/clear_all/${sid}`, {
      method: "POST"
    });

    setPending(null);
    setStatus({ status: "idle" });
  }

  async function loadCurrent() {
    const res = await authFetch(`http://localhost:8000/current/${sid}`);
    const data = await res.json();

    // Optional: hydrate UI from current presenter state
  }

  useEffect(() => {
    loadCurrent();
  }, [sid]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        VerseCast Control Panel (Session: {sid})
      </h1>

      {/* Phrase Input */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Reference or Phrase
        </label>

        <div className="flex space-x-3">
          <input
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2"
            placeholder="e.g. There is therefore now no condemnation..."
          />

          <button
            onClick={matchPhrase}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Match
          </button>
        </div>
      </div>

      {/* Pending Match */}
      {pending && (
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
          <p className="text-xs uppercase text-gray-500 mb-1">Pending (Best)</p>

          <p className="font-semibold text-lg">{pending.reference}</p>
          <p className="mt-2 text-gray-700">{pending.text}</p>

          <p className="mt-3 text-xs text-gray-500">
            Mode: {pending.mode} | Confidence: {pending.confidence}
          </p>

          <div className="mt-5 flex space-x-3">
            <button
              onClick={approve}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Approve / Display
            </button>

            <button
              onClick={clearPending}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Clear Pending
            </button>

            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Status */}
      <div>
        <p className="text-xs uppercase text-gray-500 mb-2">Status</p>
        <pre className="bg-gray-900 text-green-300 p-4 rounded-lg text-sm">
          {JSON.stringify(status, null, 2)}
        </pre>
      </div>
    </div>
  );
}
