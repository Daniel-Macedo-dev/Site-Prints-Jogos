export const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");

export function getApiErrorMessage(error) {
  const status = error.response?.status;
  const backendMessage = error.response?.data?.message;
  if (status === 401) return backendMessage || "Sessão expirada ou inválida. Faça login novamente.";
  if (status === 403) return backendMessage || "Você não tem permissão para realizar esta ação.";
  if (status === 413) return "Arquivo muito grande. O limite é de 10 MB.";
  if (status === 500) return "Erro interno no servidor. Tente novamente mais tarde.";
  return backendMessage || error.message;
}
