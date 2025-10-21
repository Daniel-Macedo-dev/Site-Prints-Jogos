import React from "react";
import Gallery from "../components/Gallery";
import Upload from "../components/Upload";

export default function HomePage() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Prints Jogos</h1>
      <Upload />
      <Gallery />
    </div>
  );
}
