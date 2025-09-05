import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png"; // or any image

export default function Home() {
  return (
    <div className="fullscreen-center">
      <div className="container">
        <img src={heroImage} alt="Hero" style={{ maxWidth: "100%", marginBottom: "20px", borderRadius: "10px" }} />
        <h2>Supabase SaaS Template</h2>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        </div>
      </div>
    </div>
  );
}
