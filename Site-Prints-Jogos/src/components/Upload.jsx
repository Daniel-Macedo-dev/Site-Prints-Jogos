import { useState, useEffect, useRef } from "react";
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
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const previewUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null;
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setFile(selected);
    if (selected && selected.type.startsWith("image/")) {
      const url = URL.createObjectURL(selected);
      previewUrlRef.current = url;
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const clearPreview = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreviewUrl(null);
  };

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

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const res = await axios.post(`${API_BASE}/prints/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (e) => {
          if (e.total) setUploadProgress(Math.round((e.loaded / e.total) * 100));
        },
      });

      setPrintInfo(res.data);
      setStatus("Upload concluído!");
      onUploadSuccess?.();
      clearPreview();
      setFile(null);
      setGame("");
      setDescription("");
    } catch (err) {
      setStatus("Erro: " + getApiErrorMessage(err));
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        onAuthError?.();
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="upload-container">
      <h3 className="upload-title">Upload de Print</h3>

      <div className="mb-3">
        <label className="form-label">Arquivo de imagem</label>
        <div className="upload-area">
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
          {file && <p className="upload-filename">{file.name}</p>}
        </div>
        {previewUrl && (
          <div className="upload-preview">
            <img src={previewUrl} alt="Pré-visualização" className="upload-preview-img" />
          </div>
        )}
      </div>

      <label className="form-label" htmlFor="upload-game">Nome do jogo</label>
      <input
        id="upload-game"
        type="text"
        placeholder="Ex: The Last of Us"
        className="form-control mb-2"
        value={game}
        onChange={e => setGame(e.target.value)}
      />
      <label className="form-label" htmlFor="upload-desc">Descrição</label>
      <input
        id="upload-desc"
        type="text"
        placeholder="Opcional"
        className="form-control mb-2"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      {isUploading && (
        <div className="upload-progress">
          <div className="upload-progress-track">
            <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }} />
          </div>
          <span className="upload-progress-text">{uploadProgress}%</span>
        </div>
      )}

      <button className="btn btn-outline-light w-100" onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Enviando..." : "Enviar print"}
      </button>

      {status && (
        <p className={`status${status.startsWith("Erro:") ? " status-error" : status === "Upload concluído!" ? " status-success" : ""}`}>
          {status}
        </p>
      )}

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
