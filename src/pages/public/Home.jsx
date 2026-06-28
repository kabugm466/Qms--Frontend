import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FEATURED = [
  { initials:'CGH', cat:'Hospital',   name:'City General Hospital',   loc:'Nairobi', rating:'4.8', desc:'Comprehensive healthcare services including specialist consultations and lab tests.' },
  { initials:'NSB', cat:'Bank',       name:'National Savings Bank',   loc:'Westlands', rating:'4.5', desc:'Full-service banking with loans, savings, and investment products for all Kenyans.' },
  { initials:'HC',  cat:'Government', name:'Huduma Centre CBD',       loc:'Nairobi CBD', rating:'4.2', desc:'One-stop government service centre for ID, passports, NHIF, NSSF and more.' },
]
const CAT_COLORS = { Hospital:'bg-blue-100 text-blue-700', Bank:'bg-purple-100 text-purple-700', Government:'bg-yellow-100 text-yellow-700', University:'bg-green-100 text-green-700' }

export default function HomePage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All Categories')

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-8 h-14 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-green-brand flex items-center justify-center">
            <span className="text-green-brand text-[10px] font-bold">✓</span>
          </div>
          <span className="text-navy font-bold text-sm tracking-wide">JIPANGE</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <a className="hover:text-navy cursor-pointer">Home</a>
          <a className="hover:text-navy cursor-pointer" onClick={() => navigate('/institutions')}>Institutions</a>
          <a className="hover:text-navy cursor-pointer">About</a>
          <a className="hover:text-navy cursor-pointer">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs px-4 py-1.5" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-primary text-xs px-4 py-1.5" onClick={() => navigate('/register')}>Register</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-navy py-16 text-center px-6">
        <p className="text-gold-brand text-sm font-medium mb-3 tracking-wide">Plan it. Show up. Get served.</p>
        <h1 className="text-white text-4xl font-bold mb-4 leading-tight">
          Skip the queue.<br />Book your appointment online.
        </h1>
        <p className="text-blue-200 text-sm mb-8 max-w-md mx-auto">
          Find hospitals, banks, government offices, universities across Kenya and book your slot in seconds.
        </p>
        <div className="flex max-w-xl mx-auto rounded-lg overflow-hidden border border-white/20">
          <input
            className="flex-1 px-4 py-2.5 text-sm outline-none text-gray-800"
            placeholder="Search institution name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="px-3 py-2.5 text-sm bg-gray-100 border-l border-gray-200 text-gray-600 outline-none"
            value={cat}
            onChange={e => setCat(e.target.value)}
          >
            {['All Categories','Hospital','Bank','Government','University'].map(c => <option key={c}>{c}</option>)}
          </select>
          <button className="btn-primary px-5 rounded-none text-sm" onClick={() => navigate('/institutions')}>Search</button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-blue-200">
          <span>Popular:</span>
          {['City Hospital','National Bank','Huduma Centre'].map(t => (
            <button key={t} className="bg-white/10 text-white px-2.5 py-0.5 rounded-full hover:bg-white/20 transition-colors">{t}</button>
          ))}
        </div>
      </section>

      {/* Featured Institutions */}
      <section className="py-12 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Featured Institutions</h2>
            <button className="text-green-brand text-sm hover:underline" onClick={() => navigate('/institutions')}>View all →</button>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {FEATURED.map(inst => (
              <div key={inst.name} className="card overflow-hidden">
                <div className="h-28 bg-gray-100 flex items-center justify-center text-xs text-gray-400 relative">
                  <span className={`absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded ${CAT_COLORS[inst.cat]}`}>{inst.cat}</span>
                  Institution Image
                </div>
                <div className="p-4">
                  <div className="font-semibold text-sm text-gray-900 mb-1">{inst.name}</div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span>📍 {inst.loc}</span>
                    <span>★ {inst.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{inst.desc}</p>
                  <button className="btn-primary w-full text-xs py-1.5" onClick={() => navigate('/institutions/1')}>View &amp; Book</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-8 bg-page">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-8">How it works</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon:'🔍', num:'1', title:'Search', desc:'Find your institution by name, category, or location across Kenya.' },
              { icon:'📅', num:'2', title:'Book',   desc:'Pick your service, choose a date and time slot, and confirm instantly.' },
              { icon:'✅', num:'3', title:'Show Up', desc:'Arrive at your confirmed time. Your slot is reserved — no more queues.' },
            ].map(step => (
              <div key={step.num} className="card p-6 text-center">
                <div className="text-2xl mb-3">{step.icon}</div>
                <div className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mx-auto mb-3">{step.num}</div>
                <div className="font-semibold text-sm text-gray-900 mb-2">{step.title}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-navy py-10 px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-base mb-1">Are you a business or institution?</h3>
            <p className="text-blue-200 text-sm">Register your organisation and manage appointments digitally — no hardware needed.</p>
          </div>
          <button className="bg-gold-brand text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-yellow-400 transition-colors whitespace-nowrap" onClick={() => navigate('/register')}>
            Register Your Institution →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full border-2 border-green-brand flex items-center justify-center">
                <span className="text-green-brand text-[9px] font-bold">✓</span>
              </div>
              <span className="text-white font-bold text-sm">JIPANGE</span>
            </div>
            <p className="text-gray-500 text-xs">Plan it. Show up. Get served.</p>
          </div>
          <div className="flex gap-5 text-xs text-gray-400">
            {['About','Contact','Privacy','Terms'].map(l => <a key={l} className="hover:text-white cursor-pointer">{l}</a>)}
          </div>
          <p className="text-gray-600 text-xs">© 2024 Jipange. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
