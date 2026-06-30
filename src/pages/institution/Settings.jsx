import { useState } from 'react'
import InstitutionLayout from '../../components/layout/InstitutionLayout'

const TABS = ['Institution Profile', 'Services', 'Business Hours', 'Notifications']

// ── Toggle component ────────────────────────────────────────────────────────
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

// ── Institution Profile tab ─────────────────────────────────────────────────
function ProfileTab() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: 'City General Hospital',
    category: 'Hospital',
    email: 'info@cgh.co.ke',
    phone: '+254 20 123 4567',
    address: 'Ngong Road, Nairobi, Kenya',
    county: 'Nairobi',
    website: '',
    description: 'City General Hospital is one of Nairobi\'s leading private hospitals offering comprehensive healthcare since 1992.',
  })
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Form */}
      <div className="col-span-2 card p-5">
        {/* Logo upload */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center mb-5 hover:border-green-brand transition-colors cursor-pointer">
          <div className="text-2xl mb-1">🏥</div>
          <p className="text-xs text-gray-400">Upload logo (PNG, JPG — max 2MB)</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Institution Name</label>
            <input className="input" value={form.name} onChange={set('name')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
            <select className="input" value={form.category} onChange={set('category')}>
              {['Hospital', 'Bank', 'Government', 'University', 'Other'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
            <input className="input" value={form.email} onChange={set('email')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
            <input className="input" value={form.phone} onChange={set('phone')} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">Physical Address</label>
            <input className="input" value={form.address} onChange={set('address')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">County / City</label>
            <input className="input" value={form.county} onChange={set('county')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Website URL (optional)</label>
            <input className="input" placeholder="https://cgh.co.ke" value={form.website} onChange={set('website')} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Description <span className="text-gray-400">(150 chars)</span>
            </label>
            <textarea
              className="input resize-none"
              rows={3}
              maxLength={150}
              value={form.description}
              onChange={set('description')}
            />
            <p className="text-[11px] text-gray-400 mt-1 text-right">{form.description.length}/150</p>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }}
            className={`text-sm px-5 py-2 rounded-lg font-medium transition-colors ${
              saved ? 'bg-green-100 text-green-700 border border-green-300' : 'btn-primary'
            }`}
          >
            {saved ? '✓ Profile saved' : 'Save Profile'}
          </button>
          <button className="btn-secondary text-sm px-5 py-2">Discard Changes</button>
        </div>
      </div>

      {/* Public listing preview */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-3">
          Public Listing Preview
        </p>
        <div className="card overflow-hidden">
          <div className="h-20 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
            Logo placeholder
          </div>
          <div className="p-4">
            <div className="font-semibold text-sm text-gray-900 mb-1">{form.name}</div>
            <span className="bg-blue-100 text-blue-700 text-[10px] font-medium px-2 py-0.5 rounded mb-2 inline-block">
              {form.category}
            </span>
            <div className="text-yellow-400 text-xs mb-1">★★★★★ <span className="text-gray-400">4.8</span></div>
            <p className="text-xs text-gray-500 line-clamp-2 mb-1">{form.description}</p>
            <p className="text-xs text-gray-400">📍 {form.county}, Kenya</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Services tab ────────────────────────────────────────────────────────────
function ServicesTab() {
  const [services, setServices] = useState([
    { id:1, name:'General Consultation', duration:30, description:'Standard outpatient consultation', status:true  },
    { id:2, name:'Specialist Referral',  duration:45, description:'Referral to specialist clinics',   status:true  },
    { id:3, name:'Lab Test',             duration:20, description:'Blood work and sample testing',     status:true  },
    { id:4, name:'Radiology',            duration:30, description:'X-ray and imaging services',        status:false },
    { id:5, name:'Pharmacy Collection',  duration:15, description:'Prescription collection',           status:true  },
    { id:6, name:'Vaccination',          duration:20, description:'Routine and travel vaccinations',   status:true  },
  ])
  const [newSvc, setNewSvc] = useState({ name:'', duration:'', description:'' })
  const [editingId, setEditingId] = useState(null)

  const toggleStatus = id => {
    setServices(s => s.map(svc => svc.id === id ? { ...svc, status: !svc.status } : svc))
  }

  const deleteSvc = id => setServices(s => s.filter(svc => svc.id !== id))

  const addSvc = () => {
    if (!newSvc.name || !newSvc.duration) return
    setServices(s => [...s, { id: Date.now(), ...newSvc, duration: Number(newSvc.duration), status: true }])
    setNewSvc({ name:'', duration:'', description:'' })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{services.length} services configured</p>
      </div>

      {/* Services table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Service Name', 'Duration', 'Description', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((svc, i) => (
              <tr key={svc.id} className={`border-b border-gray-50 hover:bg-gray-50 ${i === services.length - 1 ? 'border-0' : ''}`}>
                <td className="px-4 py-3 font-medium text-gray-800">{svc.name}</td>
                <td className="px-4 py-3 text-gray-600">{svc.duration} min</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{svc.description}</td>
                <td className="px-4 py-3">
                  <Toggle on={svc.status} onChange={() => toggleStatus(svc.id)} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(svc.id)}
                      className="text-blue-400 hover:text-blue-600 text-base"
                      title="Edit"
                    >✏️</button>
                    <button
                      onClick={() => deleteSvc(svc.id)}
                      className="text-red-400 hover:text-red-600 text-base"
                      title="Delete"
                    >🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Add service form */}
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Add New Service</h3>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Service Name</label>
            <input className="input text-sm" placeholder="e.g. Dental Checkup"
              value={newSvc.name} onChange={e => setNewSvc(s => ({ ...s, name: e.target.value }))} />
          </div>
          <div className="w-28">
            <label className="block text-xs text-gray-500 mb-1">Duration (min)</label>
            <input className="input text-sm" type="number" placeholder="30"
              value={newSvc.duration} onChange={e => setNewSvc(s => ({ ...s, duration: e.target.value }))} />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Description</label>
            <input className="input text-sm" placeholder="Short description"
              value={newSvc.description} onChange={e => setNewSvc(s => ({ ...s, description: e.target.value }))} />
          </div>
          <button onClick={addSvc} className="btn-primary text-xs px-4 py-2 whitespace-nowrap">
            + Add
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Business Hours tab ──────────────────────────────────────────────────────
function BusinessHoursTab() {
  const [saved, setSaved] = useState(false)
  const [hours, setHours] = useState([
    { day:'Monday',    open:'08:00 AM', close:'06:00 PM', enabled:true  },
    { day:'Tuesday',   open:'08:00 AM', close:'06:00 PM', enabled:true  },
    { day:'Wednesday', open:'08:00 AM', close:'06:00 PM', enabled:true  },
    { day:'Thursday',  open:'08:00 AM', close:'06:00 PM', enabled:true  },
    { day:'Friday',    open:'08:00 AM', close:'06:00 PM', enabled:true  },
    { day:'Saturday',  open:'09:00 AM', close:'02:00 PM', enabled:true  },
    { day:'Sunday',    open:'',         close:'',          enabled:false },
  ])

  const update = (i, field, val) => {
    setHours(h => h.map((row, idx) => idx === i ? { ...row, [field]: val } : row))
  }

  const applyWeekdays = () => {
    setHours(h => h.map(row =>
      ['Monday','Tuesday','Wednesday','Thursday','Friday'].includes(row.day)
        ? { ...row, open:'08:00 AM', close:'06:00 PM', enabled:true }
        : row
    ))
  }

  return (
    <div className="max-w-xl space-y-3">
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Day', 'Open Time', 'Close Time', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((row, i) => (
              <tr key={row.day} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3 text-sm font-medium text-gray-700 w-28">{row.day}</td>
                <td className="px-4 py-3">
                  {row.enabled
                    ? <input className="input text-xs w-28" value={row.open}
                        onChange={e => update(i, 'open', e.target.value)} />
                    : <span className="text-red-500 text-xs font-medium">Closed</span>
                  }
                </td>
                <td className="px-4 py-3">
                  {row.enabled &&
                    <input className="input text-xs w-28" value={row.close}
                      onChange={e => update(i, 'close', e.target.value)} />
                  }
                </td>
                <td className="px-4 py-3">
                  <Toggle on={row.enabled} onChange={v => update(i, 'enabled', v)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <button
        onClick={applyWeekdays}
        className="text-green-brand text-xs hover:underline"
      >
        Apply Mon–Fri hours to all weekdays
      </button>

      <div className="pt-1">
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }}
          className={`text-sm px-5 py-2 rounded-lg font-medium transition-colors ${
            saved ? 'bg-green-100 text-green-700 border border-green-300' : 'btn-primary'
          }`}
        >
          {saved ? '✓ Hours saved' : 'Save Hours'}
        </button>
      </div>
    </div>
  )
}

// ── Notifications tab ───────────────────────────────────────────────────────
function NotificationsTab() {
  const [saved, setSaved] = useState(false)
  const [email, setEmail] = useState('admin@cityhospital.co.ke')
  const [toggles, setToggles] = useState({
    newBooking:    true,
    cancelled:     true,
    noShow:        true,
    dailySummary:  true,
    weeklyReport:  false,
  })

  const ITEMS = [
    { key:'newBooking',   label:'New Booking Received',           desc:'Alert when a client books an appointment'         },
    { key:'cancelled',    label:'Appointment Cancelled by Client', desc:'Alert when a client cancels'                     },
    { key:'noShow',       label:'No-Show Alert',                  desc:'Alert when a client does not arrive'              },
    { key:'dailySummary', label:'Daily Summary Email at 6PM',     desc:'End-of-day appointment summary'                   },
    { key:'weeklyReport', label:'Weekly Report Email',            desc:'Every Monday morning performance summary'          },
  ]

  return (
    <div className="max-w-lg space-y-4">
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {ITEMS.map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-800">{item.label}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </div>
              <Toggle
                on={toggles[item.key]}
                onChange={v => setToggles(s => ({ ...s, [item.key]: v }))}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Notification Email</h3>
        <label className="block text-xs text-gray-500 mb-1">Send notifications to:</label>
        <input
          className="input text-sm"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <button
        onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }}
        className={`text-sm px-5 py-2 rounded-lg font-medium transition-colors ${
          saved ? 'bg-green-100 text-green-700 border border-green-300' : 'btn-primary'
        }`}
      >
        {saved ? '✓ Preferences saved' : 'Save Preferences'}
      </button>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────
export default function InstitutionSettings() {
  const [activeTab, setActiveTab] = useState('Institution Profile')

  return (
    <InstitutionLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy">Settings</h1>
        <p className="text-xs text-gray-400 mt-0.5 mb-5">City General Hospital / Settings</p>

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

        {activeTab === 'Institution Profile' && <ProfileTab />}
        {activeTab === 'Services'            && <ServicesTab />}
        {activeTab === 'Business Hours'      && <BusinessHoursTab />}
        {activeTab === 'Notifications'       && <NotificationsTab />}
      </div>
    </InstitutionLayout>
  )
}
