import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Card from "../components/Card";
import "../styles/Dashboard.css";

export default function Dashboard({ user }) {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
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
      setLoadingUsers(false);
    }
    fetchUsers();
  }, []);

  // Fetch current user's images
  const fetchUserImages = async () => {
    if (!user) return;

    const { data, error } = await supabase.storage
      .from("user-uploads")
      .list(`${user.id}/`); // list only the user's folder

    if (error) {
      console.error("Error fetching images:", error);
      return;
    }

    // Create signed URLs for each image
    const imagesWithUrls = await Promise.all(
      data.map(async (file) => {
        const { data: urlData } = supabase.storage
          .from("user-uploads")
          .createSignedUrl(`${user.id}/${file.name}`, 60); // 60s signed URL
        return { ...file, url: urlData?.signedUrl };
      })
    );

    setImages(imagesWithUrls);
  };

  useEffect(() => {
    fetchUserImages();
  }, [user]);

  // Handle file upload
  const handleUpload = async (event) => {
    if (!user) return;

    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const filePath = `${user.id}/${file.name}`;

    const { data, error } = await supabase.storage
      .from("user-uploads")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    } else {
      alert("Upload successful!");
      fetchUserImages(); // refresh images after upload
    }

    setUploading(false);
  };

  const currentUserProfile = users.find((u) => u.id === user?.id);

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <h2>
        Hello{" "}
        {loadingUsers
          ? "Loading..."
          : currentUserProfile
          ? `${currentUserProfile.first_name} ${currentUserProfile.last_name}`
          : user.email}
      </h2>

     {/* Upload Section */}
    <div className="upload-section">
      <h3>Upload Your Image</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>

    {/* User's Images */}
    <div className="user-images">
      <h3>Your Uploaded Images</h3>
      {images.length === 0 && <p>No images uploaded yet.</p>}
      <div className="images-grid">
        {images.map((img) => (
          <div key={img.name}>
            <img src={img.url} alt={img.name} />
            <div className="image-name">{img.name}</div>
          </div>
        ))}
      </div>
    </div>


      {/* All Users */}
      <h3>All Users</h3>
      <div className="cards-container">
        {loadingUsers
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
