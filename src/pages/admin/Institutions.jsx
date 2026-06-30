import AdminLayout from "../../components/layout/AdminLayout";

const INSTITUTIONS = [
  { name: "City General Hospital",   cat: "Hospital",   loc: "Nairobi",     admin: "Dr. Jane Kamau", appts: 1248, status: "active"    },
  { name: "National Savings Bank",   cat: "Bank",       loc: "Westlands",   admin: "John Ochieng",   appts: 892,  status: "active"    },
  { name: "Huduma Centre CBD",       cat: "Government", loc: "Nairobi CBD", admin: "Sarah Mutua",    appts: 2130, status: "active"    },
  { name: "Kenyatta National Hospital",cat:"Hospital",  loc: "Upper Hill",  admin: "Prof. Kamau",    appts: 0,    status: "pending"   },
  { name: "Equity Bank Karen",       cat: "Bank",       loc: "Karen",       admin: "Lucy Wambua",    appts: 341,  status: "suspended" },
  { name: "Strathmore University",   cat: "University", loc: "Madaraka",    admin: "Dr. Otieno",     appts: 0,    status: "pending"   },
];

const CAT_COLORS = {
  Hospital:   "bg-blue-100 text-blue-700",
  Bank:       "bg-purple-100 text-purple-700",
  Government: "bg-yellow-100 text-yellow-700",
  University: "bg-green-100 text-green-700",
};

export default function AdminInstitutions() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy mb-5">Institutions</h1>

        {/* Filter bar */}
        <div className="card p-3 mb-4 flex items-center gap-3">
          <input className="input flex-1" placeholder="Search institutions..." />
          <select className="input w-32">
            {["All Status","Active","Pending","Suspended"].map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="input w-36">
            {["All Categories","Hospital","Bank","Government","University"].map(c => <option key={c}>{c}</option>)}
          </select>
          <button className="btn-primary px-5">Search</button>
          <button className="btn-secondary flex items-center gap-1.5 px-3">↓ Export</button>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Institution</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Category</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Location</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Admin</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Appointments</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {INSTITUTIONS.map((inst, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{inst.name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${CAT_COLORS[inst.cat]}`}>
                      {inst.cat}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{inst.loc}</td>
                  <td className="px-4 py-3 text-gray-600">{inst.admin}</td>
                  <td className="px-4 py-3 text-gray-600">{inst.appts.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={
                      inst.status === "active" ? "badge-approved" :
                      inst.status === "pending" ? "badge-pending" : "badge-suspended"
                    }>
                      {inst.status.charAt(0).toUpperCase() + inst.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-400 hover:text-blue-600 text-base" title="View">👁</button>
                      {inst.status === "pending" ? (
                        <>
                          <button className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded hover:bg-green-100">Approve</button>
                          <button className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded hover:bg-red-100">Reject</button>
                        </>
                      ) : (
                        <button className="text-gray-400 hover:text-yellow-500 text-base" title="Suspend">⚠</button>
                      )}
                      <button className="text-gray-400 hover:text-red-500 text-base" title="Delete">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Showing 6 of 142 institutions</span>
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
