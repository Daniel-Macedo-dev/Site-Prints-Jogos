import React from "react";

export default function Gallery({ prints, loading }) {
  if (loading) return <p>Carregando prints...</p>;

  if (!prints || prints.length === 0) return <p>Nenhum print encontrado.</p>;

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
                <small className="text-muted">
                  Enviado por: {p.user?.nome || "Desconhecido"}
                </small>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
