import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/employee",
  headers: { "Content-Type": "application/json" },
});

export const getEmployees = () => api.get("/");
export const addEmployee = (data) => api.post("/", data);
export const updateEmployee = (id, data) => api.put(`/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/${id}`);
export const searchEmployeeByName = (name) =>
  api.get(`/name/${encodeURIComponent(name)}`);
export const searchEmployeeByRole = (role) =>
  api.get(`/role/${encodeURIComponent(role)}`);

export default api;
