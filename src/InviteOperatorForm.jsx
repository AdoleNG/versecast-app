import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function InviteOperatorForm({ onBack }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/operators/invite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: json.detail || "Invite failed" });
      } else {
        setStatus({
          type: "success",
          message: `Invitation sent to ${email}`,
        });
        setEmail("");
      }
    } catch (err) {
      setStatus({ type: "error", message: "Network error" });
    }

    setLoading(false);
  };

  return (
    <>
      <h1
        style={{
          marginTop: 0,
          fontSize: "26px",
          fontWeight: 800,
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Invite Operator
      </h1>

      <p style={{ fontSize: "15px", color: "#555", marginBottom: "25px" }}>
        Enter the operator’s email address to send them an invitation.
      </p>

      {status && (
        <div
          style={{
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "20px",
            background: status.type === "success" ? "#e6f9ed" : "#fdecea",
            color: status.type === "success" ? "#0f5132" : "#842029",
            border:
              status.type === "success"
                ? "1px solid #badbcc"
                : "1px solid #f5c2c7",
          }}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleInvite}>
        <input
          type="email"
          placeholder="operator@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#0078ff",
            color: "white",
            padding: "12px 18px",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            width: "100%",
            marginBottom: "15px",
          }}
        >
          {loading ? "Sending..." : "Send Invite →"}
        </button>
      </form>

      <button
        onClick={onBack}
        style={{
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
  );
}
