import { useState } from "react";
import axios from "axios";
import { API_BASE, getApiErrorMessage } from "../api";

const MAX_UPLOAD_SIZE_MB = 10;
const MAX_UPLOAD_SIZE_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024;

export default function Upload({ onUploadSuccess, onAuthError }) {
  const [file, setFile] = useState(null);
  const [game, setGame] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [printInfo, setPrintInfo] = useState(null);

  const handleUpload = async () => {
    setStatus("");
    setPrintInfo(null);

    if (!file) return setStatus("Selecione um arquivo");
    if (!game) return setStatus("Informe o nome do jogo");

    if (!file.type.startsWith("image/")) return setStatus("Selecione apenas arquivos de imagem.");
    if (file.size > MAX_UPLOAD_SIZE_BYTES) return setStatus("Arquivo muito grande. O limite é de 10 MB.");

    const token = localStorage.getItem("token");
    if (!token) return setStatus("Faça login primeiro");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("game", game);
    formData.append("description", description);

    try {
      setStatus("Enviando...");
      const res = await axios.post(`${API_BASE}/prints/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPrintInfo(res.data);
      setStatus("Upload concluído!");
      onUploadSuccess?.();
      setFile(null);
      setGame("");
      setDescription("");
    } catch (err) {
      setStatus("Erro: " + getApiErrorMessage(err));
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        onAuthError?.();
      }
    }
  };

  return (
    <div className="upload-container">
      <h3 style={{ marginTop: 0 }}>Upload de Print</h3>

      <div className="upload-area mb-3">
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={e => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <input
        type="text"
        placeholder="Nome do jogo"
        className="form-control mb-2"
        value={game}
        onChange={e => setGame(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        className="form-control mb-2"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button className="btn btn-outline-light w-100" onClick={handleUpload}>
        Enviar
      </button>

      {status && <p className="status">{status}</p>}

      {printInfo && (
        <div className="upload-result">
          <p><strong>Jogo:</strong> {printInfo.game}</p>
          <p><strong>Descrição:</strong> {printInfo.description}</p>
          <p><strong>Enviado por:</strong> {printInfo.username}</p>
          <p><strong>Data:</strong> {new Date(printInfo.uploadDate).toLocaleString()}</p>
          <a href={printInfo.url} target="_blank" rel="noreferrer">Ver print</a>
        </div>
      )}
    </div>
  );
}
