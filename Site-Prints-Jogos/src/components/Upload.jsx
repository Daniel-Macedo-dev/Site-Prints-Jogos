import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [game, setGame] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [printInfo, setPrintInfo] = useState(null);

  const handleUpload = async () => {
    if (!file) return setStatus("Selecione um arquivo");
    if (!game) return setStatus("Informe o nome do jogo");

    const token = localStorage.getItem("token");
    if (!token) return setStatus("Faça login primeiro");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("game", game);
    formData.append("description", description);

    try {
      setStatus("Enviando...");
      const res = await axios.post("http://localhost:8080/prints/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrintInfo(res.data);
      setStatus("Upload concluído!");
      setFile(null);
      setGame("");
      setDescription("");
    } catch (err) {
      setStatus("Erro: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="p-4 bg-dark text-white rounded shadow">
      <h3>Upload de Print</h3>
      <input type="file" className="form-control mb-2" onChange={e => setFile(e.target.files[0])} />
      <input type="text" placeholder="Nome do jogo" className="form-control mb-2" value={game} onChange={e => setGame(e.target.value)} />
      <input type="text" placeholder="Descrição" className="form-control mb-2" value={description} onChange={e => setDescription(e.target.value)} />
      <button className="btn btn-outline-light w-100" onClick={handleUpload}>Enviar</button>
      <p className="mt-2">{status}</p>

      {printInfo && (
        <div className="mt-3 p-2 bg-secondary bg-opacity-25 rounded">
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
