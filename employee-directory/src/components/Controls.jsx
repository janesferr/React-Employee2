export default function Controls({
  query,
  setQuery,
  sortKey,
  setSortKey,
  sortDir,
  setSortDir,
  pageSize,
  setPageSize,
  onRefresh,
  loading,
}) {
  return (
    <div className="controls">
      <input
        className="input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search name, email, phone, city, state, country…"
        aria-label="Search employees"
      />

      <select className="select" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
        <option value="name">Sort: Name</option>
        <option value="email">Sort: Email</option>
        <option value="country">Sort: Country</option>
        <option value="age">Sort: Age</option>
      </select>

      <select className="select" value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
        <option value="asc">A → Z</option>
        <option value="desc">Z → A</option>
      </select>

      <select className="select" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
        <option value={12}>12 / page</option>
        <option value={24}>24 / page</option>
        <option value={48}>48 / page</option>
      </select>

      <button className="btn" onClick={onRefresh} disabled={loading}>
        {loading ? "Loading…" : "Refresh"}
      </button>
    </div>
  );
}
