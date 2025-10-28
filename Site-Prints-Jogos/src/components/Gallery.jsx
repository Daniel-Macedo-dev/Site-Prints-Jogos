import { useEffect, useState } from "react";
import axios from "axios";
import { mockPrints } from "../mockData";

export default function Gallery() {
  const [prints, setPrints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const useMock = window.location.hostname !== "localhost";

  useEffect(() => {
    if (useMock) {
      setPrints(mockPrints);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/prints", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setPrints(res.data))
      .finally(() => setLoading(false));
  }, [useMock]);

  if (loading) return <p>Carregando prints...</p>;

  return (
    <>
      <div className="row">
        {prints.map(p => (
          <div key={p.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="card bg-dark text-white shadow-sm">
              <img
                src={p.url}
                className="card-img-top"
                alt={p.game}
                style={{ height: '180px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => setSelectedImage(p.url)}
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

      {selectedImage && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-0">
              <div className="modal-body p-0">
                <img src={selectedImage} alt="print" className="img-fluid rounded" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
