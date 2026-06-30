import { useNavigate } from "react-router-dom";
import InstitutionLayout from "../../components/layout/InstitutionLayout";

const QUEUE = [
  { pos:1, name:"Amina Wanjiku",   service:"General Consultation", time:"9:00 AM",  status:"approved" },
  { pos:2, name:"John Mwangi",     service:"Lab Test",             time:"9:30 AM",  status:"pending"  },
  { pos:3, name:"Grace Achieng",   service:"Specialist Referral",  time:"10:00 AM", status:"approved" },
  { pos:4, name:"Peter Odhiambo",  service:"Radiology",            time:"10:30 AM", status:"pending"  },
  { pos:5, name:"Fatuma Hassan",   service:"Pharmacy Collection",  time:"11:00 AM", status:"approved" },
  { pos:6, name:"James Njoroge",   service:"General Consultation", time:"11:30 AM", status:"pending"  },
];

const SUMMARY = [
  { label:"General Consultation", count:8,  pct:100 },
  { label:"Lab Test",             count:4,  pct:50  },
  { label:"Specialist",           count:3,  pct:38  },
  { label:"Radiology",            count:2,  pct:25  },
  { label:"Pharmacy",             count:1,  pct:13  },
];

const ACTIVITY = [
  { icon:"✅", color:"text-green-500", msg:"Appointment approved for Amina Wanjiku — General Consultation", time:"2 min ago" },
  { icon:"🔔", color:"text-blue-500",  msg:"New booking received from Peter Odhiambo — Radiology",          time:"15 min ago" },
  { icon:"👤", color:"text-purple-500",msg:"Staff member Nurse Akinyi added to the team",                   time:"1 hr ago"  },
  { icon:"📅", color:"text-yellow-500",msg:"Appointment rescheduled — Grace Achieng moved to 10:00 AM",     time:"2 hr ago"  },
  { icon:"❌", color:"text-red-500",   msg:"Appointment rejected — James Njoroge (slot no longer available)","time":"3 hr ago"  },
];

const BADGE = { approved:"badge-approved", pending:"badge-pending" };

export default function InstitutionOverview() {
  const navigate = useNavigate();

  return (
    <InstitutionLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl font-semibold text-navy">Dashboard</h1>
            <p className="text-xs text-gray-400 mt-0.5">City General Hospital / Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">Friday, 27 June 2025</span>
            <button className="btn-primary text-xs px-4 py-1.5" onClick={() => navigate("/institution/queue")}>
              View Full Queue
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5">
          {[
            { label:"Today's Appointments", value:"18", sub:"+3 from yesterday",   subColor:"text-green-600", icon:"📅", border:"border-l-blue-400" },
            { label:"Completed",            value:"11", sub:"61% completion rate", subColor:"text-gray-400",  icon:"✅", border:"border-l-green-brand" },
            { label:"Pending Approval",     value:"4",  sub:"2 urgent",            subColor:"text-red-500",   icon:"⏰", border:"border-l-yellow-400" },
            { label:"No-Shows",             value:"3",  sub:"16% rate",            subColor:"text-gray-400",  icon:"⊗", border:"border-l-red-400" },
          ].map(k => (
            <div key={k.label} className={`card p-4 border-l-4 ${k.border}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{k.label}</div>
                  <div className="text-2xl font-bold text-gray-900">{k.value}</div>
                  <div className={`text-xs mt-0.5 ${k.subColor}`}>{k.sub}</div>
                </div>
                <span className="text-lg opacity-60">{k.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Today's Queue table */}
          <div className="col-span-2 card p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800 text-sm">Today's Queue</h2>
              <button className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-2.5 py-1 rounded-lg">Refresh</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["#","Client","Service","Time","Status","Actions"].map(h => (
                    <th key={h} className="text-left pb-2 text-xs font-medium text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {QUEUE.map(row => (
                  <tr key={row.pos} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 text-xs text-gray-400">{row.pos}</td>
                    <td className="py-2.5 text-sm font-medium text-gray-800">{row.name}</td>
                    <td className="py-2.5 text-xs text-gray-500">{row.service}</td>
                    <td className="py-2.5 text-xs text-gray-600">{row.time}</td>
                    <td className="py-2.5"><span className={BADGE[row.status]}>{row.status.charAt(0).toUpperCase()+row.status.slice(1)}</span></td>
                    <td className="py-2.5">
                      {row.status === "pending" && (
                        <div className="flex gap-1">
                          <button className="w-6 h-6 bg-green-50 text-green-600 border border-green-200 rounded flex items-center justify-center text-xs hover:bg-green-100">✓</button>
                          <button className="w-6 h-6 bg-red-50 text-red-500 border border-red-200 rounded flex items-center justify-center text-xs hover:bg-red-100">✕</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <button className="text-green-brand text-xs mt-3 hover:underline" onClick={() => navigate("/institution/appointments")}>
              View all 18 appointments →
            </button>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Appointment Summary */}
            <div className="card p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Appointment Summary</h2>
              <div className="space-y-2.5">
                {SUMMARY.map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">{s.label}</span>
                      <span className="font-semibold text-navy">{s.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-green-brand h-1.5 rounded-full" style={{ width:`${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2">
                <button className="btn-secondary text-xs py-2" onClick={() => navigate("/institution/staff")}>Add Staff</button>
                <button className="btn-secondary text-xs py-2" onClick={() => navigate("/institution/settings")}>Add Service</button>
                <button className="btn-secondary text-xs py-2" onClick={() => navigate("/institution/reports")}>View Reports</button>
                <button className="btn-secondary text-xs py-2" onClick={() => navigate("/institution/settings")}>Edit Profile</button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-4">
          <h2 className="font-semibold text-gray-800 text-sm mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className={`text-base ${a.color}`}>{a.icon}</span>
                  <span className="text-sm text-gray-700">{a.msg}</span>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InstitutionLayout>
  );
}
