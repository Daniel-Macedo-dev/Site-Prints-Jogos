import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { mockPrints } from "../mockData";

const API_BASE =
  (import.meta.env?.VITE_API_URL?.toString() || "http://localhost:8080").replace(/\/$/, "");

function safeLower(v) {
  return (v ?? "").toString().trim().toLowerCase();
}

function parseDateMaybe(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

export default function Gallery() {
  const [prints, setPrints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  // Controls
  const [search, setSearch] = useState("");
  const [game, setGame] = useState("all");
  const [user, setUser] = useState("all");
  const [sort, setSort] = useState("new"); // new | old | az | za

  // PROD (S3/GH Pages) por padrão usa mock.
  const shouldUseMock = useMemo(() => import.meta.env.PROD, []);

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
        if (alive) setPrints(Array.isArray(res.data) ? res.data : []);
      } catch {
        if (alive) setPrints(mockPrints);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [shouldUseMock]);

  // ESC fecha modal
  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const games = useMemo(() => {
    const set = new Set();
    for (const p of prints) {
      const g = (p?.game ?? "").toString().trim();
      if (g) set.add(g);
    }
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [prints]);

  const users = useMemo(() => {
    const set = new Set();
    for (const p of prints) {
      const u = (p?.username ?? "").toString().trim();
      if (u) set.add(u);
    }
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [prints]);

  const filtered = useMemo(() => {
    const q = safeLower(search);

    let list = prints.filter((p) => {
      if (!p) return false;

      const g = (p.game ?? "").toString();
      const u = (p.username ?? "").toString();
      const d = (p.description ?? "").toString();

      if (game !== "all" && g !== game) return false;
      if (user !== "all" && u !== user) return false;

      if (!q) return true;

      const hay = `${g} ${u} ${d}`.toLowerCase();
      return hay.includes(q);
    });

    list = [...list].sort((a, b) => {
      if (sort === "az") return safeLower(a.game).localeCompare(safeLower(b.game));
      if (sort === "za") return safeLower(b.game).localeCompare(safeLower(a.game));

      // new/old: tenta uploadDate, senão usa id (maior = mais novo)
      const ad = parseDateMaybe(a.uploadDate);
      const bd = parseDateMaybe(b.uploadDate);

      const at = ad ? ad.getTime() : typeof a.id === "number" ? a.id : 0;
      const bt = bd ? bd.getTime() : typeof b.id === "number" ? b.id : 0;

      return sort === "old" ? at - bt : bt - at;
    });

    return list;
  }, [prints, search, game, user, sort]);

  const clearFilters = () => {
    setSearch("");
    setGame("all");
    setUser("all");
    setSort("new");
  };

  return (
    <>
      {/* Controls */}
      <div className="gallery-controls mb-3">
        <div className="controls-row">
          <input
            className="form-control"
            placeholder="Buscar por jogo, descrição ou usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="form-control" value={game} onChange={(e) => setGame(e.target.value)}>
            {games.map((g) => (
              <option key={g} value={g}>
                {g === "all" ? "Todos os jogos" : g}
              </option>
            ))}
          </select>

          <select className="form-control" value={user} onChange={(e) => setUser(e.target.value)}>
            {users.map((u) => (
              <option key={u} value={u}>
                {u === "all" ? "Todos os usuários" : u}
              </option>
            ))}
          </select>

          <select className="form-control" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="new">Mais recentes</option>
            <option value="old">Mais antigos</option>
            <option value="az">Jogo (A → Z)</option>
            <option value="za">Jogo (Z → A)</option>
          </select>

          <button className="btn btn-outline-light" onClick={clearFilters} type="button">
            Limpar
          </button>
        </div>

        <div className="controls-meta text-muted">
          {loading ? "Carregando..." : `${filtered.length} print(s)`}
        </div>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="row">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="card shadow-sm">
                <div className="skeleton skeleton-img" />
                <div className="card-body">
                  <div className="skeleton skeleton-line" />
                  <div className="skeleton skeleton-line short" />
                  <div className="skeleton skeleton-line tiny" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <p className="mb-2">Nenhum print encontrado com os filtros atuais.</p>
          <button className="btn btn-outline-light" onClick={clearFilters} type="button">
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="row">
          {filtered.map((p) => (
            <div key={p.id ?? `${p.game}-${p.url}`} className="col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="card shadow-sm">
                <img
                  src={p.url}
                  className="card-img-top"
                  alt={p.game}
                  style={{ height: 180, objectFit: "cover", cursor: "pointer" }}
                  onClick={() =>
                    setSelected({
                      url: p.url,
                      game: p.game,
                      description: p.description,
                      username: p.username,
                      uploadDate: p.uploadDate,
                    })
                  }
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
      )}

      {/* Modal */}
      {selected && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header modal-header-custom">
                <div className="modal-title-wrap">
                  <div className="modal-title-text">{selected.game}</div>
                  <div className="modal-subtitle text-muted">
                    {selected.username ? `por ${selected.username}` : "usuário desconhecido"}
                    {selected.uploadDate ? ` • ${new Date(selected.uploadDate).toLocaleString()}` : ""}
                  </div>
                </div>

                <div className="modal-actions">
                  <a
                    className="btn btn-outline-light"
                    href={selected.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir
                  </a>
                  <button className="btn btn-outline-light" onClick={() => setSelected(null)} type="button">
                    Fechar
                  </button>
                </div>
              </div>

              <div className="modal-body p-0">
                <img src={selected.url} alt={selected.game} className="img-fluid rounded" />
                {selected.description ? <div className="modal-desc">{selected.description}</div> : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
