import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function DashboardLayoutNew() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    async function loadMe() {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/saas/onboarding/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );

      const json = await res.json();
      setMe(json);
    }

    loadMe();
  }, []);

  if (!me) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f5f5",
          padding: "30px",
          fontFamily: '"Segoe UI", Arial, sans-serif',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#555",
          fontSize: "16px",
        }}
      >
        Loading dashboard…
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: '"Segoe UI", Arial, sans-serif',
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "30px 40px",
          borderRadius: "12px",
          maxWidth: "1000px",
          margin: "40px auto",
          boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
        }}
      >
        {/* ⭐ USER HEADER (restored) */}
        <h1
          style={{
            marginTop: 0,
            fontSize: "30px",
            fontWeight: 800,
            marginBottom: "10px",
            color: "#333",
          }}
        >
          VerseCast Dashboard
        </h1>

        <div
          style={{
            fontSize: "14px",
            color: "#555",
            marginBottom: "25px",
          }}
        >
          {me.full_name} — {me.church?.name}
        </div>

        {/* ⭐ Nested pages render here */}
        <Outlet />
      </div>
    </div>
  );
}
