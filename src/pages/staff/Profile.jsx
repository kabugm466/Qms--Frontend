import { useState } from "react";
import StaffLayout from "../../components/layout/StaffLayout";
import { useAuth } from "../../context/AuthContext";
import { canEditProfile } from "../../utils/permissions";

export default function StaffProfile() {
  const { user } = useAuth();
  const editable = canEditProfile(user?.accessLevel);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "Staff Member",
    email: user?.email || "",
    phone: "+254 712 002 002",
  });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <StaffLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy mb-5">Profile &amp; Settings</h1>

        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 card p-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-green-brand rounded-full flex items-center justify-center text-white text-lg font-bold">
                {form.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{form.name}</div>
                <div className="text-xs text-gray-400">{user?.institution}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                <input className="input" disabled={!editable} value={form.name} onChange={set("name")} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                <input className="input" disabled={!editable} value={form.email} onChange={set("email")} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                <input className="input" disabled={!editable} value={form.phone} onChange={set("phone")} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Assigned Service</label>
                <input className="input bg-gray-50" disabled value={user?.assignedService || "Unassigned"} />
              </div>
            </div>

            {editable ? (
              <button
                onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }}
                className={`mt-4 text-sm px-5 py-2 rounded-lg font-medium transition-colors ${saved ? "bg-green-100 text-green-700 border border-green-300" : "btn-primary"}`}
              >
                {saved ? "✓ Changes saved" : "Save Changes"}
              </button>
            ) : (
              <p className="text-xs text-gray-400 mt-4">
                Your profile is managed by your Institution Admin. Contact them to request changes.
              </p>
            )}
          </div>

          {/* Access info card */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Access Level</h3>
            <div className="text-xs text-gray-500 mb-3">
              Set by your Institution Admin. This determines what actions you can perform.
            </div>
            <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full ${
              user?.accessLevel === "View Only" ? "bg-gray-100 text-gray-600" :
              user?.accessLevel === "Full Access" ? "bg-navy/10 text-navy" :
              "bg-green-100 text-green-700"
            }`}>
              {user?.accessLevel || "View Only"}
            </span>
            <ul className="text-xs text-gray-500 mt-4 space-y-1.5 list-disc list-inside">
              <li>View queue and appointments</li>
              {(user?.accessLevel === "Manage Appointments" || user?.accessLevel === "Full Access") && (
                <li>Approve / Reject / Call Next</li>
              )}
              {user?.accessLevel === "Full Access" && (
                <li>Edit own profile details</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
