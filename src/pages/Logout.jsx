// src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await supabase.auth.signOut();
      navigate("/"); // redirect to home page after logout
    };

    handleLogout();
  }, [navigate]);

  return <p style={{ textAlign: "center", marginTop: "50px" }}>Logging out...</p>;
}
