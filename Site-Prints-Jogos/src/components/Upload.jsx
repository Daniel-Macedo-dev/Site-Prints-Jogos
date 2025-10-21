import { useState } from "react";
import axios from "axios";

export default function Upload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [game, setGame] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setStatus("Selecione um arquivo primeiro");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("game", game);
    formData.append("description", description);

    const token = localStorage.getItem("token");

    try {
      setStatus("Enviando...");
      await axios.post("http://localhost:8080/prints/upload", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      setStatus("Upload concluído!");
      setFile(null);
      setGame("");
      setDescription("");
      onUploadSuccess(); // atualiza a galeria
    } catch (err) {
      setStatus("Erro ao enviar: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="card p-4 shadow-sm mt-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 className="text-center mb-3">Upload de Print</h2>
      <input className="form-control mb-2" type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input className="form-control mb-2" type="text" placeholder="Nome do jogo" value={game} onChange={(e) => setGame(e.target.value)} />
      <input className="form-control mb-2" type="text" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={handleUpload}>Enviar</button>
      <p className="text-success mt-2">{status}</p>
    </div>
  );
}
