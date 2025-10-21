import React from "react";
import Gallery from "../components/Gallery";
import Upload from "../components/Upload";

export default function HomePage() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Galeria de Prints</h1>
      <Upload />
      <Gallery />
    </div>
  );
}
