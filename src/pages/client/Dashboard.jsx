import { useNavigate } from 'react-router-dom'
import ClientLayout from '../../components/layout/ClientLayout'

const UPCOMING = [
  { institution:'City General Hospital', service:'General Consultation', date:'Jun 28, 9:00 AM', status:'approved' },
  { institution:'Equity Bank Westlands', service:'Account Opening',       date:'Jul 2, 2:00 PM',  status:'approved' },
  { institution:'Huduma Centre CBD',     service:'National ID Renewal',   date:'Jul 5, 10:30 AM', status:'pending'  },
]
const STATUS_BADGE = { approved:'badge-approved', pending:'badge-pending', rejected:'badge-rejected', cancelled:'badge-cancelled', completed:'badge-completed' }

export default function ClientDashboard() {
  const navigate = useNavigate()
  return (
    <ClientLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy mb-5">Dashboard</h1>

        {/* Welcome banner */}
        <div className="bg-green-brand rounded-xl p-4 flex items-center justify-between mb-5">
          <div>
            <div className="text-white font-semibold text-base">Good morning, Brian 👋</div>
            <div className="text-green-50 text-sm mt-0.5">You have 2 upcoming appointments this week.</div>
          </div>
          <span className="text-4xl opacity-40">📅</span>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5">
          {[
            { label:'Total Appointments', value:'24', icon:'📅', border:'border-l-blue-500' },
            { label:'Upcoming',           value:'2',  icon:'⏰', border:'border-l-green-brand' },
            { label:'Completed',          value:'20', icon:'✅', border:'border-l-blue-400' },
            { label:'Cancelled',          value:'2',  icon:'✕', border:'border-l-red-400' },
          ].map(k => (
            <div key={k.label} className={`card p-4 border-l-4 ${k.border}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{k.label}</div>
                  <div className="text-2xl font-bold text-gray-900">{k.value}</div>
                </div>
                <span className="text-lg">{k.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Upcoming appointments */}
          <div className="col-span-2 card p-4">
            <h2 className="font-semibold text-gray-800 text-sm mb-4">Upcoming Appointments</h2>
            <div className="space-y-3">
              {UPCOMING.map((a, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{a.institution}</div>
                    <div className="text-xs text-gray-500">{a.service}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{a.date}</span>
                    <span className={STATUS_BADGE[a.status]}>{a.status.charAt(0).toUpperCase()+a.status.slice(1)}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-green-brand text-xs mt-3 hover:underline" onClick={() => navigate('/client/appointments')}>
              View all appointments →
            </button>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Queue position */}
            <div className="card p-4 border-l-4 border-l-yellow-400">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Queue Position</h2>
              <div className="text-5xl font-bold text-navy text-center mb-1">4</div>
              <div className="text-xs text-gray-500 text-center mb-3">Your position</div>
              <div className="text-center mb-1">
                <div className="text-sm font-medium text-gray-800">City General Hospital</div>
                <div className="text-xs text-gray-500">General Consultation</div>
                <div className="text-xs text-yellow-600 font-medium mt-1">~20 min estimated wait</div>
              </div>
              <button className="btn-primary w-full text-xs py-1.5 mt-3">Track Queue</button>
            </div>

            {/* Quick actions */}
            <div className="card p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Quick Actions</h2>
              <div className="space-y-2">
                <button className="btn-primary w-full text-xs py-2" onClick={() => navigate('/institutions')}>Book New Appointment</button>
                <button className="btn-secondary w-full text-xs py-2" onClick={() => navigate('/institutions')}>Search Institutions</button>
                <button className="w-full text-xs py-2 text-gray-500 hover:text-navy" onClick={() => navigate('/client/appointments')}>View History</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}
