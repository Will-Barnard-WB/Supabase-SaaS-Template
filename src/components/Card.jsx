// src/components/Card.jsx
import React from "react";
import "../styles/Card.css";

export default function Card({ title, subtitle }) {
  return (
    <div className="card">
      <p className="card-title">{title}</p>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </div>
  );
}
