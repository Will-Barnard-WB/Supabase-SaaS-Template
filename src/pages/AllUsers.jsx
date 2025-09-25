import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Card from "../components/Card";
import "../styles/Dashboard.css";

export default function AllUsers({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) console.error(error);
      else setUsers(data || []);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>All Users</h2>
      {loading && <p>Loading users...</p>}
      <div className="cards-container">
        {users.map((u) => (
          <Card
            key={u.id}
            title={`${u.first_name} ${u.last_name}`}
            subtitle={`Age: ${u.age}`}
          />
        ))}
      </div>
    </div>
  );
}
