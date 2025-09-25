import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png"; // replace with your image
import "../styles/Home.css"; // import your CSS file

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        {/* Hero Image */}
        <img src={heroImage} alt="Will's Website Hero" className="home-hero" />

        {/* Main Heading */}
        <h1>Welcome to Will's Website</h1>

        {/* Intro Text */}
        <p>
          Explore projects, upload and manage your images, and connect with other users
          in a simple, clean interface. This site is built using modern tools like React
          and Supabase for a smooth and responsive experience.
        </p>

        {/* Footer Text */}
        <p className="home-footer">© 2025 Will's Website. All rights reserved.</p>
      </div>
    </div>
  );
}
