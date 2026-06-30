import { useState } from "react";
import StaffLayout from "../../components/layout/StaffLayout";
import { useAuth } from "../../context/AuthContext";
import { canManage } from "../../utils/permissions";

const APPTS = [
  { id: 1, name: "Amina Wanjiku",  phone: "+254 712 111 001", time: "9:00 AM",  status: "approved" },
  { id: 2, name: "John Mwangi",    phone: "+254 722 222 002", time: "9:30 AM",  status: "pending"  },
  { id: 3, name: "Grace Achieng",  phone: "+254 733 333 003", time: "10:00 AM", status: "pending"  },
  { id: 4, name: "Peter Odhiambo", phone: "+254 700 444 004", time: "10:30 AM", status: "approved" },
  { id: 5, name: "Fatuma Hassan",  phone: "+254 711 555 005", time: "11:00 AM", status: "completed"},
];

const BADGE = { approved: "badge-approved", pending: "badge-pending", rejected: "badge-rejected", completed: "badge-completed" };

export default function StaffAppointments() {
  const { user } = useAuth();
  const allowed = canManage(user?.accessLevel);
  const [appts, setAppts] = useState(APPTS);

  const updateStatus = (id, status) => {
    if (!allowed) return;
    setAppts(list => list.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <StaffLayout>
      <div className="p-6">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="text-xl font-semibold text-navy">My Appointments</h1>
            <p className="text-xs text-gray-400 mt-0.5">{user?.assignedService}</p>
          </div>
          {!allowed && (
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg font-medium">
              👁 View Only
            </span>
          )}
        </div>

        <div className="card overflow-hidden mt-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Status</th>
                {allowed && <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {appts.map(a => (
                <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{a.name}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{a.phone}</td>
                  <td className="px-4 py-3 text-gray-600">{a.time}</td>
                  <td className="px-4 py-3"><span className={BADGE[a.status]}>{a.status.charAt(0).toUpperCase()+a.status.slice(1)}</span></td>
                  {allowed && (
                    <td className="px-4 py-3">
                      {a.status === "pending" && (
                        <div className="flex gap-1">
                          <button onClick={() => updateStatus(a.id, "approved")} className="w-6 h-6 bg-green-50 text-green-600 border border-green-200 rounded flex items-center justify-center text-xs hover:bg-green-100">✓</button>
                          <button onClick={() => updateStatus(a.id, "rejected")} className="w-6 h-6 bg-red-50 text-red-500 border border-red-200 rounded flex items-center justify-center text-xs hover:bg-red-100">✕</button>
                        </div>
                      )}
                      {a.status === "approved" && (
                        <button onClick={() => updateStatus(a.id, "completed")} className="text-xs text-green-brand hover:underline font-medium">Mark Complete</button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!allowed && (
          <p className="text-xs text-gray-400 mt-3">
            You have View Only access. Contact your Institution Admin to request appointment management permissions.
          </p>
        )}
      </div>
    </StaffLayout>
  );
}
