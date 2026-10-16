
const API_URL = "http://localhost:5000/api";

export async function api(path, options = {}) {
  const { method = "GET", body, token } = options;

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
