export const DEFAULT_API_URL = "https://dummyjson.com/users?limit=100";

export async function fetchUsers(apiUrl, { signal } = {}) {
  const res = await fetch(apiUrl, {
    signal,
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} ${text.slice(0, 120)}`);
  }

  return res.json();
}
