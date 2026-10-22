import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  LayoutDashboard,
  BriefcaseBusiness,
  MapPin,
  X,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Menu,
  UserRound,
  Filter,
} from "lucide-react";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./api";

const emptyForm = { emp_id: "", name: "", age: "", role: "", address: "" };

function getErrorMessage(error) {
  return (
    error?.response?.data?.error ||
    error?.response?.data?.err ||
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Check that your backend is running."
  );
}

function normalizeEmployees(payload) {
  const body = payload?.data;
  if (Array.isArray(body)) return body;
  if (Array.isArray(body?.data)) return body.data;
  if (Array.isArray(body?.result)) return body.result;
  if (Array.isArray(payload?.result)) return payload.result;
  return [];
}

function initials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0] || "")
      .join("")
      .toUpperCase() || "EM"
  );
}

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getEmployees();
      setEmployees(normalizeEmployees(response.data));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);

  const roles = useMemo(() => {
    return [
      ...new Set(employees.map((employee) => employee.role).filter(Boolean)),
    ].sort();
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const text = query.trim().toLowerCase();
    return employees.filter((employee) => {
      const matchesText =
        !text ||
        [employee.name, employee.emp_id, employee.role, employee.address].some(
          (value) =>
            String(value ?? "")
              .toLowerCase()
              .includes(text),
        );
      const matchesRole = roleFilter === "all" || employee.role === roleFilter;
      return matchesText && matchesRole;
    });
  }, [employees, query, roleFilter]);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(employee) {
    setEditing(employee);
    setForm({
      emp_id: employee.emp_id ?? "",
      name: employee.name ?? "",
      age: employee.age ?? "",
      role: employee.role ?? "",
      address: employee.address ?? employee.addrest ?? "",
    });
    setModalOpen(true);
  }

  function changeField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const data = {
      emp_id: Number(form.emp_id),
      name: form.name.trim(),
      age: Number(form.age),
      role: form.role.trim(),
      address: form.address.trim(),
    };

    try {
      if (editing?._id) {
        await updateEmployee(editing._id, data);
        setNotice("Employee updated successfully.");
      } else {
        await addEmployee(data);
        setNotice("Employee added successfully.");
      }
      setModalOpen(false);
      setForm(emptyForm);
      await loadEmployees();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(employee) {
    if (!employee?._id) {
      setError(
        "This employee has no MongoDB _id, so it cannot be deleted from this row.",
      );
      return;
    }
    const confirmed = window.confirm(
      `Delete ${employee.name || "this employee"}? This cannot be undone.`,
    );
    if (!confirmed) return;
    setError("");
    try {
      await deleteEmployee(employee._id);
      setNotice("Employee deleted successfully.");
      await loadEmployees();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <Users size={22} />
          </div>
          <div>
            <strong>EmployeeHub</strong>
            <span>Management portal</span>
          </div>
          <button
            className="icon-button mobile-close"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
        <div className="nav-label">WORKSPACE</div>
        <button
          className="nav-item active"
          onClick={() => setSidebarOpen(false)}
        >
          <LayoutDashboard size={18} /> Dashboard
        </button>
        <button className="nav-item" onClick={openAdd}>
          <UserPlus size={18} /> Add employee
        </button>
        <div className="sidebar-bottom">
          <div className="profile-avatar">IP</div>
          <div className="profile-copy">
            <strong>Admin</strong>
            <span>Employee manager</span>
          </div>
          <span className="online-dot" title="Local app" />
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="main-area">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>Dashboard</strong>
          </div>
          <div className="topbar-right">
            <span className="status-dot" /> API connection
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">OVERVIEW</p>
              <h1>Employee dashboard</h1>
              <p className="subtitle">
                Manage your team, employee details, and records in one place.
              </p>
            </div>
            <button className="primary-button" onClick={openAdd}>
              <UserPlus size={17} /> Add employee
            </button>
          </section>

          {notice && (
            <div className="notice success">
              <CheckCircle2 size={18} /> {notice}
            </div>
          )}
          {error && (
            <div className="notice error">
              <AlertCircle size={18} />
              <span>{error}</span>
              <button
                className="notice-close"
                onClick={() => setError("")}
                aria-label="Dismiss error"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon purple">
                <Users size={20} />
              </div>
              <div>
                <span className="stat-label">Total employees</span>
                <strong className="stat-value">{employees.length}</strong>
                <span className="stat-foot">Records in database</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">
                <BriefcaseBusiness size={20} />
              </div>
              <div>
                <span className="stat-label">Roles represented</span>
                <strong className="stat-value">{roles.length}</strong>
                <span className="stat-foot">Unique job roles</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">
                <UserRound size={20} />
              </div>
              <div>
                <span className="stat-label">Matching employees</span>
                <strong className="stat-value">
                  {filteredEmployees.length}
                </strong>
                <span className="stat-foot">Based on current filters</span>
              </div>
            </div>
          </section>

          <section className="table-card">
            <div className="table-heading">
              <div>
                <h2>All employees</h2>
                <p>View and manage employee records</p>
              </div>
              <button
                className="secondary-button"
                onClick={loadEmployees}
                disabled={loading}
              >
                <RefreshCw size={15} className={loading ? "spin" : ""} />{" "}
                Refresh
              </button>
            </div>
            <div className="toolbar">
              <label className="search-box">
                <Search size={17} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search name, ID, role or address..."
                />
                {query && (
                  <button
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                  >
                    <X size={15} />
                  </button>
                )}
              </label>
              <label className="filter-box">
                <Filter size={16} />
                <select
                  value={roleFilter}
                  onChange={(event) => setRoleFilter(event.target.value)}
                >
                  <option value="all">All roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>EMPLOYEE</th>
                    <th>EMPLOYEE ID</th>
                    <th>AGE</th>
                    <th>ROLE</th>
                    <th>ADDRESS</th>
                    <th className="actions-heading">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6">
                        <div className="empty-state">
                          <RefreshCw size={22} className="spin" />
                          <strong>Loading employees...</strong>
                          <span>Connecting to your backend</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan="6">
                        <div className="empty-state">
                          <Users size={28} />
                          <strong>
                            {employees.length
                              ? "No matching employees"
                              : "No employees yet"}
                          </strong>
                          <span>
                            {employees.length
                              ? "Try another search or filter."
                              : "Add your first employee to get started."}
                          </span>
                          {!employees.length && (
                            <button
                              className="primary-button small"
                              onClick={openAdd}
                            >
                              <UserPlus size={15} /> Add employee
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((employee) => (
                      <tr key={employee._id || employee.emp_id}>
                        <td>
                          <div className="employee-cell">
                            <div className="employee-avatar">
                              {initials(employee.name)}
                            </div>
                            <div>
                              <strong>{employee.name || "Unnamed"}</strong>
                              <span>{employee.email || "Employee record"}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="id-pill">
                            {employee.emp_id ?? "—"}
                          </span>
                        </td>
                        <td>{employee.age ?? "—"}</td>
                        <td>
                          <span className="role-pill">
                            {employee.role || "Unassigned"}
                          </span>
                        </td>
                        <td>
                          <span className="address-cell">
                            <MapPin size={14} />{" "}
                            {employee.address || employee.addrest || "—"}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-button edit"
                              title="Edit employee"
                              aria-label={`Edit ${employee.name}`}
                              onClick={() => openEdit(employee)}
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className="action-button delete"
                              title="Delete employee"
                              aria-label={`Delete ${employee.name}`}
                              onClick={() => handleDelete(employee)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <span>
                Showing <strong>{filteredEmployees.length}</strong> of{" "}
                <strong>{employees.length}</strong> employees
              </span>
              <span className="footer-secure">
                <span className="status-dot" /> Connected to local API
              </span>
            </div>
          </section>
          <footer className="footer">
            EmployeeHub <span>•</span> Employee Management System
          </footer>
        </div>
      </main>

      {modalOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false);
          }}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="employee-modal-title"
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">
                  {editing ? "UPDATE RECORD" : "NEW RECORD"}
                </p>
                <h2 id="employee-modal-title">
                  {editing ? "Edit employee" : "Add employee"}
                </h2>
                <p>Enter the employee details below.</p>
              </div>
              <button
                className="icon-button"
                onClick={() => setModalOpen(false)}
                aria-label="Close form"
              >
                <X size={19} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Employee ID
                  <input
                    name="emp_id"
                    type="number"
                    min="1"
                    value={form.emp_id}
                    onChange={changeField}
                    placeholder="e.g. 23"
                    required
                  />
                </label>
                <label>
                  Full name
                  <input
                    name="name"
                    value={form.name}
                    onChange={changeField}
                    placeholder="e.g. Isha Patel"
                    required
                  />
                </label>
                <label>
                  Age
                  <input
                    name="age"
                    type="number"
                    min="1"
                    max="120"
                    value={form.age}
                    onChange={changeField}
                    placeholder="e.g. 19"
                    required
                  />
                </label>
                <label>
                  Role
                  <input
                    name="role"
                    value={form.role}
                    onChange={changeField}
                    placeholder="e.g. Developer"
                    required
                  />
                </label>
                <label className="full-width">
                  Address
                  <input
                    name="address"
                    value={form.address}
                    onChange={changeField}
                    placeholder="e.g. Udhna, Surat"
                    required
                  />
                </label>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="primary-button"
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editing
                      ? "Save changes"
                      : "Add employee"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
