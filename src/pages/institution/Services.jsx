import { useState } from "react";
import InstitutionLayout from "../../components/layout/InstitutionLayout";

const INITIAL_SERVICES = [
  { name: "General Consultation", duration: "30 min", capacity: "20/day", fee: "KES 500",  status: "active"   },
  { name: "Specialist Referral",  duration: "45 min", capacity: "10/day", fee: "KES 1,200",status: "active"   },
  { name: "Lab Test",             duration: "20 min", capacity: "30/day", fee: "KES 800",  status: "active"   },
  { name: "Radiology",            duration: "30 min", capacity: "8/day",  fee: "KES 2,500",status: "inactive" },
  { name: "Pharmacy Collection",  duration: "15 min", capacity: "50/day", fee: "Free",     status: "active"   },
];

export default function Services() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", duration: "", capacity: "", fee: "" });

  const addService = () => {
    if (!form.name || !form.duration) return;
    setServices([...services, { ...form, status: "active" }]);
    setForm({ name: "", duration: "", capacity: "", fee: "" });
    setShowForm(false);
  };

  const deleteService = (idx) => setServices(services.filter((_, i) => i !== idx));

  const toggleStatus = (idx) =>
    setServices(services.map((s, i) =>
      i === idx ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s
    ));

  return (
    <InstitutionLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-semibold text-navy">Services</h1>
          <button className="btn-primary flex items-center gap-1.5" onClick={() => setShowForm(!showForm)}>
            + Add Service
          </button>
        </div>

        {/* Add service form */}
        {showForm && (
          <div className="card p-4 mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Add New Service</h3>
            <div className="grid grid-cols-4 gap-3 mb-3">
              <input className="input" placeholder="Service name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input className="input" placeholder="Duration (e.g. 30 min)" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} />
              <input className="input" placeholder="Daily capacity (e.g. 20/day)" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} />
              <input className="input" placeholder="Fee (e.g. KES 500 or Free)" value={form.fee} onChange={e => setForm({...form, fee: e.target.value})} />
            </div>
            <div className="flex gap-2">
              <button className="btn-primary" onClick={addService}>Add Service</button>
              <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Services table */}
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Service</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Duration</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Daily Capacity</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Fee</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                  <td className="px-4 py-3 text-gray-600">{s.duration}</td>
                  <td className="px-4 py-3 text-gray-600">{s.capacity}</td>
                  <td className="px-4 py-3 text-gray-600">{s.fee}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(i)}>
                      <span className={s.status === "active" ? "badge-active" : "badge-inactive"}>
                        {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button className="text-gray-400 hover:text-blue-500 transition-colors" title="Edit">✏️</button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors" title="Delete" onClick={() => deleteService(i)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </InstitutionLayout>
  );
}
