import Gallery from "../components/Gallery";
import Upload from "../components/Upload";
import { useState } from "react";

export default function HomePage() {
  const [reload, setReload] = useState(false);

  const handleUploadSuccess = () => {
    setReload(!reload); // força atualização da galeria
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Prints Jogos</h1>
      <Upload onUploadSuccess={handleUploadSuccess} />
      <Gallery key={reload} />
    </div>
  );
}
