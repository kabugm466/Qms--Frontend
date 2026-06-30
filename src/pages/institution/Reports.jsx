import { useState } from "react";
import InstitutionLayout from "../../components/layout/InstitutionLayout";

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const BAR_DATA = [34,42,38,51,48,22,0];
const HOURS = ["8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM"];
const HEATMAP = [
  [2,4,6,7,5,4,3,2,1,0],
  [3,5,8,9,7,6,4,3,2,1],
  [2,4,7,8,6,5,4,3,2,1],
  [3,5,7,8,6,5,4,3,2,1],
  [3,5,7,8,7,5,4,3,2,1],
  [1,2,3,4,3,2,2,1,1,0],
  [0,0,0,0,0,0,0,0,0,0],
];
const SERVICES = [
  { name:"General Consultation", count:112, pct:100 },
  { name:"Lab Tests",            count:89,  pct:79  },
  { name:"Specialist Referral",  count:64,  pct:57  },
  { name:"Radiology",            count:47,  pct:42  },
  { name:"Pharmacy",             count:30,  pct:27  },
];

const maxBar = Math.max(...BAR_DATA);

function heatColor(val) {
  if (val === 0) return "bg-gray-100";
  if (val <= 2) return "bg-green-100";
  if (val <= 4) return "bg-green-200";
  if (val <= 6) return "bg-green-400";
  return "bg-green-600";
}

export default function Reports() {
  const [period, setPeriod] = useState("This Month");

  return (
    <InstitutionLayout>
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl font-semibold text-navy">Reports</h1>
            <p className="text-xs text-gray-400 mt-0.5">City General Hospital / Reports</p>
          </div>
          <div className="flex gap-1">
            {["This Week","This Month","Last 3 Months","Custom Range"].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  period === p ? "bg-navy text-white border-navy" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}>{p}</button>
            ))}
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5">
          {[
            { label:"Total Appointments", value:"342",   sub:"+12% vs last month",  subColor:"text-green-600", icon:"📅", border:"border-l-blue-400" },
            { label:"Completion Rate",    value:"78%",   sub:"This month",          subColor:"text-gray-400",  icon:"✅", border:"border-l-green-brand" },
            { label:"No-Show Rate",       value:"14%",   sub:"This month",          subColor:"text-gray-400",  icon:"⏰", border:"border-l-yellow-400" },
            { label:"Avg Wait Time",      value:"22 min",sub:"Per appointment",     subColor:"text-gray-400",  icon:"⏱", border:"border-l-blue-300" },
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

        {/* Charts row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Bar chart */}
          <div className="card p-4">
            <h2 className="font-semibold text-gray-800 text-sm mb-1">Daily Appointment Volume</h2>
            <p className="text-xs text-gray-400 mb-4">This Week</p>
            <div className="flex items-end gap-3 h-32">
              {BAR_DATA.map((val, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-1">
                  <span className="text-[10px] text-gray-500">{val || ""}</span>
                  <div
                    className="w-full bg-green-brand rounded-t-sm transition-all"
                    style={{ height: val ? `${(val/maxBar)*100}%` : "4px", opacity: val ? 1 : 0.15 }}
                  />
                  <span className="text-[10px] text-gray-400">{DAYS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut chart */}
          <div className="card p-4">
            <h2 className="font-semibold text-gray-800 text-sm mb-4">Appointment Status Breakdown</h2>
            <div className="flex items-center gap-6">
              {/* SVG donut */}
              <div className="relative flex-shrink-0">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#e5e7eb" strokeWidth="14" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#00A86B" strokeWidth="14"
                    strokeDasharray={`${0.78 * 2 * Math.PI * 38} ${2 * Math.PI * 38}`}
                    strokeDashoffset={`${0.25 * 2 * Math.PI * 38}`}
                    transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#FBBF24" strokeWidth="14"
                    strokeDasharray={`${0.14 * 2 * Math.PI * 38} ${2 * Math.PI * 38}`}
                    strokeDashoffset={`${(0.25 - 0.78) * 2 * Math.PI * 38}`}
                    transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#D1D5DB" strokeWidth="14"
                    strokeDasharray={`${0.08 * 2 * Math.PI * 38} ${2 * Math.PI * 38}`}
                    strokeDashoffset={`${(0.25 - 0.92) * 2 * Math.PI * 38}`}
                    transform="rotate(-90 50 50)" />
                  <text x="50" y="47" textAnchor="middle" className="text-xs" fontSize="14" fontWeight="bold" fill="#1E3A8A">342</text>
                  <text x="50" y="59" textAnchor="middle" fontSize="8" fill="#9CA3AF">Total</text>
                </svg>
              </div>
              <div className="space-y-2">
                {[{c:"bg-green-brand",l:"Completed",v:"78%"},{c:"bg-gold-brand",l:"No-Show",v:"14%"},{c:"bg-gray-300",l:"Cancelled",v:"8%"}].map(d => (
                  <div key={d.l} className="flex items-center gap-2 text-xs">
                    <div className={`w-3 h-3 rounded-sm ${d.c} flex-shrink-0`} />
                    <span className="text-gray-700">{d.l}</span>
                    <span className="font-semibold text-gray-900 ml-auto">{d.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second charts row */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {/* Heatmap */}
          <div className="card p-4">
            <h2 className="font-semibold text-gray-800 text-sm mb-1">Peak Hours Heatmap</h2>
            <p className="text-xs text-gray-400 mb-3">Busiest: Tue 10AM–11AM</p>
            <div className="overflow-x-auto">
              <div className="flex gap-1 mb-1 ml-8">
                {HOURS.map(h => <div key={h} className="w-8 text-[9px] text-gray-400 text-center">{h}</div>)}
              </div>
              {HEATMAP.map((row, di) => (
                <div key={di} className="flex gap-1 mb-1 items-center">
                  <div className="w-7 text-[9px] text-gray-400 text-right pr-1">{DAYS[di]}</div>
                  {row.map((val, hi) => (
                    <div key={hi} className={`w-8 h-5 rounded-sm ${heatColor(val)}`} title={`${DAYS[di]} ${HOURS[hi]}: ${val}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Top services */}
          <div className="card p-4">
            <h2 className="font-semibold text-gray-800 text-sm mb-4">Top Services by Volume</h2>
            <div className="space-y-3">
              {SERVICES.map(s => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700">{s.name}</span>
                    <span className="font-semibold text-navy">{s.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-navy h-2 rounded-full" style={{ width:`${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export buttons */}
        <div className="flex gap-3">
          <button className="btn-primary text-xs px-5 py-2">Export Report as PDF</button>
          <button className="btn-secondary text-xs px-5 py-2">Export as CSV</button>
        </div>
      </div>
    </InstitutionLayout>
  );
}
