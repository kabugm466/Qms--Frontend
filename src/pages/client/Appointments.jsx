import { useState } from 'react'
import ClientLayout from '../../components/layout/ClientLayout'
import EmptyState from '../../components/common/EmptyState'

const ALL = [
  { institution:'City General Hospital', service:'General Consultation', date:'Jun 28, 9:00 AM',  bookedOn:'Jun 20, 2024', status:'approved'  },
  { institution:'Equity Bank Westlands', service:'Account Opening',       date:'Jul 2, 2:00 PM',   bookedOn:'Jun 22, 2024', status:'pending'   },
  { institution:'Huduma Centre CBD',     service:'National ID Renewal',   date:'Jul 5, 10:30 AM',  bookedOn:'Jun 23, 2024', status:'approved'  },
  { institution:'KRA Times Tower',       service:'iTax PIN Registration', date:'Jun 10, 11:00 AM', bookedOn:'Jun 5, 2024',  status:'completed' },
  { institution:'University of Nairobi', service:'Student Records',       date:'Jun 8, 3:00 PM',   bookedOn:'Jun 1, 2024',  status:'completed' },
  { institution:'Aga Khan Hospital',     service:'Specialist Referral',   date:'May 30, 9:30 AM',  bookedOn:'May 25, 2024', status:'rejected'  },
  { institution:'National Savings Bank', service:'Loan Application',      date:'May 20, 2:00 PM',  bookedOn:'May 15, 2024', status:'cancelled' },
  { institution:'Huduma Centre CBD',     service:'Passport Application',  date:'May 10, 10:00 AM', bookedOn:'May 3, 2024',  status:'completed' },
]
const TABS = ['All (24)','Upcoming (2)','Completed (20)','Cancelled (2)']
const BADGE = { approved:'badge-approved', pending:'badge-pending', rejected:'badge-rejected', cancelled:'badge-cancelled', completed:'badge-completed' }

export default function ClientAppointments() {
  const [activeTab, setActiveTab] = useState('All (24)')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')

  const filtered = ALL.filter(a =>
    a.institution.toLowerCase().includes(search.toLowerCase()) ||
    a.service.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <ClientLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy mb-5">My Appointments</h1>

        {/* Search bar */}
        <div className="flex items-center gap-3 mb-4">
          <input className="input flex-1" placeholder="Search appointments..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="input w-32" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            {['All Status','Pending','Approved','Rejected','Cancelled','Completed'].map(s => <option key={s}>{s}</option>)}
          </select>
          <button className="btn-primary px-5">Search</button>
          <button className="btn-secondary flex items-center gap-1.5 px-3 text-sm">↓ Export CSV</button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeTab === tab ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          {filtered.length === 0 ? (
            <EmptyState
              icon="📅"
              title="No appointments found"
              message={search ? `No results matching "${search}". Try a different search term.` : "You haven't booked any appointments yet."}
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {['Institution','Service','Date & Time','Booked On','Status','Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800">{a.institution}</td>
                      <td className="px-4 py-3 text-gray-600">{a.service}</td>
                      <td className="px-4 py-3 text-gray-600">{a.date}</td>
                      <td className="px-4 py-3 text-gray-500">{a.bookedOn}</td>
                      <td className="px-4 py-3"><span className={BADGE[a.status]}>{a.status.charAt(0).toUpperCase()+a.status.slice(1)}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-400 hover:text-blue-600 text-base" title="View">👁</button>
                          {(a.status === 'approved' || a.status === 'pending') &&
                            <button className="text-red-300 hover:text-red-500 text-base" title="Cancel">✕</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">Page 1 of 3 · 24 results</span>
                <div className="flex gap-2">
                  <button className="btn-secondary text-xs px-3 py-1.5">← Prev</button>
                  <button className="btn-secondary text-xs px-3 py-1.5">Next →</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ClientLayout>
  )
}
