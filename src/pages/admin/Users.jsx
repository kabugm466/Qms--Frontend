import AdminLayout from "../../components/layout/AdminLayout";

const USERS = [
  { name: "Brian Otieno",   email: "brian@gmail.com",  role: "client",           joined: "Jun 20, 2024", appts: 24, status: "active"    },
  { name: "Alice Wanjiru",  email: "alice@gmail.com",  role: "client",           joined: "Jun 18, 2024", appts: 7,  status: "active"    },
  { name: "Dr. Jane Kamau", email: "jane@cgh.co.ke",   role: "institution_admin", joined: "Jan 10, 2023", appts: 0,  status: "active"    },
  { name: "John Ochieng",   email: "john@nsb.co.ke",   role: "institution_admin", joined: "Mar 5, 2023",  appts: 0,  status: "active"    },
  { name: "Peter Kariuki",  email: "peter@gmail.com",  role: "client",           joined: "Jun 25, 2024", appts: 2,  status: "active"    },
  { name: "Mary Njeri",     email: "mary@gmail.com",   role: "client",           joined: "Jun 22, 2024", appts: 5,  status: "suspended" },
];

const ROLE_BADGE = {
  client:           "bg-green-100 text-green-800",
  institution_admin:"bg-yellow-100 text-yellow-800",
  staff:            "bg-blue-100 text-blue-800",
  admin:            "bg-navy/10 text-navy",
};

const ROLE_LABEL = {
  client: "Client",
  institution_admin: "Institution Admin",
  staff: "Staff",
  admin: "Admin",
};

export default function AdminUsers() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy mb-5">Users</h1>

        {/* KPI chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-5">
          <div className="card p-4 border-l-4 border-l-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-500">Total Users</div>
                <div className="text-2xl font-bold text-gray-900">14,820</div>
              </div>
              <span className="text-xl">👥</span>
            </div>
          </div>
          <div className="card p-4 border-l-4 border-l-green-brand">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-500">Clients</div>
                <div className="text-2xl font-bold text-gray-900">14,231</div>
              </div>
              <span className="text-xl">👤</span>
            </div>
          </div>
          <div className="card p-4 border-l-4 border-l-yellow-400">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-500">Institution Admins</div>
                <div className="text-2xl font-bold text-gray-900">589</div>
              </div>
              <span className="text-xl">🏢</span>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="card p-3 mb-4 flex items-center gap-3">
          <input className="input flex-1" placeholder="Search users..." />
          <select className="input w-36">
            {["All Roles","Client","Institution Admin","Staff","Admin"].map(r => <option key={r}>{r}</option>)}
          </select>
          <select className="input w-32">
            {["All Status","Active","Suspended","Unverified"].map(s => <option key={s}>{s}</option>)}
          </select>
          <button className="btn-primary px-5">Search</button>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Email</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Role</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Joined</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Appointments</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                  <td className="px-4 py-3 text-gray-500">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${ROLE_BADGE[u.role]}`}>
                      {ROLE_LABEL[u.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{u.joined}</td>
                  <td className="px-4 py-3 text-gray-600">{u.appts}</td>
                  <td className="px-4 py-3">
                    <span className={u.status === "active" ? "badge-active" : "badge-suspended"}>
                      {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-400 hover:text-blue-600" title="View">👁</button>
                      <button className="text-gray-400 hover:text-yellow-500" title="Suspend">⚠</button>
                      <button className="text-gray-400 hover:text-red-500" title="Delete">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Showing 6 of 14,820 users</span>
            <div className="flex gap-2">
              <button className="btn-secondary text-xs px-3 py-1.5">← Prev</button>
              <button className="btn-secondary text-xs px-3 py-1.5">Next →</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
