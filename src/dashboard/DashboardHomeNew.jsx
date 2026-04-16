import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function DashboardHomeNew() {
  const base = import.meta.env.VITE_KJV_URL;   // Base URL for Control Panel + Presenter
  const api = import.meta.env.VITE_API_URL;    // API server URL

  // ============================================================
  // 1. START SESSION
  //    - Gets Supabase token
  //    - Calls /sessions/start
  //    - Opens Control Panel + Presenter in new tabs
  // ============================================================
  const handleStartSession = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // 1A. Get Supabase auth token
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        alert("You are not logged in.");
        return;
      }

      // 1B. Call backend to start a real session
      const res = await fetch(`${api}/sessions/start`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // no payload needed
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.detail || "Failed to start session.");
        return;
      }

      const session = await res.json();

      // 1C. Open Control Panel + Presenter using the real session ID
      //     ⭐ Updated: Pass token to Control Panel for STT authentication
      window.open(
        `${base}/control/${session.id}?token=${token}`,
        "_blank",
        "noopener,noreferrer"
      );

      window.open(
        `${base}/presenter/${session.id}`,
        "_blank",
        "noopener,noreferrer"
      );

    } catch (err) {
      console.error(err);
      alert("Unexpected error starting session.");
    }
  };

  // ============================================================
  // 2. END SESSION
  //    - Gets Supabase token
  //    - Calls /sessions/end
  //    - Reloads dashboard after ending
  // ============================================================
  const handleEndSession = async () => {
    if (!confirm("Are you sure you want to end this session?")) return;

    try {
      // 2A. Get Supabase auth token
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        alert("You are not logged in.");
        return;
      }

      // 2B. Call backend to end the session
      const res = await fetch(`${api}/saas/sessions/end`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      // 2C. Handle response
      if (data.status === "ended") {
        alert("Session ended successfully.");
        window.location.reload(); // refresh dashboard
      } else {
        alert("Could not end session.");
      }

    } catch (err) {
      console.error(err);
      alert("Unexpected error ending session.");
    }
  };

  // ============================================================
  // 3. DASHBOARD UI
  //    - Start Session card
  //    - End Session card
  //    - Operators card
  // ============================================================
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "0 20px",
        textAlign: "left",
        display: "block",
        width: "100%",
      }}
    >
      {/* Dashboard Header */}
      <h1 style={{ marginTop: 0, fontSize: "30px", fontWeight: 800 }}>
        Welcome to Your Dashboard
      </h1>

      <p style={{ fontSize: "15px", color: "#555", marginBottom: "35px" }}>
        Manage your sessions, operators, and church settings from one place.
        Everything you need to run VerseCast smoothly is right here.
      </p>

      {/* --------------------------------------------------------
         START SESSION CARD
      --------------------------------------------------------- */}
      <div style={{ marginBottom: "35px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
          Start a Session
        </h2>

        <p style={{ fontSize: "14px", color: "#555", marginBottom: "15px" }}>
          Launch the Control Panel and begin presenting scripture.
        </p>

        <button
          onClick={handleStartSession}
          style={{
            background: "#16a34a",
            color: "white",
            padding: "10px 18px",
            borderRadius: "6px",
            fontSize: "15px",
            cursor: "pointer",
            border: "none",
          }}
        >
          Start Session →
        </button>
      </div>

      {/* --------------------------------------------------------
         END SESSION CARD
      --------------------------------------------------------- */}
      <div style={{ marginBottom: "35px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
          End Session
        </h2>

        <p style={{ fontSize: "14px", color: "#555", marginBottom: "15px" }}>
          Close the active session and record the service duration.
        </p>

        <button
          onClick={handleEndSession}
          style={{
            background: "#c62828",
            color: "white",
            padding: "10px 18px",
            borderRadius: "6px",
            fontSize: "15px",
            cursor: "pointer",
            border: "none",
          }}
        >
          End Session →
        </button>
      </div>

      {/* --------------------------------------------------------
         OPERATORS CARD
      --------------------------------------------------------- */}
      <div style={{ marginBottom: "35px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
          Operators
        </h2>

        <p style={{ fontSize: "14px", color: "#555", marginBottom: "15px" }}>
          Invite and manage operators who can control VerseCast.
        </p>

        <Link
          to="/dashboard/operators"
          style={{
            background: "#F7E7A0",
            color: "black",
            padding: "10px 18px",
            borderRadius: "6px",
            fontSize: "15px",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Manage Operators →
        </Link>
      </div>
    </div>
  );
}
