import { Link } from "react-router-dom";

export default function DashboardHomeNew() {
  const base = import.meta.env.VITE_KJV_URL;

  const handleStartSession = (e) => {
    e.preventDefault();
    e.stopPropagation();

    window.open(`${base}/control/demo`, "_blank", "noopener,noreferrer");
    window.open(`${base}/presenter/demo`, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <h1 style={{ marginTop: 0, fontSize: "30px", fontWeight: 800 }}>
        Welcome to Your Dashboard
      </h1>

      <p style={{ fontSize: "15px", color: "#555", marginBottom: "35px" }}>
        Manage your sessions, operators, and church settings from one place.
        Everything you need to run VerseCast smoothly is right here.
      </p>

      {/* Start Session */}
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
          Go to Start Session →
        </button>
      </div>

      {/* Operators */}
      <div>
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
          Operators
        </h2>

        <p style={{ fontSize: "14px", color: "#555", marginBottom: "15px" }}>
          Invite and manage operators who can control VerseCast.
        </p>

        <Link
          to="/dashboard/operators"
          style={{
            background: "#d9534f",
            color: "white",
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
