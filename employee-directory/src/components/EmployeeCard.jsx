export default function EmployeeCard({ employee }) {
  return (
    <article className="card">
      <div className="row">
        <img className="avatar" src={employee.avatar} alt={employee.name} loading="lazy" />
        <div className="grow">
          <div className="name">{employee.name}</div>
          <div className="muted truncate">{employee.email}</div>
        </div>
      </div>

      <div className="pills">
        {employee.country && <span className="pill">{employee.country}</span>}
        {employee.city && <span className="pill">{employee.city}</span>}
        {employee.age != null && <span className="pill">{employee.age} yrs</span>}
        {employee.username && <span className="pill">@{employee.username}</span>}
      </div>

      <div className="meta">
        <div className="muted small">
          {employee.company ? `${employee.company}${employee.title ? " • " + employee.title : ""}` : ""}
        </div>
        <div className="actions">
          <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(employee.email)}>
            Copy email
          </button>
          <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(employee.phone)}>
            Copy phone
          </button>
        </div>
      </div>
    </article>
  );
}
