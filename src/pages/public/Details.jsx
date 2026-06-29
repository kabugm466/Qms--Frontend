import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SERVICES = [
  { name:'General Consultation', duration:'30 min' },
  { name:'Specialist Referral',  duration:'45 min' },
  { name:'Lab Test',             duration:'20 min' },
  { name:'Radiology',            duration:'30 min' },
  { name:'Pharmacy Collection',  duration:'15 min' },
]
const SLOTS = ['09:00','10:30','11:00','14:00','15:30','16:00']
const UNAVAILABLE = ['11:00']

export default function DetailsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Services')
  const [selectedSlot, setSelectedSlot] = useState('10:30')
  const [selectedService, setSelectedService] = useState('General Consultation')

  return (
    <div className="min-h-screen bg-page font-poppins">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-8 h-14 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/home')}>
          <img src="/logo.png" alt="JIPANGE" className="h-8 w-auto" />
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <a className="hover:text-navy cursor-pointer" onClick={() => navigate('/home')}>Home</a>
          <a className="hover:text-navy cursor-pointer" onClick={() => navigate('/institutions')}>Institutions</a>
          <a className="hover:text-navy cursor-pointer">About</a>
          <a className="hover:text-navy cursor-pointer">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs px-4 py-1.5" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-primary text-xs px-4 py-1.5" onClick={() => navigate('/register')}>Register</button>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="px-8 pt-4 text-xs text-gray-500">
        <span className="cursor-pointer hover:text-navy" onClick={() => navigate('/home')}>Home</span>
        <span className="mx-1">/</span>
        <span className="cursor-pointer hover:text-navy" onClick={() => navigate('/institutions')}>Institutions</span>
        <span className="mx-1">/</span>
        <span className="text-gray-700">City General Hospital</span>
      </div>

      {/* Profile Banner */}
      <div className="bg-navy px-8 py-6 mt-2">
        <div className="max-w-5xl mx-auto flex items-center gap-5">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">CGH</div>
          <div className="flex-1">
            <div className="text-white font-bold text-xl mb-1">City General Hospital</div>
            <div className="flex items-center gap-4 text-sm text-blue-200 mb-1">
              <span>📍 Ngong Road, Nairobi</span>
              <span>📞 +254 20 123 4567</span>
              <span>✉ info@cgh.co.ke</span>
            </div>
            <div>
              <span className="bg-yellow-400 text-yellow-900 text-[10px] font-semibold px-2 py-0.5 rounded mr-2">Hospital</span>
              <span className="text-yellow-400 text-sm">★★★★★</span>
              <span className="text-blue-200 text-xs ml-1">4.8 (312 reviews)</span>
            </div>
          </div>
          <button className="btn-primary px-5 py-2 flex-shrink-0" onClick={() => navigate('/login')}>Book Appointment</button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-6 grid grid-cols-3 gap-6">
        {/* Left: tabs + content */}
        <div className="col-span-2">
          <div className="flex border-b border-gray-200 mb-5">
            {['About','Services','Business Hours','Reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm transition-colors ${activeTab === tab ? 'text-green-brand border-b-2 border-green-brand font-medium' : 'text-gray-500 hover:text-gray-700'}`}
              >{tab}</button>
            ))}
          </div>

          {activeTab === 'Services' && (
            <div className="card overflow-hidden">
              {SERVICES.map((svc, i) => (
                <div key={svc.name} className={`flex items-center justify-between px-5 py-4 ${i < SERVICES.length-1 ? 'border-b border-gray-100' : ''}`}>
                  <div>
                    <div className="font-medium text-sm text-gray-900">{svc.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">⏱ {svc.duration}</span>
                      <span className="text-xs text-green-brand font-medium">Booking required</span>
                    </div>
                  </div>
                  <button className="btn-primary text-xs px-4 py-1.5" onClick={() => { setSelectedService(svc.name); setActiveTab('Services') }}>Book</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'About' && (
            <div className="card p-5 text-sm text-gray-600 leading-relaxed">
              City General Hospital is one of Nairobi's leading private hospitals offering comprehensive healthcare services to residents and the surrounding region. Our facilities include 24/7 emergency care, specialist clinics, diagnostic labs, radiology and pharmacy services.
            </div>
          )}

          {activeTab === 'Business Hours' && (
            <div className="card overflow-hidden">
              {[['Monday','08:00 AM','06:00 PM'],['Tuesday','08:00 AM','06:00 PM'],['Wednesday','08:00 AM','06:00 PM'],['Thursday','08:00 AM','06:00 PM'],['Friday','08:00 AM','06:00 PM'],['Saturday','09:00 AM','02:00 PM'],['Sunday','Closed','']].map(([day, open, close]) => (
                <div key={day} className="flex items-center justify-between px-5 py-3 border-b border-gray-50 last:border-0 text-sm">
                  <span className="font-medium text-gray-700 w-28">{day}</span>
                  {open === 'Closed' ? <span className="text-red-500">Closed</span> : <span className="text-gray-600">{open} — {close}</span>}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div className="card p-5 text-sm text-gray-500">Reviews coming soon.</div>
          )}
        </div>

        {/* Right: booking sidebar */}
        <div>
          <div className="card p-5 sticky top-20">
            <h3 className="font-semibold text-gray-900 text-sm mb-4">Book an Appointment</h3>
            <label className="block text-xs text-gray-500 mb-1">Select Service</label>
            <select className="input mb-3 text-sm" value={selectedService} onChange={e => setSelectedService(e.target.value)}>
              {SERVICES.map(s => <option key={s.name}>{s.name}</option>)}
            </select>
            <label className="block text-xs text-gray-500 mb-1">Select Date</label>
            <input type="date" className="input mb-3 text-sm" />
            <label className="block text-xs text-gray-500 mb-2">Available Slots</label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {SLOTS.map(slot => {
                const unavail = UNAVAILABLE.includes(slot)
                const selected = selectedSlot === slot
                return (
                  <button
                    key={slot}
                    disabled={unavail}
                    onClick={() => !unavail && setSelectedSlot(slot)}
                    className={`py-1.5 text-xs rounded-lg border transition-colors ${
                      unavail ? 'border-gray-100 text-gray-300 line-through bg-gray-50 cursor-not-allowed' :
                      selected ? 'bg-green-brand text-white border-green-brand' :
                      'border-gray-200 text-gray-700 hover:border-green-brand hover:text-green-brand'
                    }`}
                  >{slot}</button>
                )
              })}
            </div>
            <button className="btn-primary w-full text-sm py-2" onClick={() => navigate('/login')}>
              Confirm Booking →
            </button>
            <p className="text-center text-xs text-gray-400 mt-2">Login required to complete booking</p>
          </div>
        </div>
      </div>
    </div>
  )
}
