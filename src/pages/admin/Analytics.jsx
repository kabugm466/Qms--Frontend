import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'

const PERIODS = ['This Week', 'This Month', 'Last 3 Months', 'This Year', 'Custom']

// ── User Growth Trend data (Jan–Jun 2025) ───────────────────────────────────
const GROWTH = [
  { month:'Jan', users:200  },
  { month:'Feb', users:380  },
  { month:'Mar', users:520  },
  { month:'Apr', users:740  },
  { month:'May', users:980  },
  { month:'Jun', users:1284 },
]

// ── Monthly Appointment Volume ───────────────────────────────────────────────
const MONTHLY = [
  { month:'Jan', booked:420,  completed:310 },
  { month:'Feb', booked:510,  completed:390 },
  { month:'Mar', booked:580,  completed:420 },
  { month:'Apr', booked:720,  completed:540 },
  { month:'May', booked:890,  completed:650 },
  { month:'Jun', booked:3842, completed:2841 },
]

// ── Appointments by Category ─────────────────────────────────────────────────
const BY_CAT = [
  { label:'Hospital',   count:3241, pct:100, color:'bg-green-brand' },
  { label:'Government', count:2876, pct:89,  color:'bg-navy'        },
  { label:'Bank',       count:1654, pct:51,  color:'bg-blue-500'    },
  { label:'University', count:743,  pct:23,  color:'bg-gold-brand'  },
  { label:'Other',      count:127,  pct:4,   color:'bg-gray-300'    },
]

// ── Top 5 Institutions ────────────────────────────────────────────────────────
const TOP5 = [
  { rank:1, name:'City General Hospital', cat:'Hospital',   catColor:'bg-blue-100 text-blue-700',   appts:2341, trend:'↑', pct:100 },
  { rank:2, name:'Huduma Centre CBD',     cat:'Government', catColor:'bg-yellow-100 text-yellow-700',appts:1876, trend:'↑', pct:80  },
  { rank:3, name:'National Savings Bank', cat:'Bank',       catColor:'bg-purple-100 text-purple-700',appts:1205, trend:'↑', pct:52  },
  { rank:4, name:'KRA Times Tower',       cat:'Government', catColor:'bg-yellow-100 text-yellow-700',appts:1102, trend:'→', pct:47  },
  { rank:5, name:'Equity Bank Karen',     cat:'Bank',       catColor:'bg-purple-100 text-purple-700',appts:654,  trend:'↓', pct:28  },
]

// ── County distribution ──────────────────────────────────────────────────────
const COUNTIES = [
  { name:'Nairobi',  count:6102 },
  { name:'Mombasa',  count:987  },
  { name:'Kisumu',   count:654  },
  { name:'Nakuru',   count:432  },
  { name:'Other',    count:466  },
]

const maxGrowth  = Math.max(...GROWTH.map(d => d.users))
const maxMonthly = Math.max(...MONTHLY.map(d => d.booked))

