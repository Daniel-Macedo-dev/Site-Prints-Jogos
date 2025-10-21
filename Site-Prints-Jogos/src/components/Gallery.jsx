import { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [prints, setPrints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrints = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8080/prints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrints(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrints();
  }, []);

  if (loading) return <p className="text-center mt-3">Carregando prints...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Galeria de Prints</h2>
      {prints.length === 0 ? (
        <p className="text-center">Nenhum print encontrado.</p>
      ) : (
        <div className="row">
          {prints.map((p) => (
            <div key={p.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <img src={p.url} className="card-img-top" alt={p.game} />
                <div className="card-body">
                  <h5 className="card-title">{p.game}</h5>
                  <p className="card-text">{p.description}</p>
                  <small className="text-muted">Enviado por: {p.user?.nome || "Desconhecido"}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
