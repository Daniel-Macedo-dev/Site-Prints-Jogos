import React, { useEffect, useState } from "react";
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
      .then((res) => setPrints(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "#fff" }}>Carregando prints...</p>;

  return (
    <div className="row">
      {prints.map((p) => (
        <div key={p.id} className="col-md-4 mb-3">
          <div className="card">
            <img src={p.url} alt={p.game} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{p.game}</h5>
              <p className="card-text">{p.description}</p>
              <p className="card-text">
                <small style={{ color: "#ffffff" }}>
                  Enviado por: {p.user?.nome || p.user || "Desconhecido"}
                </small>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
