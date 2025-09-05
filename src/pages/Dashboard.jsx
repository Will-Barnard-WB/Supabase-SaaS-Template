import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Card from "../components/Card";
import "../styles/Dashboard.css";

export default function Dashboard({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Fetch all user profiles
  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) console.error(error);
      else setUsers(data || []);
      setLoading(false);
    }

    fetchUsers();
  }, []);

  // Find current user's profile safely
  const currentUserProfile = users.find((u) => u.id === user?.id);

  if (!user) return null; // Avoid rendering if user is null

  return (
    <div className="dashboard-container">
      <h2>
        Hello{" "}
        {loading
          ? "Loading..."
          : currentUserProfile
          ? `${currentUserProfile.first_name} ${currentUserProfile.last_name}`
          : user.email}
      </h2>

      <h3>All Users</h3>
      <div className="cards-container">
        {loading
          ? <p>Loading users...</p>
          : users.map((u) => (
              <Card
                key={u.id}
                title={`${u.first_name} ${u.last_name}`}
                subtitle={`Age: ${u.age}`}
              />
            ))
        }
      </div>
    </div>
  );
}
