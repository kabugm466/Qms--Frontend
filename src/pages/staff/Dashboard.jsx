import { useNavigate } from "react-router-dom";
import StaffLayout from "../../components/layout/StaffLayout";
import { useAuth } from "../../context/AuthContext";
import { canManage } from "../../utils/permissions";

const QUEUE = [
  { pos: 1, name: "Amina Wanjiku",  time: "9:00 AM",  status: "now-serving" },
  { pos: 2, name: "John Mwangi",    time: "9:30 AM",  status: "waiting"     },
  { pos: 3, name: "Grace Achieng",  time: "10:00 AM", status: "waiting"     },
  { pos: 4, name: "Peter Odhiambo", time: "10:30 AM", status: "waiting"     },
];

export default function StaffDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const accessLevel = user?.accessLevel || "View Only";
  const allowed = canManage(accessLevel);

  return (
    <StaffLayout>
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl font-semibold text-navy">Dashboard</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {user?.institution} / {user?.assignedService}
            </p>
          </div>
          {!allowed && (
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg font-medium">
              👁 View Only — navigation and viewing only
            </span>
          )}
        </div>

        {/* Welcome banner */}
        <div className="bg-green-brand rounded-xl p-4 flex items-center justify-between mb-5">
          <div>
            <div className="text-white font-semibold text-base">Good morning, {user?.name?.split(' ')[0] || 'there'} 👋</div>
            <div className="text-green-50 text-sm mt-0.5">
              You're assigned to <strong>{user?.assignedService}</strong>. {QUEUE.length} clients in queue today.
            </div>
          </div>
          <span className="text-4xl opacity-40">🎟</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-5">
          {[
            { label: "Now Serving", value: "Amina Wanjiku", icon: "▶", border: "border-l-green-brand" },
            { label: "Waiting",     value: "3",              icon: "⏳", border: "border-l-yellow-400" },
            { label: "Completed Today", value: "8",          icon: "✅", border: "border-l-blue-400" },
          ].map(k => (
            <div key={k.label} className={`card p-4 border-l-4 ${k.border}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{k.label}</div>
                  <div className="text-lg font-bold text-gray-900">{k.value}</div>
                </div>
                <span className="text-lg opacity-60">{k.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Queue */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-sm">{user?.assignedService} Queue</h2>
            {allowed && (
              <button className="btn-primary text-xs px-4 py-1.5">Call Next →</button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["#", "Client", "Time", "Status", allowed ? "Actions" : ""].map(h => (
                  <th key={h} className="text-left pb-2 text-xs font-medium text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {QUEUE.map(row => (
                <tr key={row.pos} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 text-xs text-gray-400">{row.pos}</td>
                  <td className="py-2.5 text-sm font-medium text-gray-800">{row.name}</td>
                  <td className="py-2.5 text-xs text-gray-600">{row.time}</td>
                  <td className="py-2.5">
                    {row.status === "now-serving"
                      ? <span className="badge-approved">Now Serving</span>
                      : <span className="badge-pending">Waiting</span>}
                  </td>
                  <td className="py-2.5">
                    {allowed && row.status === "waiting" && (
                      <button className="text-xs text-green-brand hover:underline font-medium">Mark Done</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <button
          className="text-green-brand text-xs mt-3 hover:underline"
          onClick={() => navigate("/staff/appointments")}
        >
          View all my appointments →
        </button>
      </div>
    </StaffLayout>
  );
}
