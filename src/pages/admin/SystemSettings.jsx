import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'

const TABS = ['General', 'Email Configuration', 'Security', 'Announcements', 'Maintenance']

// ── Shared Toggle ────────────────────────────────────────────────────────────
function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${
        on ? 'bg-green-brand' : 'bg-gray-200'
      }`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-colors transition-transform ${
        on ? 'translate-x-4' : 'translate-x-1'
      }`} />
    </button>
  )
}

// ── General Tab ──────────────────────────────────────────────────────────────
function GeneralTab() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    platformName:   'JIPANGE',
    platformUrl:    'https://jipange.co.ke',
    supportEmail:   'support@jipange.co.ke',
    language:       'English',
    timezone:       'Africa/Nairobi (UTC+3)',
    maxSlot:        '5',
    duration:       '30',
    currency:       'KES',
    dateFormat:     'DD/MM/YYYY',
  })
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* Form */}
      <div className="col-span-2 card p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Platform Configuration</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Platform Name</label>
            <input className="input" value={form.platformName} onChange={set('platformName')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Platform URL</label>
            <input className="input" value={form.platformUrl} onChange={set('platformUrl')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Support Email</label>
            <input className="input" value={form.supportEmail} onChange={set('supportEmail')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Default Language</label>
            <select className="input" value={form.language} onChange={set('language')}>
              {['English', 'Swahili', 'French'].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Default Timezone</label>
            <select className="input" value={form.timezone} onChange={set('timezone')}>
              {['Africa/Nairobi (UTC+3)', 'Africa/Lagos (UTC+1)', 'UTC'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Max Appointments Per Slot</label>
            <input className="input" type="number" value={form.maxSlot} onChange={set('maxSlot')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Default Appt Duration (min)</label>
            <input className="input" type="number" value={form.duration} onChange={set('duration')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Currency</label>
            <input className="input" value={form.currency} onChange={set('currency')} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">Date Format</label>
            <select className="input" value={form.dateFormat} onChange={set('dateFormat')}>
              {['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'].map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }}
            className={`text-sm px-5 py-2 rounded-lg font-medium transition-colors ${
              saved ? 'bg-green-100 text-green-700 border border-green-300' : 'btn-primary'
            }`}
          >
            {saved ? '✓ Settings saved' : 'Save General Settings'}
          </button>
          <button className="btn-secondary text-sm px-5 py-2">Reset to Defaults</button>
        </div>
      </div>

      {/* Platform Logo */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Platform Logo</h3>
        <p className="text-xs text-gray-400 mb-3">Current logo</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full border-2 border-green-brand flex items-center justify-center">
            <span className="text-green-brand font-bold text-sm">✓</span>
          </div>
          <span className="text-xs text-gray-600 font-medium">JIPANGE</span>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary text-xs px-3 py-1.5">Upload new logo</button>
          <button className="btn-secondary text-xs px-3 py-1.5">Remove</button>
        </div>
      </div>
    </div>
  )
}

// ── Email Configuration Tab ──────────────────────────────────────────────────
function EmailConfigTab() {
  const [tested, setTested]   = useState(false)
  const [saved, setSaved]     = useState(false)
  const [smtp, setSmtp]       = useState({
    host: 'smtp.gmail.com', port: '587',
    user: 'noreply@jipange.co.ke', password: '••••••••••••',
    fromName: 'JIPANGE', fromEmail: 'noreply@jipange.co.ke',
  })
  const set = k => e => setSmtp(s => ({ ...s, [k]: e.target.value }))

  const TEMPLATES = [
    { name:'Booking Confirmed',    edited:'Jun 20, 2025' },
    { name:'Appointment Approved', edited:'Jun 18, 2025' },
    { name:'Appointment Rejected', edited:'Jun 18, 2025' },
    { name:'Reminder',             edited:'Jun 15, 2025' },
    { name:'Account Verified',     edited:'Jun 10, 2025' },
  ]

  return (
    <div className="max-w-2xl space-y-4">
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">SMTP Configuration</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">SMTP Host</label>
            <input className="input" value={smtp.host} onChange={set('host')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">SMTP Port</label>
            <input className="input" value={smtp.port} onChange={set('port')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">SMTP Username</label>
            <input className="input" value={smtp.user} onChange={set('user')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">SMTP Password</label>
            <input className="input" type="password" value={smtp.password} onChange={set('password')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">From Name</label>
            <input className="input" value={smtp.fromName} onChange={set('fromName')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">From Email</label>
            <input className="input" value={smtp.fromEmail} onChange={set('fromEmail')} />
          </div>
        </div>
        <div className="flex gap-3 mt-4 items-center">
          <button
            onClick={() => { setTested(true); setTimeout(() => setTested(false), 2500) }}
            className="btn-secondary text-xs px-4 py-2"
          >
            Test Email Connection
          </button>
          {tested && <span className="text-green-brand text-xs font-medium">✓ Connection successful</span>}
        </div>
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }}
          className={`mt-3 text-sm px-5 py-2 rounded-lg font-medium transition-colors ${
            saved ? 'bg-green-100 text-green-700 border border-green-300' : 'btn-primary'
          }`}
        >
          {saved ? '✓ Config saved' : 'Save Email Config'}
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Email Templates</h3>
        </div>
        {TEMPLATES.map((t, i) => (
          <div key={t.name} className={`flex items-center justify-between px-5 py-3 ${i < TEMPLATES.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-gray-50`}>
            <div>
              <div className="text-sm font-medium text-gray-800">{t.name}</div>
              <div className="text-xs text-gray-400">Last edited: {t.edited}</div>
            </div>
            <div className="flex gap-2">
              <button className="text-xs text-gray-500 hover:text-navy border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50">Edit Template</button>
              <button className="text-xs text-gray-500 hover:text-navy border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50">Preview</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Security Tab ─────────────────────────────────────────────────────────────
function SecurityTab() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    jwtExpiry:   '24h',
    maxAttempts: '5',
    rateLimit:   '10',
    minLength:   8,
    uppercase:   true,
    number:      true,
    special:     false,
  })
  const set = k => e => setSettings(s => ({ ...s, [k]: e.target.value }))
  const tog = k => v => setSettings(s => ({ ...s, [k]: v }))

  const AUDIT = [
    { ip:'41.90.64.12',  action:'Institution verified — City General Hospital', time:'2 min ago'  },
    { ip:'197.248.1.5',  action:'User suspended — Fatuma Hassan',               time:'1 hr ago'   },
    { ip:'41.90.64.12',  action:'Platform settings updated',                    time:'3 hr ago'   },
    { ip:'154.123.8.99', action:'Failed login attempt — unknown user',          time:'5 hr ago'   },
    { ip:'41.90.64.12',  action:'Admin logged in',                              time:'6 hr ago'   },
  ]

  return (
    <div className="max-w-2xl space-y-4">
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Authentication Settings</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">JWT Token Expiry</label>
            <select className="input" value={settings.jwtExpiry} onChange={set('jwtExpiry')}>
              {['1h','6h','24h','7 days'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Max Login Attempts</label>
            <input className="input" type="number" value={settings.maxAttempts} onChange={set('maxAttempts')} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">Rate Limit — Auth endpoints (req/15min)</label>
            <input className="input" type="number" value={settings.rateLimit} onChange={set('rateLimit')} />
          </div>
        </div>

        <h3 className="text-sm font-semibold text-gray-800 mb-3">Password Policy</h3>
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Minimum Length: {settings.minLength}</label>
            <input className="w-full accent-green-brand" type="range" min="6" max="20"
              value={settings.minLength}
              onChange={e => setSettings(s => ({ ...s, minLength: Number(e.target.value) }))} />
          </div>
          {[
            { key:'uppercase', label:'Require uppercase letter' },
            { key:'number',    label:'Require number'           },
            { key:'special',   label:'Require special character'},
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{item.label}</span>
              <Toggle on={settings[item.key]} onChange={tog(item.key)} />
            </div>
          ))}
        </div>

        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }}
          className={`text-sm px-5 py-2 rounded-lg font-medium transition-colors ${
            saved ? 'bg-green-100 text-green-700 border border-green-300' : 'btn-primary'
          }`}
        >
          {saved ? '✓ Settings saved' : 'Save Security Settings'}
        </button>
      </div>

      <div className="card p-5 border border-red-100">
        <h3 className="text-sm font-semibold text-red-600 mb-3">Session Management</h3>
        <p className="text-xs text-gray-500 mb-3">Force all active users to log out immediately. They will need to sign in again.</p>
        <button className="text-xs px-4 py-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-50 font-medium">
          Force logout all users
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Audit Log</h3>
          <button className="text-green-brand text-xs hover:underline">View Full Audit Log</button>
        </div>
        {AUDIT.map((a, i) => (
          <div key={i} className={`flex items-center justify-between px-5 py-2.5 ${i < AUDIT.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-gray-50`}>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{a.ip}</span>
              <span className="text-xs text-gray-700">{a.action}</span>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Announcements Tab ────────────────────────────────────────────────────────
function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState([
    { id:1, title:'System Maintenance Notice',    msg:'The platform will be offline for scheduled maintenance on Jun 27 from 2AM–4AM EAT.',  audience:'All Users',         status:'active',    start:'Jun 26', end:'Jun 27' },
    { id:2, title:'New Feature: Queue Tracking',  msg:'Clients can now track their real-time queue position from their dashboard.',           audience:'All Users',         status:'scheduled', start:'Jul 1',  end:'Jul 7'  },
  ])
  const [form, setForm] = useState({ title:'', msg:'', audience:'All Users', start:'', end:'' })
  const [saved, setSaved] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const STATUS_BADGE = { active:'badge-approved', scheduled:'badge-pending', expired:'badge-cancelled' }

  return (
    <div className="max-w-2xl space-y-4">
      {/* Active announcements */}
      <div className="space-y-3">
        {announcements.map(a => (
          <div key={a.id} className="card p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="font-semibold text-sm text-gray-900">{a.title}</div>
              <span className={STATUS_BADGE[a.status]}>{a.status.charAt(0).toUpperCase()+a.status.slice(1)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-2 leading-relaxed">{a.msg}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>👥 {a.audience}</span>
              <span>📅 {a.start} — {a.end}</span>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
              <button className="text-xs text-gray-500 hover:text-navy border border-gray-200 px-3 py-1 rounded-lg">Edit</button>
              <button
                onClick={() => setAnnouncements(list => list.filter(x => x.id !== a.id))}
                className="text-xs text-red-400 hover:text-red-600 border border-red-100 px-3 py-1 rounded-lg"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Create form */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Create New Announcement</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
            <input className="input" placeholder="Announcement title" value={form.title} onChange={set('title')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Message</label>
            <textarea className="input resize-none" rows={3} placeholder="Announcement message..." value={form.msg} onChange={set('msg')} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Audience</label>
              <select className="input" value={form.audience} onChange={set('audience')}>
                {['All Users','Institutions Only','Clients Only'].map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
              <input className="input" type="date" value={form.start} onChange={set('start')} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
              <input className="input" type="date" value={form.end} onChange={set('end')} />
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            if (!form.title || !form.msg) return
            setAnnouncements(list => [...list, { id: Date.now(), title:form.title, msg:form.msg, audience:form.audience, status:'scheduled', start:form.start||'Today', end:form.end||'—' }])
            setForm({ title:'', msg:'', audience:'All Users', start:'', end:'' })
            setSaved(true); setTimeout(() => setSaved(false), 2000)
          }}
          className={`mt-4 text-sm px-5 py-2 rounded-lg font-medium transition-colors ${
            saved ? 'bg-green-100 text-green-700 border border-green-300' : 'btn-primary'
          }`}
        >
          {saved ? '✓ Published' : 'Publish Announcement'}
        </button>
      </div>
    </div>
  )
}

// ── Maintenance Tab ──────────────────────────────────────────────────────────
function MaintenanceTab() {
  const [maintenance, setMaintenance] = useState(false)
  const [notify24h, setNotify24h]     = useState(true)
  const [autoNotify, setAutoNotify]   = useState(true)
  const [healthRan, setHealthRan]     = useState(false)

  const HEALTH = [
    { label:'Database Connection', status:'Healthy' },
    { label:'Email Service',       status:'Healthy' },
    { label:'API Server',          status:'Healthy' },
    { label:'Frontend Deployment', status:'Healthy' },
  ]

  return (
    <div className="max-w-2xl space-y-4">
      {/* Maintenance mode */}
      <div className={`card p-5 ${maintenance ? 'border border-red-200' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Maintenance Mode</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              When enabled, all users except admins will see a maintenance page.
            </p>
          </div>
          <Toggle on={maintenance} onChange={setMaintenance} />
        </div>
        {maintenance && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mt-2">
            <p className="text-xs text-red-600 font-medium">
              ⚠ Enabling this will immediately block all 1,284 users from accessing the platform.
            </p>
          </div>
        )}

        <div className="border-t border-gray-100 mt-4 pt-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-3">Scheduled Maintenance</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date &amp; Time</label>
              <input className="input text-sm" type="datetime-local" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Estimated Downtime</label>
              <select className="input text-sm">
                {['30 minutes','1 hour','2 hours','4 hours'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Notify users in advance</span>
              <Toggle on={notify24h} onChange={setNotify24h} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Send notification 24h before</span>
              <Toggle on={autoNotify} onChange={setAutoNotify} />
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-800">System Health</h3>
          <button
            onClick={() => { setHealthRan(true); setTimeout(() => setHealthRan(false), 2000) }}
            className="btn-secondary text-xs px-3 py-1.5"
          >
            {healthRan ? '✓ All healthy' : 'Run Health Check'}
          </button>
        </div>
        <div className="space-y-3">
          {HEALTH.map(h => (
            <div key={h.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{h.label}</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-green-600 font-medium">{h.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Data Management</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-800">Export All Platform Data</div>
              <div className="text-xs text-gray-400">Full JSON export of all platform records</div>
            </div>
            <button className="btn-secondary text-xs px-3 py-1.5">Export</button>
          </div>
          <div className="border-t border-gray-50 pt-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-800">Clear Test / Seed Data</div>
              <div className="text-xs text-gray-400">Removes demo institutions and test accounts</div>
            </div>
            <button className="text-xs px-3 py-1.5 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-50">Clear</button>
          </div>
          <div className="border-t border-gray-50 pt-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-800">Database Backup</div>
              <div className="text-xs text-gray-400">Last backup: Today 3:00 AM</div>
            </div>
            <button className="btn-secondary text-xs px-3 py-1.5">Backup Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState('General')

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy">Platform Settings</h1>
        <p className="text-xs text-gray-400 mt-0.5 mb-5">Admin Console / Settings</p>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-green-brand border-b-2 border-green-brand font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'General'             && <GeneralTab />}
        {activeTab === 'Email Configuration' && <EmailConfigTab />}
        {activeTab === 'Security'            && <SecurityTab />}
        {activeTab === 'Announcements'       && <AnnouncementsTab />}
        {activeTab === 'Maintenance'         && <MaintenanceTab />}
      </div>
    </AdminLayout>
  )
}
