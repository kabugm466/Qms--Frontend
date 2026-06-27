import InstitutionLayout from "../../components/layout/InstitutionLayout";

const kpis = [
  { label: "Total Appointments", value: "148", sub: "This month",      icon: "📅", border: "border-l-blue-500" },
  { label: "Pending Review",     value: "12",  sub: "Action required", icon: "⏰", border: "border-l-yellow-400" },
  { label: "Approved Today",     value: "34",  sub: "Jun 26, 2024",    icon: "✅", border: "border-l-green-brand" },
  { label: "Active Queue",       value: "7",   sub: "Currently serving",icon: "≋", border: "border-l-purple-400" },
];

const recentRequests = [
  { name: "Alice Wanjiru",  service: "General Consultation", date: "Jun 28, 9:00 AM",  status: "pending"  },
  { name: "James Mwangi",  service: "Lab Test",              date: "Jun 28, 11:00 AM", status: "pending"  },
  { name: "Grace Akinyi",  service: "Specialist Referral",   date: "Jun 29, 2:00 PM",  status: "approved" },
  { name: "Tom Kariuki",   service: "Radiology",             date: "Jun 30, 10:00 AM", status: "rejected" },
];

const queueStatus = [
  { service: "General Consultation", serving: 3, waiting: 7, pct: 70 },
  { service: "Lab Test",             serving: 1, waiting: 4, pct: 45 },
  { service: "Pharmacy Collection",  serving: 2, waiting: 2, pct: 30 },
];

const topServices = [
  { name: "General Consultation", count: 42 },
  { name: "Lab Test",             count: 28 },
  { name: "Radiology",            count: 15 },
];

function StatusBadge({ status }) {
  const map = {
    pending:  "badge-pending",
    approved: "badge-approved",
    rejected: "badge-rejected",
  };
  return <span className={map[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

export default function InstitutionOverview() {
  return (
    <InstitutionLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy mb-4">Overview</h1>

        {/* Banner */}
        <div className="bg-navy rounded-xl p-4 flex items-center justify-between mb-6">
          <div>
            <div className="text-white font-semibold text-base">City General Hospital</div>
            <div className="text-blue-200 text-sm mt-0.5">12 pending appointments require your review today.</div>
          </div>
          <button className="btn-primary text-sm px-4 py-2">Review Appointments</button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {kpis.map((k) => (
            <div key={k.label} className={`card p-4 border-l-4 ${k.border}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{k.label}</div>
                  <div className="text-2xl font-bold text-gray-900">{k.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{k.sub}</div>
                </div>
                <span className="text-lg">{k.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Recent appointment requests */}
          <div className="col-span-2 card p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800 text-sm">Recent Appointment Requests</h2>
              <button className="text-green-brand text-xs hover:underline">View all →</button>
            </div>
            <div className="space-y-3">
              {recentRequests.map((r) => (
                <div key={r.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.service} · {r.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={r.status} />
                    {r.status === "pending" && (
                      <>
                        <button className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded hover:bg-green-100">Approve</button>
                        <button className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded hover:bg-red-100">Reject</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Today's Queue Status */}
            <div className="card p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Today's Queue Status</h2>
              <div className="space-y-3">
                {queueStatus.map((q) => (
                  <div key={q.service}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-gray-700">{q.service}</span>
                      <span className="text-gray-500">{q.waiting} waiting</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-green-brand h-1.5 rounded-full" style={{ width: `${q.pct}%` }} />
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Serving {q.serving}</div>
                  </div>
                ))}
              </div>
              <button className="text-green-brand text-xs mt-3 hover:underline">Manage queue →</button>
            </div>

            {/* Top Services */}
            <div className="card p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Top Services Today</h2>
              <div className="space-y-2">
                {topServices.map((s) => (
                  <div key={s.name} className="flex justify-between text-sm">
                    <span className="text-gray-600 text-xs">{s.name}</span>
                    <span className="font-semibold text-navy text-xs">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </InstitutionLayout>
  );
}
