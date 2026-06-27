import { useState } from "react";
import InstitutionLayout from "../../components/layout/InstitutionLayout";

const APPOINTMENTS = [
  { name: "Alice Wanjiru",  phone: "+254 712 111 222", service: "General Consultation", date: "Jun 28, 9:00 AM",  bookedOn: "Jun 24", status: "pending"  },
  { name: "James Mwangi",  phone: "+254 700 333 444", service: "Lab Test",              date: "Jun 28, 11:00 AM", bookedOn: "Jun 24", status: "pending"  },
  { name: "Grace Akinyi",  phone: "+254 722 555 666", service: "Specialist Referral",   date: "Jun 29, 2:00 PM",  bookedOn: "Jun 23", status: "approved" },
  { name: "Tom Kariuki",   phone: "+254 733 777 888", service: "Radiology",             date: "Jun 30, 10:00 AM", bookedOn: "Jun 23", status: "rejected" },
  { name: "Mary Njeri",    phone: "+254 711 999 000", service: "Pharmacy Collection",   date: "Jul 1, 8:30 AM",   bookedOn: "Jun 22", status: "approved" },
  { name: "Peter Otieno",  phone: "+254 720 111 333", service: "General Consultation",  date: "Jul 1, 3:00 PM",   bookedOn: "Jun 22", status: "pending"  },
];

function StatusBadge({ status }) {
  const map = {
    pending:  "badge-pending",
    approved: "badge-approved",
    rejected: "badge-rejected",
    cancelled:"badge-cancelled",
    completed:"badge-completed",
  };
  return <span className={map[status] || "badge-cancelled"}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

export default function InstitutionAppointments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [serviceFilter, setServiceFilter] = useState("All Services");

  const filtered = APPOINTMENTS.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                        a.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || a.status === statusFilter.toLowerCase();
    const matchService = serviceFilter === "All Services" || a.service === serviceFilter;
    return matchSearch && matchStatus && matchService;
  });

  return (
    <InstitutionLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy mb-5">Appointments</h1>

        {/* Filter bar */}
        <div className="card p-3 mb-4 flex items-center gap-3">
          <input
            className="input flex-1"
            placeholder="Search client or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="input w-36" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            {["All Status","Pending","Approved","Rejected","Cancelled","Completed"].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select className="input w-44" value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
            {["All Services","General Consultation","Lab Test","Specialist Referral","Radiology","Pharmacy Collection"].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button className="btn-primary px-5">Filter</button>
          <button className="btn-secondary flex items-center gap-1.5 px-3">
            <span>↓</span> Export
          </button>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Client</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Phone</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Service</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Date &amp; Time</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Booked On</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{a.name}</td>
                  <td className="px-4 py-3 text-gray-500">{a.phone}</td>
                  <td className="px-4 py-3 text-gray-700">{a.service}</td>
                  <td className="px-4 py-3 text-gray-700">{a.date}</td>
                  <td className="px-4 py-3 text-gray-500">{a.bookedOn}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {a.status === "pending" ? (
                        <>
                          <button className="flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-lg hover:bg-green-100 transition-colors">
                            ✓ Approve
                          </button>
                          <button className="flex items-center gap-1 text-xs bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-100 transition-colors">
                            ✕ Reject
                          </button>
                        </>
                      ) : (
                        <button className="text-blue-400 hover:text-blue-600 text-lg">👁</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">No appointments match your filters.</div>
          )}
        </div>
      </div>
    </InstitutionLayout>
  );
}
