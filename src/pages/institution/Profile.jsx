import { useState } from "react";
import InstitutionLayout from "../../components/layout/InstitutionLayout";

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const DEFAULT_HOURS = {
  Monday: { open: "08:00 AM", close: "06:00 PM", closed: false },
  Tuesday: { open: "08:00 AM", close: "06:00 PM", closed: false },
  Wednesday: { open: "08:00 AM", close: "06:00 PM", closed: false },
  Thursday: { open: "08:00 AM", close: "06:00 PM", closed: false },
  Friday: { open: "08:00 AM", close: "06:00 PM", closed: false },
  Saturday: { open: "09:00 AM", close: "02:00 PM", closed: false },
  Sunday: { open: "", close: "", closed: true },
};

export default function InstitutionProfile() {
  const [form, setForm] = useState({
    name: "City General Hospital",
    category: "Hospital",
    phone: "+254 20 123 4567",
    email: "info@cgh.co.ke",
    address: "Ngong Road, Nairobi, Kenya",
    description: "City General Hospital is one of Nairobi's leading private hospitals offering comprehensive healthcare services.",
  });
  const [hours, setHours] = useState(DEFAULT_HOURS);
  const [saved, setSaved] = useState(false);

  const saveProfile = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <InstitutionLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy mb-5">Institution Profile</h1>

        <div className="grid grid-cols-3 gap-5">
          {/* Main form */}
          <div className="col-span-2 space-y-4">
            {/* Basic Information */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Basic Information</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Institution Name</label>
                  <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Category</label>
                  <select className="input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    {["Hospital","Bank","Government","University","Other"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                  <input className="input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email Address</label>
                  <input className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">Physical Address</label>
                <input className="input" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <textarea
                  className="input resize-none"
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                />
              </div>
              <div className="flex gap-3">
                <button className="btn-primary" onClick={saveProfile}>
                  {saved ? "✓ Saved!" : "Save Changes"}
                </button>
                <button className="btn-secondary">Discard</button>
              </div>
            </div>

            {/* Business Hours */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Business Hours</h2>
              <div className="space-y-3">
                {DAYS.map((day) => (
                  <div key={day} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                    <span className="w-24 text-sm font-medium text-gray-700">{day}</span>
                    {hours[day].closed ? (
                      <span className="text-sm text-red-500 font-medium">Closed</span>
                    ) : (
                      <div className="flex items-center gap-3">
                        <input
                          type="time"
                          className="input w-32 text-xs"
                          defaultValue={hours[day].open?.replace(" AM","").replace(" PM","")}
                        />
                        <span className="text-gray-400">—</span>
                        <input
                          type="time"
                          className="input w-32 text-xs"
                          defaultValue={hours[day].close?.replace(" AM","").replace(" PM","")}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="btn-primary mt-4">Save Hours</button>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Institution Stats */}
            <div className="card p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Institution Stats</h3>
              <div className="space-y-2.5">
                {[
                  { label: "Total Appointments", value: "1,248" },
                  { label: "Avg. Rating",        value: "4.8 ★" },
                  { label: "Active Services",    value: "5" },
                  { label: "Member since",       value: "Jan 2023" },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between text-sm">
                    <span className="text-gray-500 text-xs">{s.label}</span>
                    <span className="font-semibold text-gray-900 text-xs">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Status */}
            <div className="card p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Account Status</h3>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-brand" />
                <span className="text-sm font-semibold text-green-700">Verified &amp; Active</span>
              </div>
              <p className="text-xs text-gray-500">Your institution is publicly listed and accepting bookings.</p>
            </div>
          </div>
        </div>
      </div>
    </InstitutionLayout>
  );
}
