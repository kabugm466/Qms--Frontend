import AdminLayout from "../../components/layout/AdminLayout";

const kpis = [
  { label: "Total Institutions", value: "142",        sub: "+8 this month",    icon: "🏢", border: "border-l-blue-500" },
  { label: "Total Users",        value: "14,820",     sub: "+320 this week",   icon: "👥", border: "border-l-green-brand" },
  { label: "Appointments Today", value: "2,341",      sub: "Across all institutions", icon: "📅", border: "border-l-yellow-400" },
  { label: "Platform Revenue",   value: "KES 284K",   sub: "This month",       icon: "↗", border: "border-l-purple-400" },
];

const recentRegistrations = [
  { name: "Kenyatta National Hospital", type: "Hospital",   loc: "Upper Hill", date: "Jun 25, 2024", status: "pending"  },
  { name: "Co-operative Bank Mombasa",  type: "Bank",       loc: "Mombasa CBD",date: "Jun 24, 2024", status: "approved" },
  { name: "NTSA Office Kisumu",         type: "Government", loc: "Kisumu",     date: "Jun 23, 2024", status: "approved" },
  { name: "Strathmore University",      type: "University", loc: "Madaraka",   date: "Jun 22, 2024", status: "pending"  },
];

const byCategory = [
  { cat: "Hospital",   count: 52, pct: 90 },
  { cat: "Bank",       count: 38, pct: 65 },
  { cat: "Government", count: 31, pct: 54 },
  { cat: "University", count: 21, pct: 36 },
];

const health = [
  { label: "API Uptime",      value: "99.9%",    color: "text-green-600" },
  { label: "Avg Response",    value: "142ms",    color: "text-green-600" },
  { label: "Active Sessions", value: "1,203",    color: "text-blue-600" },
  { label: "Queue Jobs",      value: "48 pending", color: "text-yellow-600" },
];

export default function AdminOverview() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy mb-5">Platform Overview</h1>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          {kpis.map((k) => (
            <div key={k.label} className={`card p-4 border-l-4 ${k.border}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{k.label}</div>
                  <div className="text-2xl font-bold text-gray-900">{k.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{k.sub}</div>
                </div>
                <span className="text-xl">{k.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent registrations */}
          <div className="lg:col-span-2 card p-4">
            <h2 className="font-semibold text-gray-800 text-sm mb-4">Recent Institution Registrations</h2>
            <div className="space-y-3">
              {recentRegistrations.map((r) => (
                <div key={r.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.type} · {r.loc} · Registered {r.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.status === "pending" ? (
                      <>
                        <span className="badge-pending">Pending</span>
                        <button className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded hover:bg-green-100">Approve</button>
                        <button className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded hover:bg-red-100">Reject</button>
                      </>
                    ) : (
                      <span className="badge-approved">Approved</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: by category + health */}
          <div className="space-y-4">
            <div className="card p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Institutions by Category</h2>
              <div className="space-y-2.5">
                {byCategory.map((b) => (
                  <div key={b.cat}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">{b.cat}</span>
                      <span className="font-semibold text-navy">{b.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-navy h-1.5 rounded-full" style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">System Health</h2>
              <div className="space-y-2">
                {health.map((h) => (
                  <div key={h.label} className="flex justify-between text-xs">
                    <span className="text-gray-500">{h.label}</span>
                    <span className={`font-semibold ${h.color}`}>{h.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
