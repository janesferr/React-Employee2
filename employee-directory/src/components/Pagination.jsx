export default function Pagination({ page, totalPages, onPrev, onNext, rangeLabel }) {
  return (
    <div className="pagination">
      <button className="btn" onClick={onPrev} disabled={page <= 1}>
        Prev
      </button>

      <div className="muted small">
        Page <b>{page}</b> / <b>{totalPages}</b> • {rangeLabel}
      </div>

      <button className="btn" onClick={onNext} disabled={page >= totalPages}>
        Next
      </button>
    </div>
  );
}
