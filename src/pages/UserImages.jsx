import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../styles/UserImages.css";

export default function UserImages({ user }) {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const fetchUserImages = async () => {
    if (!user) return;

    const { data, error } = await supabase.storage
      .from("user-uploads")
      .list(`${user.id}/`);

    if (error) {
      console.error("Error fetching images:", error);
      return;
    }

    const imagesWithUrls = await Promise.all(
        data.map(async (file) => {
          // Await the signed URL properly
          const { data: urlData, error: urlError } = await supabase.storage
            .from("user-uploads")
            .createSignedUrl(`${user.id}/${file.name}`, 3600); // 1 hour
      
          if (urlError) {
            console.error("Error creating signed URL:", urlError);
            return null;
          }
      
          return { name: file.name, url: urlData.signedUrl };
        })
      );
      
      // Remove any nulls in case of errors
      setImages(imagesWithUrls.filter(Boolean));
  };

  useEffect(() => {
    fetchUserImages();
  }, [user]);

  return (
    <div className="dashboard-container">
      <h2>Your Uploaded Images</h2>
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
  );
}
