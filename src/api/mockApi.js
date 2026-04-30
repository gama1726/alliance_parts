const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8080/api";

async function request(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const text = await res.text();
      if (text) message = text;
    } catch {
      // ignore parsing issues and keep status message
    }
    throw new Error(message);
  }
  return res.json();
}

export async function fetchProductById(id) {
  return request(`/products/${encodeURIComponent(id)}`);
}

export async function fetchGarageCars() {
  return request("/garage");
}

/**
 * Unified DTO for search page.
 * @returns {{
 *   query: string,
 *   type: string,
 *   status: "ok" | "empty" | "error",
 *   vehicle: object | null,
 *   product: object | null,
 *   hint: { kind: string, title: string, text: string },
 *   sidebar: { garageCars: Array, catalogGroups: Array }
 * }}
 */
export async function searchCatalog(query) {
  const cleanQuery = String(query || "").trim();
  return request(`/search?q=${encodeURIComponent(cleanQuery)}`);
}
