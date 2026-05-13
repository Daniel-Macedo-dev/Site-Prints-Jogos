import { useState } from "react";
import Upload from "../components/Upload";
import Gallery from "../components/Gallery";

export default function HomePage({ isLoggedIn, onAuthError }) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      {isLoggedIn ? (
        <div className="mb-4">
          <Upload onUploadSuccess={() => setRefreshKey(k => k + 1)} onAuthError={onAuthError} />
        </div>
      ) : (
        <div className="gallery-notice mb-4">
          <h3>Galeria pública</h3>
          <p>Para enviar prints, faça login em <strong>Login / Cadastro</strong> no menu.</p>
        </div>
      )}

      <Gallery refreshKey={refreshKey} />
    </>
  );
}
