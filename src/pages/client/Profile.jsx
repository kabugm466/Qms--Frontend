import { useState } from 'react'
import ClientLayout from '../../components/layout/ClientLayout'

const TABS = ['Personal Info', 'Security', 'Notification Preferences']

const NOTIF_TOGGLES = [
  { key: 'emailApproved',   label: 'Appointment Approved',  channel: 'email', default: true  },
  { key: 'emailRejected',   label: 'Appointment Rejected',  channel: 'email', default: true  },
  { key: 'emailReminder',   label: 'Appointment Reminder',  channel: 'email', default: true  },
  { key: 'emailConfirmed',  label: 'Booking Confirmed',     channel: 'email', default: true  },
  { key: 'appApproved',     label: 'Appointment Approved',  channel: 'app',   default: true  },
  { key: 'appRejected',     label: 'Appointment Rejected',  channel: 'app',   default: true  },
  { key: 'appReminder',     label: 'Appointment Reminder',  channel: 'app',   default: true  },
  { key: 'appConfirmed',    label: 'Booking Confirmed',     channel: 'app',   default: true  },
]

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${
        on ? 'bg-green-brand' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
          on ? 'translate-x-4' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

export default function ClientProfile() {
  const [activeTab, setActiveTab] = useState('Personal Info')
  const [saved, setSaved] = useState(false)
  const [pwSaved, setPwSaved] = useState(false)
  const [notifSaved, setNotifSaved] = useState(false)

  const [form, setForm] = useState({
    fullName: 'Brian Otieno',
    email: 'brian.otieno@gmail.com',
    phone: '+254 712 345 678',
    dob: '06/15/1995',
    location: 'Nairobi, Kenya',
    gender: 'Male',
  })

  const [pw, setPw] = useState({
    current: '',
    next: '',
    confirm: '',
  })

  const [pwStrength, setPwStrength] = useState(0)

  const [toggles, setToggles] = useState(
    Object.fromEntries(NOTIF_TOGGLES.map(t => [t.key, t.default]))
  )

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const setPwField = k => e => {
    setPw(p => ({ ...p, [k]: e.target.value }))
    if (k === 'next') {
      const v = e.target.value
      let score = 0
      if (v.length >= 8) score++
      if (/[A-Z]/.test(v)) score++
      if (/[0-9]/.test(v)) score++
      if (/[^A-Za-z0-9]/.test(v)) score++
      setPwStrength(score)
    }
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handlePwSave = () => {
    setPwSaved(true)
    setTimeout(() => setPwSaved(false), 2500)
  }

  const handleNotifSave = () => {
    setNotifSaved(true)
    setTimeout(() => setNotifSaved(false), 2500)
  }

  const strengthColor = ['bg-gray-200', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-brand'][pwStrength]
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][pwStrength]

  return (
    <ClientLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy mb-5">Profile &amp; Settings</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm transition-colors ${
                activeTab === tab
                  ? 'text-green-brand border-b-2 border-green-brand font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── PERSONAL INFO ── */}
        {activeTab === 'Personal Info' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="col-span-2 space-y-5">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-brand rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  BO
                </div>
                <button className="text-green-brand text-xs font-medium hover:underline">
                  Change photo
                </button>
              </div>

              {/* Form grid */}
              <div className="card p-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                    <input className="input" value={form.fullName} onChange={set('fullName')} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                    <div className="relative">
                      <input className="input pr-20" value={form.email} onChange={set('email')} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-green-brand bg-green-50 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                    <input className="input" value={form.phone} onChange={set('phone')} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
                    <input className="input" value={form.dob} onChange={set('dob')} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                    <input className="input" value={form.location} onChange={set('location')} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Gender</label>
                    <select className="input" value={form.gender} onChange={set('gender')}>
                      {['Male', 'Female', 'Prefer not to say'].map(g => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={handleSave}
                    className={`text-sm px-5 py-2 rounded-lg font-medium transition-colors ${
                      saved
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'btn-primary'
                    }`}
                  >
                    {saved ? '✓ Changes saved' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => setForm({
                      fullName:'Brian Otieno', email:'brian.otieno@gmail.com',
                      phone:'+254 712 345 678', dob:'06/15/1995',
                      location:'Nairobi, Kenya', gender:'Male',
                    })}
                    className="btn-secondary text-sm px-5 py-2"
                  >
                    Discard
                  </button>
                </div>
              </div>

              {/* Account Info */}
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">Account Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Member since</div>
                    <div className="text-sm font-semibold text-gray-800">June 2024</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Total bookings</div>
                    <div className="text-sm font-semibold text-gray-800">24</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Status</div>
                    <span className="badge-approved">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SECURITY ── */}
        {activeTab === 'Security' && (
          <div className="max-w-lg space-y-4">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Change Password</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Current Password</label>
                  <input className="input" type="password" placeholder="••••••••" value={pw.current} onChange={setPwField('current')} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">New Password</label>
                  <input className="input" type="password" placeholder="••••••••" value={pw.next} onChange={setPwField('next')} />
                  {pw.next && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1,2,3,4].map(i => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= pwStrength ? strengthColor : 'bg-gray-200'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{strengthLabel}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Confirm New Password</label>
                  <input className="input" type="password" placeholder="••••••••" value={pw.confirm} onChange={setPwField('confirm')} />
                  {pw.confirm && pw.next !== pw.confirm && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>
              </div>
              <button
                onClick={handlePwSave}
                className={`mt-4 text-sm px-5 py-2 rounded-lg font-medium transition-colors ${
                  pwSaved ? 'bg-green-100 text-green-700 border border-green-300' : 'btn-primary'
                }`}
              >
                {pwSaved ? '✓ Password updated' : 'Update Password'}
              </button>
            </div>

            {/* Danger zone */}
            <div className="card p-5 border border-red-100">
              <h3 className="text-sm font-semibold text-red-600 mb-3">Danger Zone</h3>
              <p className="text-xs text-gray-500 mb-3">
                Permanently delete your account and all your appointment data. This cannot be undone.
              </p>
              <button className="text-xs px-4 py-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium">
                Delete Account
              </button>
            </div>
          </div>
        )}

        {/* ── NOTIFICATION PREFERENCES ── */}
        {activeTab === 'Notification Preferences' && (
          <div className="max-w-lg space-y-4">
            {/* Email notifications */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                📧 Email Notifications
              </h3>
              <div className="space-y-4">
                {NOTIF_TOGGLES.filter(t => t.channel === 'email').map(t => (
                  <div key={t.key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{t.label}</span>
                    <Toggle
                      on={toggles[t.key]}
                      onChange={v => setToggles(s => ({ ...s, [t.key]: v }))}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* In-app notifications */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                🔔 In-App Notifications
              </h3>
              <div className="space-y-4">
                {NOTIF_TOGGLES.filter(t => t.channel === 'app').map(t => (
                  <div key={t.key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{t.label}</span>
                    <Toggle
                      on={toggles[t.key]}
                      onChange={v => setToggles(s => ({ ...s, [t.key]: v }))}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNotifSave}
              className={`text-sm px-5 py-2 rounded-lg font-medium transition-colors ${
                notifSaved ? 'bg-green-100 text-green-700 border border-green-300' : 'btn-primary'
              }`}
            >
              {notifSaved ? '✓ Preferences saved' : 'Save Preferences'}
            </button>
          </div>
        )}
      </div>
    </ClientLayout>
  )
}
