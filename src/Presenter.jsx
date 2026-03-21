import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function Presenter() {
  const { sid } = useParams();
  const [verse, setVerse] = useState(null);

  async function authFetch(url, options = {}) {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    return fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    });
  }

  async function loadCurrent() {
    const res = await authFetch(`http://localhost:8000/current/${sid}`);
    const data = await res.json();
    setVerse(data || null);
  }

  useEffect(() => {
    loadCurrent();

    // Simple polling every 2 seconds
    const interval = setInterval(loadCurrent, 2000);
    return () => clearInterval(interval);
  }, [sid]);

  if (!verse) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-900 text-yellow-100">
        <p className="text-xl">Waiting for verse…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purple-900 text-yellow-100 px-16">
      <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-80">
        {verse.reference}
      </p>

      <p className="text-4xl leading-relaxed text-center max-w-5xl font-light">
        {verse.text}
      </p>
    </div>
  );
}
