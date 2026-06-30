import { useState } from "react";
import InstitutionLayout from "../../components/layout/InstitutionLayout";
import EmptyState from "../../components/common/EmptyState";

const APPTS = [
  { initials:"AW", color:"bg-blue-500",   name:"Amina Wanjiku",   phone:"+254 712 111 001", service:"General Consultation", duration:"30 min", date:"27 Jun", time:"9:00 AM",  bookedOn:"2 days ago", status:"approved"  },
  { initials:"JM", color:"bg-green-600",  name:"John Mwangi",     phone:"+254 722 222 002", service:"Lab Test",             duration:"20 min", date:"27 Jun", time:"9:30 AM",  bookedOn:"1 day ago",  status:"pending"   },
  { initials:"GA", color:"bg-orange-500", name:"Grace Achieng",   phone:"+254 733 333 003", service:"Specialist Referral",  duration:"45 min", date:"27 Jun", time:"10:00 AM", bookedOn:"3 days ago", status:"approved"  },
  { initials:"PO", color:"bg-purple-500", name:"Peter Odhiambo",  phone:"+254 700 444 004", service:"Radiology",            duration:"30 min", date:"27 Jun", time:"10:30 AM", bookedOn:"2 days ago", status:"pending"   },
  { initials:"FH", color:"bg-pink-500",   name:"Fatuma Hassan",   phone:"+254 711 555 005", service:"Pharmacy Collection",  duration:"15 min", date:"27 Jun", time:"11:00 AM", bookedOn:"today",      status:"completed" },
  { initials:"JN", color:"bg-indigo-500", name:"James Njoroge",   phone:"+254 721 666 006", service:"General Consultation", duration:"30 min", date:"27 Jun", time:"11:30 AM", bookedOn:"2 days ago", status:"pending"   },
  { initials:"LW", color:"bg-teal-500",   name:"Lucy Wambua",     phone:"+254 731 777 007", service:"Vaccination",          duration:"20 min", date:"27 Jun", time:"12:00 PM", bookedOn:"4 days ago", status:"approved"  },
  { initials:"MO", color:"bg-red-500",    name:"Michael Omondi",  phone:"+254 701 888 008", service:"Lab Test",             duration:"20 min", date:"27 Jun", time:"1:00 PM",  bookedOn:"1 day ago",  status:"rejected"  },
  { initials:"SK", color:"bg-cyan-600",   name:"Sarah Karimi",    phone:"+254 712 999 009", service:"Specialist Referral",  duration:"45 min", date:"27 Jun", time:"2:00 PM",  bookedOn:"3 days ago", status:"completed" },
  { initials:"DK", color:"bg-navy",       name:"David Kipchoge",  phone:"+254 722 000 010", service:"Radiology",            duration:"30 min", date:"28 Jun", time:"9:00 AM",  bookedOn:"today",      status:"pending"   },
];

const TABS = [
  { label:"All (18)",       filter:"all"      },
  { label:"Pending (4)",    filter:"pending"  },
  { label:"Approved (9)",   filter:"approved" },
  { label:"Completed (11)", filter:"completed"},
  { label:"Rejected (2)",   filter:"rejected" },
  { label:"Cancelled (1)",  filter:"cancelled"},
];

const BADGE = { approved:"badge-approved", pending:"badge-pending", rejected:"badge-rejected", cancelled:"badge-cancelled", completed:"badge-completed" };

export default function InstitutionAppointments() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = APPTS.filter(a =>
    (activeFilter === "all" || a.status === activeFilter) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.service.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <InstitutionLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy">Appointments</h1>
        <p className="text-xs text-gray-400 mt-0.5 mb-4">City General Hospital / Appointments</p>

        {/* Status tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {TABS.map(t => (
            <button key={t.filter} onClick={() => setActiveFilter(t.filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeFilter === t.filter
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-4">
          <input className="input w-32 text-xs" type="date" defaultValue="2025-06-27" />
          <select className="input w-36 text-xs">
            {["All Services","General Consultation","Lab Test","Specialist Referral","Radiology","Pharmacy","Vaccination"].map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="input w-28 text-xs">
            {["All Status","Pending","Approved","Completed","Rejected","Cancelled"].map(s => <option key={s}>{s}</option>)}
          </select>
          <input className="input flex-1 text-xs" placeholder="Search by client name..." value={search} onChange={e => setSearch(e.target.value)} />
          <button className="btn-primary px-4 text-xs">Filter</button>
          <button className="btn-secondary flex items-center gap-1 text-xs px-3">↓ Export</button>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          {filtered.length === 0 ? (
            <EmptyState
              icon="📋"
              title="No appointments found"
              message={search ? `No results matching "${search}". Try a different search or filter.` : "No appointments match the selected filter."}
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-3 py-3 text-left"><input type="checkbox" className="rounded" /></th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-400">#</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-400">Client</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-400">Service</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-400">Date &amp; Time</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-400">Booked On</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-400">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3"><input type="checkbox" className="rounded" /></td>
                      <td className="px-2 py-3 text-xs text-gray-400">{i+1}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 ${a.color} rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>{a.initials}</div>
                          <div>
                            <div className="text-sm font-medium text-gray-800">{a.name}</div>
                            <div className="text-[11px] text-gray-400">{a.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm text-gray-700">{a.service}</div>
                        <div className="text-[11px] text-green-brand">{a.duration}</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm font-medium text-gray-800">{a.date}</div>
                        <div className="text-[11px] text-gray-400">{a.time}</div>
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-500">{a.bookedOn}</td>
                      <td className="px-3 py-3"><span className={BADGE[a.status]}>{a.status.charAt(0).toUpperCase()+a.status.slice(1)}</span></td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          {a.status === "pending" && <>
                            <button className="w-6 h-6 bg-green-50 text-green-600 border border-green-200 rounded flex items-center justify-center text-xs hover:bg-green-100">✓</button>
                            <button className="w-6 h-6 bg-red-50 text-red-500 border border-red-200 rounded flex items-center justify-center text-xs hover:bg-red-100">✕</button>
                          </>}
                          <button className="w-6 h-6 bg-blue-50 text-blue-400 border border-blue-100 rounded flex items-center justify-center text-xs hover:bg-blue-100">↺</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">Page 1 of 2 · 18 results</span>
                <div className="flex gap-2">
                  <button className="btn-secondary text-xs px-3 py-1.5">Prev</button>
                  <button className="btn-secondary text-xs px-3 py-1.5">Next</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </InstitutionLayout>
  );
}
