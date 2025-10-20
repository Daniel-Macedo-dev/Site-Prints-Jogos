import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [game, setGame] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState("");

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
      const res = await axios.post("http://localhost:8080/prints/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus("Upload concluído!");
      setUrl(res.data.url);
      setFile(null);
      setGame("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setStatus("Erro ao enviar: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload de Print</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Nome do jogo"
        value={game}
        onChange={(e) => setGame(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpload}>Enviar</button>

      <p className="status">{status}</p>
      {url && (
        <p className="upload-result">
          <a href={url} target="_blank" rel="noreferrer">
            Ver print enviado
          </a>
        </p>
      )}
    </div>
  );
}
