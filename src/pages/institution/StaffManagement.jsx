import { useState } from "react";
import InstitutionLayout from "../../components/layout/InstitutionLayout";

const STAFF = [
  { initials:"DK", color:"bg-navy",       name:"Dr. Kamau",    role:"Administrator",  email:"kamau@cgh.co.ke",   phone:"+254 722 001 001", status:"active",   appts:12 },
  { initials:"NA", color:"bg-green-600",  name:"Nurse Akinyi", role:"Receptionist",   email:"akinyi@cgh.co.ke",  phone:"+254 712 002 002", status:"active",   appts:8  },
  { initials:"DM", color:"bg-purple-600", name:"Dr. Mwangi",   role:"Doctor",         email:"mwangi@cgh.co.ke",  phone:"+254 733 003 003", status:"active",   appts:15 },
  { initials:"TO", color:"bg-teal-600",   name:"Tech Ochieng", role:"Lab Technician", email:"ochieng@cgh.co.ke", phone:"+254 700 004 004", status:"active",   appts:9  },
  { initials:"MN", color:"bg-yellow-500", name:"Ms. Njeri",    role:"Administrator",  email:"njeri@cgh.co.ke",   phone:"+254 721 005 005", status:"active",   appts:3  },
  { initials:"MH", color:"bg-gray-500",   name:"Mr. Hassan",   role:"Receptionist",   email:"hassan@cgh.co.ke",  phone:"+254 731 006 006", status:"inactive", appts:0  },
];

export default function StaffManagement() {
  const [showForm, setShowForm] = useState(true);
  const [form, setForm] = useState({ name:"", email:"", phone:"", role:"Receptionist", access:"Manage Appointments" });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <InstitutionLayout>
      <div className="p-6">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="text-xl font-semibold text-navy">Staff Management</h1>
            <p className="text-xs text-gray-400 mt-0.5">City General Hospital / Staff</p>
          </div>
          <button className="btn-primary text-xs px-4 py-1.5" onClick={() => setShowForm(true)}>
            + Add Staff Member
          </button>
        </div>

        {/* Summary chips */}
        <div className="flex gap-3 mb-5 mt-4">
          {[{label:"8 Total Staff"},{label:"7 Active"},{label:"1 Pending Invite"}].map(c => (
            <div key={c.label} className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-xs font-medium text-gray-700">{c.label}</div>
          ))}
        </div>

        {/* Staff cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
          {STAFF.map(s => (
            <div key={s.name} className="card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${s.color} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{s.initials}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.role}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-0.5">{s.email}</div>
              <div className="text-xs text-gray-500 mb-3">{s.phone}</div>
              <div className="flex items-center justify-between mb-3">
                <span className={s.status === "active" ? "badge-active" : "badge-inactive"}>
                  {s.status.charAt(0).toUpperCase()+s.status.slice(1)}
                </span>
                <span className="text-xs text-gray-400">Appointments today: {s.appts}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                <button className="text-xs text-gray-600 hover:text-navy py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Edit</button>
                <button className="text-xs text-red-500 hover:text-red-700 py-1.5 border border-red-100 rounded-lg hover:bg-red-50">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Staff Form */}
        {showForm && (
          <div className="card p-5 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800">Add New Staff Member</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">⊗</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                <input className="input text-sm" placeholder="e.g. Dr. Sarah Mutua" value={form.name} onChange={set("name")} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email Address</label>
                <input className="input text-sm" placeholder="sarah@cgh.co.ke" value={form.email} onChange={set("email")} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                <input className="input text-sm" placeholder="+254 7XX XXX XXX" value={form.phone} onChange={set("phone")} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Role</label>
                <select className="input text-sm" value={form.role} onChange={set("role")}>
                  {["Receptionist","Doctor","Nurse","Lab Technician","Administrator"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Access Level</label>
                <select className="input text-sm" value={form.access} onChange={set("access")}>
                  {["View Only","Manage Appointments","Full Access"].map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn-primary text-xs px-4 py-2">Send Invite</button>
              <button className="btn-secondary text-xs px-4 py-2" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
            <p className="text-xs text-gray-400 mt-2">An invitation email will be sent to the staff member</p>
          </div>
        )}
      </div>
    </InstitutionLayout>
  );
}
