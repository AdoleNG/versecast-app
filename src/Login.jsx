import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔍 Check session + onboarding status
  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) return;

      try {
        const token = session.access_token;

        const res = await fetch(
          "https://versecast-backend.onrender.com/saas/onboarding/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 404) {
          navigate("/create-church");
          return;
        }

        if (res.ok) {
          navigate("/dashboard");
          return;
        }
      } catch (err) {
        console.error("Onboarding check failed:", err);
      }
    }

    checkSession();
  }, [navigate]);

  // ✉️ EMAIL LOGIN (Magic Link)
  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Check your email for a login link.");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // 🟣 GITHUB LOGIN (OAuth)
  async function handleGithubLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "40px 20px",
        fontFamily: '"Segoe UI", Arial, sans-serif',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
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
            padding: "32px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: "700",
            }}
          >
            Welcome to VerseCast
          </h1>

          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
              color: "#dcd6f7",
            }}
          >
            Register or Sign in to continue to VerseCast
          </p>
        </div>

        {/* BODY */}
        <div style={{ padding: "32px" }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontWeight: "500" }}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

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
              {loading ? "Sending…" : "Send Login Link →"}
            </button>
          </form>

          <button
            type="button"
            onClick={handleGithubLogin}
            style={{
              width: "100%",
              padding: "12px",
              background: "#111827",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              marginTop: "16px",
              cursor: "pointer",
            }}
          >
            Sign in with GitHub
          </button>

          {message && (
            <p
              style={{
                marginTop: "16px",
                textAlign: "center",
                color: "#444",
                fontSize: "14px",
              }}
            >
              {message}
            </p>
          )}

          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#777",
              marginTop: "24px",
            }}
          >
            Powered by VerseCast — Illuminating Lives with the Word.
          </p>
        </div>
      </div>
    </div>
  );
}
