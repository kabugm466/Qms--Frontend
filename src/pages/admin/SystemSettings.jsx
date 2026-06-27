import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'

const toggles = [
  { key: 'email',       label: 'Email Notifications',    desc: 'Send email notifications to users',           default: true  },
  { key: 'sms',         label: 'SMS Notifications',       desc: "Send SMS reminders via Africa's Talking",     default: false },
  { key: 'maintenance', label: 'Maintenance Mode',        desc: 'Take platform offline for maintenance',       default: false },
  { key: 'registrations',label: 'New Registrations',     desc: 'Allow new user and institution sign-ups',     default: true  },
  { key: 'autoapprove', label: 'Auto-approve Institutions',desc: 'Bypass manual review for new institutions', default: false },
]

export default function SystemSettings() {
  const [form, setForm] = useState({
    platformName: 'Jipange',
    supportEmail: 'support@jipange.co.ke',
    supportPhone: '+254 800 000 000',
    country: 'Kenya',
    currency: 'KES — Kenyan Shilling',
  })

  const [states, setStates] = useState(
    Object.fromEntries(toggles.map((t) => [t.key, t.default]))
  )

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy mb-6">System Settings</h1>

        <div className="grid grid-cols-5 gap-6">
          {/* Platform Configuration */}
          <div className="col-span-3 card p-6">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Platform Configuration</h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Platform Name</label>
                <input
                  className="input"
                  value={form.platformName}
                  onChange={(e) => setForm({ ...form, platformName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Support Email</label>
                <input
                  className="input"
                  value={form.supportEmail}
                  onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Support Phone</label>
                <input
                  className="input"
                  value={form.supportPhone}
                  onChange={(e) => setForm({ ...form, supportPhone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Default Country</label>
                <select
                  className="input"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                >
                  <option>Kenya</option>
                  <option>Uganda</option>
                  <option>Tanzania</option>
                  <option>Rwanda</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Default Currency</label>
                <select
                  className="input"
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                >
                  <option>KES — Kenyan Shilling</option>
                  <option>UGX — Ugandan Shilling</option>
                  <option>TZS — Tanzanian Shilling</option>
                  <option>USD — US Dollar</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSave}
              className={`mt-6 w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                saved
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'btn-primary'
              }`}
            >
              {saved ? '✓ Configuration saved' : 'Save Configuration'}
            </button>
          </div>

          {/* Right column */}
          <div className="col-span-2 space-y-5">
            {/* Feature Toggles */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Feature Toggles</h2>
              <div className="space-y-4">
                {toggles.map((t) => (
                  <div key={t.key} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{t.label}</div>
                      <div className="text-xs text-gray-400">{t.desc}</div>
                    </div>
                    <button
                      onClick={() => setStates((s) => ({ ...s, [t.key]: !s[t.key] }))}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ml-4 ${
                        states[t.key] ? 'bg-green-brand' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                          states[t.key] ? 'translate-x-4' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card p-5 border border-red-100">
              <h2 className="text-sm font-semibold text-red-600 mb-4">Danger Zone</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-800">Clear all queue data</div>
                    <div className="text-xs text-gray-400">Irreversible — wipes all live queue records</div>
                  </div>
                  <button className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors font-medium">
                    Clear
                  </button>
                </div>
                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-800">Reset platform analytics</div>
                    <div className="text-xs text-gray-400">Wipes all reporting and stats data</div>
                  </div>
                  <button className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors font-medium">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
