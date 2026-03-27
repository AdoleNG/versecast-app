import { useState } from "react";
import InviteOperatorForm from "./InviteOperatorForm";

export default function OperatorsPage() {
  const [view, setView] = useState("menu"); // menu | invite | revoke

  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
        fontFamily: '"Segoe UI", Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "30px 40px",
          borderRadius: "12px",
          maxWidth: "800px",
          width: "100%",
          margin: "40px auto",
          boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
        }}
      >
        {view === "menu" && (
          <>
            <h1
              style={{
                marginTop: 0,
                fontSize: "28px",
                fontWeight: 800,
                marginBottom: "20px",
                color: "#333",
              }}
            >
              Manage Operators
            </h1>

            <p style={{ fontSize: "15px", color: "#555", marginBottom: "30px" }}>
              Invite new operators or manage existing ones.
            </p>

            <button
              onClick={() => setView("invite")}
              style={{
                display: "block",
                width: "100%",
                background: "#0078ff",
                color: "white",
                padding: "12px 18px",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                marginBottom: "15px",
              }}
            >
              Invite Operator →
            </button>

            <button
              onClick={() => setView("revoke")}
              style={{
                display: "block",
                width: "100%",
                background: "#d9534f",
                color: "white",
                padding: "12px 18px",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Revoke Operator (Coming Soon)
            </button>
          </>
        )}

        {view === "invite" && (
          <InviteOperatorForm onBack={() => setView("menu")} />
        )}

        {view === "revoke" && (
          <>
            <h2>Revoke Operator</h2>
            <p>This feature is coming soon.</p>
            <button
              onClick={() => setView("menu")}
              style={{
                marginTop: "20px",
                background: "#555",
                color: "white",
                padding: "10px 16px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
