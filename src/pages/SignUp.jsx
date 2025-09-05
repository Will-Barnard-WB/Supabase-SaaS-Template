// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../styles/SignUp.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    age: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Generic handler for all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    setErrorMsg("");
    setLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      setErrorMsg("Passwords do not match.");
      return;
    }

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password
    });

    if (authError) {
      setLoading(false);
      setErrorMsg(authError.message);
      return;
    }

    const user = authData.user;

    if (user) {
      // Upsert into profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert(
          {
            id: user.id, // use Supabase auth user id as primary key
            first_name: formData.firstName,
            last_name: formData.lastName,
            age: formData.age
          },
          { onConflict: "id" } // avoid duplicates
        );

      if (profileError) {
        console.error("Failed to upsert profile:", profileError.message);
      }
    }

    setLoading(false);
    navigate("/dashboard"); // redirect after signup
  };

  return (
    <div className="fullscreen-center">
      <div className="auth-container">
        <h2>Sign Up</h2>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button onClick={handleSignup} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
