import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../styles/Dashboard.css";

export default function ImageUpload({ user }) {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleUpload = async (event) => {
    if (!user) return;
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const filePath = `${user.id}/${file.name}`;

    const { error } = await supabase.storage
      .from("user-uploads")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    } else {
      alert("Upload successful!");
    }

    setUploading(false);
  };

  return (
    <div className="dashboard-container">
      <h2>Upload Your Image</h2>
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
        />
        {uploading && <p>Uploading...</p>}
      </div>
    </div>
  );
}
