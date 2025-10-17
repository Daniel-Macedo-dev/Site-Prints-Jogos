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

    const token = localStorage.getItem("token"); // JWT armazenado após login

    try {
      setStatus("Enviando...");
      const res = await axios.post(
        "http://localhost:8080/prints/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus("Upload feito!");
      setUrl(res.data.url); // url retornada pelo back-end
    } catch (err) {
      setStatus("Erro ao enviar: " + (err.response?.data || err.message));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload de Print</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <input
        type="text"
        placeholder="Nome do jogo"
        value={game}
        onChange={(e) => setGame(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button onClick={handleUpload}>Enviar</button>
      <p>{status}</p>
      {url && (
        <p>
          Arquivo enviado: <a href={url} target="_blank">{url}</a>
        </p>
      )}
    </div>
  );
}
