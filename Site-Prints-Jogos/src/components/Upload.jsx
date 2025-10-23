import React, { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [game, setGame] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [printInfo, setPrintInfo] = useState(null);

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
    if (!token) {
      setStatus("Token não encontrado. Faça login novamente.");
      return;
    }

    try {
      setStatus("Enviando...");
      const res = await axios.post(
        "http://localhost:8080/prints/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      setStatus("Upload concluído!");
      setPrintInfo(res.data);
      setFile(null);
      setGame("");
      setDescription("");
    } catch (err) {
      setStatus("Erro ao enviar: " + (err.response?.data || err.message));
      console.error(err.response || err);
    }
  };

  return (
    <div className="mb-4">
      <h2>Upload de Print</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control mb-2" />
      <input
        type="text"
        placeholder="Nome do jogo"
        value={game}
        onChange={(e) => setGame(e.target.value)}
        className="form-control mb-2"
      />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-control mb-2"
      />
      <button onClick={handleUpload} className="btn btn-primary">Enviar</button>
      <p className="mt-2">{status}</p>

      {printInfo && (
        <div className="mt-2">
          <p><strong>Jogo:</strong> {printInfo.game}</p>
          <p><strong>Descrição:</strong> {printInfo.description}</p>
          <p><strong>Enviado por:</strong> {printInfo.userName}</p>
          <p><strong>Data:</strong> {new Date(printInfo.uploadDate).toLocaleString()}</p>
          <a href={printInfo.url} target="_blank" rel="noreferrer">Ver print</a>
        </div>
      )}
    </div>
  );
}
