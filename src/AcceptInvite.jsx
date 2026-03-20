import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AcceptInvite() {
  const { token } = useParams();
  const [invite, setInvite] = useState(null);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch invitation details
  useEffect(() => {
    async function fetchInvite() {
      try {
        const res = await fetch(`${API_BASE_URL}/operators/invitations/${token}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.detail || "Invalid or expired invitation.");
        } else {
          setInvite(data);
        }
      } catch (err) {
        setError("Failed to load invitation.");
      } finally {
        setLoading(false);
      }
    }

    fetchInvite();
  }, [token]);

  async function handleAccept(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/operators/accept-invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          full_name: fullName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Failed to accept invitation.");
        setSubmitting(false);
        return;
      }

      // Redirect to magic login link
      if (data.login_url) {
        window.location.href = data.login_url;
      } else {
        setError("Unexpected server response.");
        setSubmitting(false);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p>Loading invitation…</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 20 }}>
      <h2>Accept Invitation</h2>

      <p>
        You have been invited to join <strong>{invite.church_name}</strong> as an operator.
      </p>

      <p>Invited email: <strong>{invite.email}</strong></p>

      <form onSubmit={handleAccept} style={{ marginTop: 20 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 15,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: 12,
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? "Accepting…" : "Accept Invitation"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}
    </div>
  );
}
