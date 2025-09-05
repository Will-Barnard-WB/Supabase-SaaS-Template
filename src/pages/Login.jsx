import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    // Sign in the user
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setLoading(false);
      return alert(loginError.message);
    }

    const user = loginData.user;

    setLoading(false);
    console.log("Login successful!");
  };

  return (
    <div className="fullscreen-center">
      <div className="auth-container">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}
