const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const authApi = {
  register: (name, email, password) => request("/auth/register", { method: "POST", body: { name, email, password } }),
  login: (email, password) => request("/auth/login", { method: "POST", body: { email, password } }),
  me: (token) => request("/auth/me", { token }),
  updateMe: (token, patch) => request("/auth/me", { method: "PATCH", body: patch, token }),
};

export const notesApi = {
  list: (token) => request("/notes", { token }),
  get: (token, id) => request(`/notes/${id}`, { token }),
  create: (token, note) => request("/notes", { method: "POST", body: note, token }),
  update: (token, id, patch) => request(`/notes/${id}`, { method: "PATCH", body: patch, token }),
  remove: (token, id) => request(`/notes/${id}`, { method: "DELETE", token }),
};

export const aiApi = {
  summarize: (token, content) => request("/ai/summarize", { method: "POST", body: { content }, token }),
  rewrite: (token, content, instruction) => request("/ai/rewrite", { method: "POST", body: { content, instruction }, token }),
  grammar: (token, content) => request("/ai/grammar", { method: "POST", body: { content }, token }),
  explain: (token, content) => request("/ai/explain", { method: "POST", body: { content }, token }),
  quiz: (token, content) => request("/ai/quiz", { method: "POST", body: { content }, token }),
  chat: (token, message, history) => request("/ai/chat", { method: "POST", body: { message, history }, token }),
};
