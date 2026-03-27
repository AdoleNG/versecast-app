import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function CreateChurch() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [churchName, setChurchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        setErrorMsg("You are not logged in.");
        setLoading(false);
        return;
      }

      const token = session.access_token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/saas/onboarding/create-church`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            full_name: fullName,
            church_name: churchName,
          }),
        }
      );

      if (!response.ok) {
        setErrorMsg("Failed to create church. Please try again.");
        setLoading(false);
        return;
      }

      const dataRes = await response.json();

      if (!dataRes.church_id || !dataRes.user_id) {
        setErrorMsg("Unexpected server response.");
        setLoading(false);
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrorMsg("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          maxWidth: "900px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: "#2b124c",
            color: "#ffffff",
            padding: "40px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            Create Your Church
          </h1>

          <p
            style={{
              marginTop: "10px",
              fontSize: "15px",
              color: "#dcd6f7",
            }}
          >
            Welcome to VerseCast. Let’s set up your church profile.
          </p>
        </div>

        {/* BODY */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {/* FORM */}
          <div style={{ padding: "40px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              Church Details
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "500" }}>Your Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="John Doe"
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "6px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "500" }}>Church Name</label>
                <input
                  type="text"
                  value={churchName}
                  onChange={(e) => setChurchName(e.target.value)}
                  required
                  placeholder="New Life Worship Center"
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "6px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              {errorMsg && (
                <div
                  style={{
                    background: "#fee2e2",
                    color: "#991b1b",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    fontSize: "14px",
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#16a34a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Creating..." : "Create Church →"}
              </button>
            </form>
          </div>

          {/* SIDE PANEL */}
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
                fontWeight: "600",
                marginBottom: "12px",
              }}
            >
              What happens next?
            </h2>

            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
              Once your church is created, you’ll be taken to your dashboard
              where you can start a service or invite a member of your media team to operate your bible display system.
            </p>

            <div style={{ marginTop: "20px" }}>
              <strong>Start Sessions</strong>
              <p style={{ fontSize: "14px", color: "#555" }}>
                Launch live bible display instantly.
              </p>
            </div>

            <div style={{ marginTop: "16px" }}>
              <strong>Invite Operators</strong>
              <p style={{ fontSize: "14px", color: "#555" }}>
                Add team members to assist during services.
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
              <strong style={{ color: "#2b124c" }}>VerseCast</strong>
              <p style={{ fontSize: "14px", color: "#555" }}>
               Illuminating the world with the Word in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}