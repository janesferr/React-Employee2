export function normalizeDummyUsers(data) {
  const list = data?.users ?? [];
  return list.map((u) => ({
    id: String(u.id),
    name: `${u.firstName} ${u.lastName}`,
    firstName: u.firstName ?? "",
    lastName: u.lastName ?? "",
    email: u.email ?? "",
    phone: u.phone ?? "",
    age: typeof u.age === "number" ? u.age : null,
    country: u.address?.country ?? "",
    city: u.address?.city ?? "",
    state: u.address?.state ?? "",
    avatar: u.image ?? "",
    username: u.username ?? "",
    company: u.company?.name ?? "",
    title: u.company?.title ?? "",
  }));
}
