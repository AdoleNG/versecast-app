import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleCallback() {
      try {
        // Parse tokens from URL fragment (#)
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        // If no tokens → this is probably OAuth, not magic link
        if (!access_token || !refresh_token) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(
            window.location.href
          );

          if (error) {
            console.error("OAuth callback error:", error);
            navigate("/login");
            return;
          }

          // OAuth session stored → proceed to onboarding check
        } else {
          // MAGIC LINK FLOW — store session manually
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) {
            console.error("Magic link session error:", error);
            navigate("/login");
            return;
          }
        }

        // Now check onboarding status
        const { data } = await supabase.auth.getSession();
        const session = data.session;

        if (!session) {
          navigate("/login");
          return;
        }

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

        console.error("Unexpected onboarding response:", await res.text());
        navigate("/login");
      } catch (err) {
        console.error("Auth callback error:", err);
        navigate("/login");
      }
    }

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-700 text-lg">Signing you in…</p>
    </div>
  );
}
