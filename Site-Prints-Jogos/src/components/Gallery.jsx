import { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [prints, setPrints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/prints", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPrints(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando prints...</p>;

  return (
    <div className="gallery-container">
      <h2>Galeria de Prints</h2>
      {prints.length === 0 ? (
        <p>Nenhum print encontrado.</p>
      ) : (
        <div className="grid">
          {prints.map((p) => (
            <div key={p.id} className="card">
              <img src={p.url} alt={p.game} />
              <div className="info">
                <h3>{p.game}</h3>
                <p>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
