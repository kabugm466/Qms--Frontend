import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const INSTITUTIONS = [
  { initials:'CGH', cat:'Hospital',   name:'City General Hospital',      loc:'Nairobi CBD',  rating:'4.8', services:8,  desc:'Full-service hospital with 24/7 emergency care, specialist clinics and diagnostic labs.' },
  { initials:'NSB', cat:'Bank',       name:'National Savings Bank',      loc:'Westlands',    rating:'4.5', services:6,  desc:'Leading commercial bank offering savings, loans, forex, and investment products.' },
  { initials:'HC',  cat:'Government', name:'Huduma Centre CBD',          loc:'Nairobi CBD',  rating:'4.2', services:12, desc:'Government one-stop shop for national ID, passport, NHIF, NSSF registrations.' },
  { initials:'UON', cat:'University', name:'University of Nairobi',      loc:'Parklands',    rating:'4.6', services:5,  desc:"Kenya's oldest and largest university offering admissions, student services and records." },
  { initials:'KRA', cat:'Government', name:'Kenya Revenue Authority',    loc:'Times Tower',  rating:'3.9', services:7,  desc:'Tax authority handling iTax returns, PIN registration, customs and excise services.' },
  { initials:'EBK', cat:'Bank',       name:'Equity Bank Karen',          loc:'Karen, Nairobi',rating:'4.4',services:6,  desc:'Community-focused bank serving retail and SME clients with digital and branch banking.' },
]
const CAT_COLORS = { Hospital:'bg-blue-100 text-blue-700', Bank:'bg-purple-100 text-purple-700', Government:'bg-yellow-100 text-yellow-700', University:'bg-green-100 text-green-700' }

function PublicNav() {
  const navigate = useNavigate()
  return (
    <nav className="bg-white border-b border-gray-200 px-8 h-14 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/home')}>
        <div className="w-6 h-6 rounded-full border-2 border-green-brand flex items-center justify-center">
          <span className="text-green-brand text-[10px] font-bold">✓</span>
        </div>
        <span className="text-navy font-bold text-sm tracking-wide">JIPANGE</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <a className="hover:text-navy cursor-pointer" onClick={() => navigate('/home')}>Home</a>
        <a className="text-navy font-medium cursor-pointer">Institutions</a>
        <a className="hover:text-navy cursor-pointer">About</a>
        <a className="hover:text-navy cursor-pointer">Contact</a>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn-secondary text-xs px-4 py-1.5" onClick={() => navigate('/login')}>Login</button>
        <button className="btn-primary text-xs px-4 py-1.5" onClick={() => navigate('/register')}>Register</button>
      </div>
    </nav>
  )
}

export default function ListingPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All Categories')
  const [loc, setLoc] = useState('All Locations')

  const filtered = INSTITUTIONS.filter(i =>
    (cat === 'All Categories' || i.cat === cat) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-page font-poppins">
      <PublicNav />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-xs text-gray-500 mb-1">Home / Institutions</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Browse Institutions</h1>
        <p className="text-sm text-gray-500 mb-5">Find and book appointments at registered institutions across Kenya</p>

        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-1">
          <input className="input flex-1" placeholder="Search institutions..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="input w-36" value={cat} onChange={e => setCat(e.target.value)}>
            {['All Categories','Hospital','Bank','Government','University'].map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="input w-36" value={loc} onChange={e => setLoc(e.target.value)}>
            {['All Locations','Nairobi','Mombasa','Kisumu','Nakuru'].map(l => <option key={l}>{l}</option>)}
          </select>
          <select className="input w-36">
            {['Sort: Relevance','Sort: Rating','Sort: Name A–Z'].map(s => <option key={s}>{s}</option>)}
          </select>
          <button className="btn-primary px-5">Search</button>
          <span className="text-xs text-gray-500 whitespace-nowrap">Showing {filtered.length} results</span>
        </div>

        {/* Cards grid */}
        <div className="space-y-3 mt-5">
          {filtered.map(inst => (
            <div key={inst.name} className="card p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{inst.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm mb-1">{inst.name}</div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${CAT_COLORS[inst.cat]}`}>{inst.cat}</span>
                  <span className="text-xs text-gray-500">📍 {inst.loc}</span>
                  <span className="text-xs text-yellow-500">★ {inst.rating}</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">{inst.desc}</p>
                <p className="text-xs text-gray-400 mt-1">{inst.services} services available</p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button className="btn-primary text-xs px-4 py-1.5" onClick={() => navigate('/institutions/1')}>Book Now</button>
                <button className="text-xs text-gray-500 hover:text-navy text-center" onClick={() => navigate('/institutions/1')}>View Details</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button className="btn-secondary text-xs px-3 py-1.5">Prev</button>
          {[1,2,3].map(p => (
            <button key={p} className={`text-xs px-3 py-1.5 rounded-lg border ${p===1 ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>{p}</button>
          ))}
          <button className="btn-secondary text-xs px-3 py-1.5">Next</button>
        </div>
      </div>
    </div>
  )
}
