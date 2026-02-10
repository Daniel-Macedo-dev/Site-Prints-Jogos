import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { mockPrints } from "../mockData";

const API_BASE =
  (import.meta.env?.VITE_API_URL?.toString() || "http://localhost:8080").replace(/\/$/, "");

export default function Gallery() {
  const [prints, setPrints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const shouldUseMock = useMemo(() => {
    return import.meta.env.PROD;
  }, []);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);

      if (shouldUseMock) {
        if (alive) {
          setPrints(mockPrints);
          setLoading(false);
        }
        return;
      }

      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`${API_BASE}/prints`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (alive) setPrints(res.data);
      } catch {
        if (alive) setPrints(mockPrints);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, [shouldUseMock]);

  if (loading) return <p>Carregando prints...</p>;

  return (
    <>
      <div className="row">
        {prints.map(p => (
          <div key={p.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="card shadow-sm">
              <img
                src={p.url}
                className="card-img-top"
                alt={p.game}
                style={{ height: 180, objectFit: "cover", cursor: "pointer" }}
                onClick={() => setSelected({ url: p.url, game: p.game })}
              />
              <div className="card-body">
                <h5 className="card-title">{p.game}</h5>
                <p className="card-text">{p.description}</p>
                <small>Enviado por: {p.username || "Desconhecido"}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-body p-0">
                <img src={selected.url} alt={selected.game} className="img-fluid rounded" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