export default function AdminAnalytics() {
  const [period, setPeriod] = useState('This Month')
  const [reportSaved, setReportSaved] = useState(false)

  return (
    <AdminLayout>
      <div className="p-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl font-semibold text-navy">Platform Analytics</h1>
            <p className="text-xs text-gray-400 mt-0.5">Admin Console / Analytics</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Period selector */}
            <div className="flex gap-1">
              {PERIODS.map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                    period === p
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >{p}</button>
              ))}
            </div>
            <button
              onClick={() => { setReportSaved(true); setTimeout(() => setReportSaved(false), 2000) }}
              className={`text-xs px-4 py-1.5 rounded-lg font-medium transition-colors ${
                reportSaved ? 'bg-green-100 text-green-700 border border-green-300' : 'btn-primary'
              }`}
            >
              {reportSaved ? '✓ Exported' : 'Export Full Report'}
            </button>
            <button className="btn-secondary text-xs px-4 py-1.5">Schedule Report</button>
          </div>
        </div>

        {/* KPI cards — 6 in 2 rows of 3 */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { label:'New Users This Month',      value:'284',       sub:'+22% vs last month',    subColor:'text-green-600', icon:'👥', border:'border-l-blue-400'  },
            { label:'New Institutions',           value:'6',         sub:'+2 vs last month',      subColor:'text-green-600', icon:'🏢', border:'border-l-green-brand'},
            { label:'Total Appointments',         value:'3,842',     sub:'This month',            subColor:'text-gray-400',  icon:'📅', border:'border-l-blue-300'  },
            { label:'Revenue Potential',          value:'KES 384K',  sub:'@ KES 100/booking',     subColor:'text-gray-400',  icon:'📈', border:'border-l-gold-brand' },
            { label:'Avg Appts / Institution',    value:'103',       sub:'This month',            subColor:'text-gray-400',  icon:'📊', border:'border-l-navy'      },
            { label:'Completion Rate',            value:'74%',       sub:'Platform-wide',         subColor:'text-green-600', icon:'✅', border:'border-l-green-brand'},
          ].map(k => (
            <div key={k.label} className={`card p-4 border-l-4 ${k.border}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{k.label}</div>
                  <div className="text-2xl font-bold text-gray-900">{k.value}</div>
                  <div className={`text-xs mt-0.5 ${k.subColor}`}>{k.sub}</div>
                </div>
                <span className="text-lg opacity-60">{k.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-2 gap-4 mb-4">

          {/* User Growth Trend — line chart */}
          <div className="card p-4">
            <h2 className="font-semibold text-gray-800 text-sm mb-1">User Growth Trend</h2>
            <p className="text-xs text-gray-400 mb-4">Cumulative registered users Jan–Jun 2025</p>
            <div className="relative h-36">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-4 flex flex-col justify-between text-[10px] text-gray-400 w-8">
                {[1284,980,740,520,380,200].map(v => <span key={v}>{v}</span>)}
              </div>
              {/* Chart area */}
              <div className="ml-9 h-full flex items-end gap-0 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0,1,2,3,4,5].map(i => (
                    <div key={i} className="border-t border-gray-100 w-full" />
                  ))}
                </div>
                {/* Data points + line */}
                <svg className="absolute inset-0 w-full h-full overflow-visible">
                  <polyline
                    fill="none"
                    stroke="#00A86B"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    points={GROWTH.map((d, i) => {
                      const x = (i / (GROWTH.length - 1)) * 100
                      const y = 100 - (d.users / maxGrowth) * 88
                      return `${x}%,${y}%`
                    }).join(' ')}
                  />
                  {GROWTH.map((d, i) => {
                    const x = (i / (GROWTH.length - 1)) * 100
                    const y = 100 - (d.users / maxGrowth) * 88
                    return (
                      <circle key={i} cx={`${x}%`} cy={`${y}%`}
                        r="4" fill="#00A86B" stroke="white" strokeWidth="1.5" />
                    )
                  })}
                </svg>
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between translate-y-5">
                  {GROWTH.map(d => (
                    <span key={d.month} className="text-[10px] text-gray-400">{d.month}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Appointment Volume — grouped bar chart */}
          <div className="card p-4">
            <h2 className="font-semibold text-gray-800 text-sm mb-1">Monthly Appointment Volume</h2>
            <p className="text-xs text-gray-400 mb-4">Booked vs Completed per month</p>
            <div className="flex items-end gap-3 h-36">
              {MONTHLY.map((d, i) => {
                const bookedH  = (d.booked    / maxMonthly) * 100
                const completedH = (d.completed / maxMonthly) * 100
                return (
                  <div key={i} className="flex flex-col items-center flex-1 gap-1">
                    <div className="flex items-end gap-0.5 w-full justify-center" style={{ height:'120px' }}>
                      <div className="flex-1 bg-navy rounded-t-sm" style={{ height:`${bookedH}%` }} title={`Booked: ${d.booked}`} />
                      <div className="flex-1 bg-green-brand rounded-t-sm" style={{ height:`${completedH}%` }} title={`Completed: ${d.completed}`} />
                    </div>
                    <span className="text-[10px] text-gray-400">{d.month}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex gap-4 mt-5 text-xs text-gray-500">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-navy" /> Booked</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-brand" /> Completed</div>
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-2 gap-4 mb-4">

          {/* Appointments by Category — horizontal bars */}
          <div className="card p-4">
            <h2 className="font-semibold text-gray-800 text-sm mb-4">Appointments by Category</h2>
            <div className="space-y-3">
              {BY_CAT.map(c => (
                <div key={c.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700 font-medium">{c.label}</span>
                    <span className="font-semibold text-navy">{c.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${c.color}`} style={{ width:`${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Institutions — leaderboard */}
          <div className="card p-4">
            <h2 className="font-semibold text-gray-800 text-sm mb-4">Top 5 Institutions by Volume</h2>
            <div className="space-y-3">
              {TOP5.map(inst => (
                <div key={inst.rank} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-navy rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    {inst.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-800 truncate">{inst.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${inst.catColor}`}>{inst.cat}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-green-brand h-1.5 rounded-full" style={{ width:`${inst.pct}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-xs font-semibold text-navy">{inst.appts.toLocaleString()}</span>
                    <span className={`text-xs font-bold ${
                      inst.trend === '↑' ? 'text-green-600' :
                      inst.trend === '↓' ? 'text-red-500' : 'text-gray-400'
                    }`}>{inst.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="card p-4">
          <h2 className="font-semibold text-gray-800 text-sm mb-4">Geographic Distribution</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Map placeholder */}
            <div className="col-span-2 bg-gray-100 rounded-xl flex flex-col items-center justify-center h-36 border border-dashed border-gray-200">
              <div className="text-2xl mb-1">🗺</div>
              <p className="text-xs text-gray-400 font-medium">Kenya Map — Appointment Heatmap by County</p>
              <p className="text-[11px] text-gray-300 mt-0.5">Darker shading = higher volume</p>
            </div>
            {/* County table */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-500 mb-3">Appointments by County</div>
              {COUNTIES.map(c => (
                <div key={c.name} className="flex justify-between items-center">
                  <span className="text-xs text-gray-700">{c.name}</span>
                  <span className="text-xs font-semibold text-navy">{c.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}
