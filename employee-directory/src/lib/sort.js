export function sortEmployees(list, sortKey, sortDir) {
  const dir = sortDir === "asc" ? 1 : -1;

  const getVal = (e) => {
    if (sortKey === "name") return e.name ?? "";
    if (sortKey === "email") return e.email ?? "";
    if (sortKey === "country") return e.country ?? "";
    if (sortKey === "age") return e.age ?? 0;
    return e.name ?? "";
  };

  return [...list].sort((a, b) => {
    const av = getVal(a);
    const bv = getVal(b);

    if (sortKey === "age") return dir * (Number(av) - Number(bv));
    return dir * String(av).toLowerCase().localeCompare(String(bv).toLowerCase());
  });
}
