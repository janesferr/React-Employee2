import { useEffect, useMemo, useRef, useState } from "react";
import Controls from "./components/Controls.jsx";
import EmployeeCard from "./components/EmployeeCard.jsx";
import Pagination from "./components/Pagination.jsx";
import { DEFAULT_API_URL, fetchUsers } from "./lib/api.js";
import { normalizeDummyUsers } from "./lib/normalize.js";
import { sortEmployees } from "./lib/sort.js";

export default function App() {
  const [apiUrl] = useState(DEFAULT_API_URL);

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const [pageSize, setPageSize] = useState(24);
  const [page, setPage] = useState(1);

  const abortRef = useRef(null);

  async function load() {
    setLoading(true);
    setErr("");

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const data = await fetchUsers(apiUrl, { signal: controller.signal });
      setEmployees(normalizeDummyUsers(data));
      setPage(1);
    } catch (e) {
      if (e?.name === "AbortError") return;
      setErr(`Couldn’t load employees. ${e?.message ?? e}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;

    return employees.filter((e) => {
      const hay = [
        e.name,
        e.email,
        e.phone,
        e.city,
        e.state,
        e.country,
        e.username,
        e.company,
        e.title,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [employees, query]);

  const sorted = useMemo(() => sortEmployees(filtered, sortKey, sortDir), [filtered, sortKey, sortDir]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(sorted.length / pageSize)), [sorted.length, pageSize]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const rangeLabel = useMemo(() => {
    if (sorted.length === 0) return "0 results";
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, sorted.length);
    return `${start}–${end} of ${sorted.length}`;
  }, [sorted.length, page, pageSize]);

  return (
    <div className="container">
      <header className="header card">
        <div className="headerTop">
          <div>
            <h1>Employee Directory</h1>
            <p className="muted">
              Live data from <code>dummyjson.com</code> • Search + alphabetize + pagination
            </p>
          </div>
          <div className="stats">
            <span className="pill">Loaded: {employees.length}</span>
            <span className="pill">Showing: {sorted.length}</span>
          </div>
        </div>

        <Controls
          query={query}
          setQuery={setQuery}
          sortKey={sortKey}
          setSortKey={setSortKey}
          sortDir={sortDir}
          setSortDir={setSortDir}
          pageSize={pageSize}
          setPageSize={(n) => {
            setPageSize(n);
            setPage(1);
          }}
          onRefresh={load}
          loading={loading}
        />

        <div className="muted small apiLine">
          API: <code>{apiUrl}</code>
        </div>
      </header>

      {err && <div className="error card">{err}</div>}

      <main className="grid">
        {loading && employees.length === 0 ? (
          Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="card skeleton" aria-hidden="true" />
          ))
        ) : paged.length === 0 ? (
          <div className="card empty">
            No results. Try a different search term.
          </div>
        ) : (
          paged.map((e) => <EmployeeCard key={e.id} employee={e} />)
        )}
      </main>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        rangeLabel={rangeLabel}
      />

      <footer className="footer muted small">
        Built with React + Vite • Data: DummyJSON Users
      </footer>
    </div>
  );
}


