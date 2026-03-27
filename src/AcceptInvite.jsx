import { useEffect, useState } from "react";
import VerseCastLogo from "./assets/VerseCastLogo.png";

export default function AcceptInvite() {
  const [invite, setInvite] = useState(null);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loadingInvite, setLoadingInvite] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    async function fetchInvite() {
      if (!token) {
        setError("Invalid invitation link.");
        setLoadingInvite(false);
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/operators/invitations/${token}`
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.detail || "Invalid or expired invitation.");
        } else {
          setInvite(data);
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoadingInvite(false);
      }
    }

    fetchInvite();
  }, [token]);

  async function handleAccept(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/operators/accept-invite`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, full_name: fullName }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Unable to accept invitation.");
      } else {
        window.location.href = data.login_url;
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingInvite) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          fontFamily: '"Segoe UI", Arial, sans-serif',
          color: "#374151",
          fontSize: "16px",
        }}
      >
        Loading invitation...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "40px 20px",
        fontFamily: '"Segoe UI", Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#2b124c",
            color: "#ffffff",
            padding: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "18px",
              flexWrap: "wrap",
            }}
          >
            <img
              src={VerseCastLogo}
              alt="VerseCast Logo"
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "16px",
                objectFit: "cover",
                background: "#ffffff",
              }}
            />
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                  fontWeight: 700,
                }}
              >
                Accept Invitation
              </h1>
              <p
                style={{
                  marginTop: "10px",
                  marginBottom: 0,
                  fontSize: "15px",
                  color: "#dcd6f7",
                  lineHeight: 1.6,
                }}
              >
                Join your church workspace on VerseCast and start collaborating
                with your team.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <div style={{ padding: "40px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              Invitation Details
            </h2>

            {error && (
              <div
                style={{
                  background: "#fee2e2",
                  color: "#991b1b",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  marginBottom: "18px",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            {invite && (
              <form onSubmit={handleAccept}>
                <div style={{ marginBottom: "18px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "6px",
                    }}
                  >
                    You have been invited to join
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#2b124c",
                      lineHeight: 1.3,
                    }}
                  >
                    {invite.church_name}
                  </div>
                </div>

                <div
                  style={{
                    background: "#fafafa",
                    border: "1px solid #ececec",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    marginBottom: "22px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Invited email
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#111827",
                      wordBreak: "break-word",
                    }}
                  >
                    {invite.email}
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 500,
                      fontSize: "15px",
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
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
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      fontSize: "15px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: submitting ? "#6b7280" : "#16a34a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "15px",
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? "Accepting..." : "Accept Invitation"}
                </button>
              </form>
            )}
          </div>

          <div
            style={{
              padding: "40px",
              background: "#fafafa",
              borderLeft: "1px solid #eee",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "12px",
                color: "#111827",
              }}
            >
              What happens next?
            </h2>

            <p
              style={{
                fontSize: "14px",
                color: "#555",
                lineHeight: 1.7,
                marginBottom: "22px",
              }}
            >
              Once you accept this invitation, you will be signed in and taken
              to the VerseCast dashboard for your church.
            </p>

            <div style={{ marginTop: "20px" }}>
              <strong style={{ color: "#111827", fontSize: "15px" }}>
                Access the Dashboard
              </strong>
              <p
                style={{
                  fontSize: "14px",
                  color: "#555",
                  marginTop: "8px",
                  lineHeight: 1.6,
                }}
              >
                View your church workspace, manage sessions, and support live
                scripture display.
              </p>
            </div>

            <div style={{ marginTop: "18px" }}>
              <strong style={{ color: "#111827", fontSize: "15px" }}>
                Join Your Team
              </strong>
              <p
                style={{
                  fontSize: "14px",
                  color: "#555",
                  marginTop: "8px",
                  lineHeight: 1.6,
                }}
              >
                Collaborate with your church owner and other operators inside
                the same VerseCast environment.
              </p>
            </div>

            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                borderRadius: "10px",
                background: "#ffffff",
                border: "1px solid #eee",
              }}
            >
              <strong style={{ color: "#2b124c", fontSize: "16px" }}>
                VerseCast
              </strong>
              <p
                style={{
                  fontSize: "14px",
                  color: "#555",
                  marginTop: "10px",
                  lineHeight: 1.6,
                }}
              >
                Illuminating lives with the Word real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}