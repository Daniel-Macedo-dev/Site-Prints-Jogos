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
        <div className="mb-4 auth-container" style={{ maxWidth: 720 }}>
          <h3 style={{ marginTop: 0 }}>Galeria pública</h3>
          <p style={{ marginBottom: 0, opacity: 0.85 }}>
            Para enviar prints, faça login na página <strong>Login / Cadastro</strong>.
          </p>
        </div>
      )}

      <Gallery refreshKey={refreshKey} />
    </>
  );
}
