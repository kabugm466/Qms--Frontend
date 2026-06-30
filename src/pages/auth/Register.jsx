import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('client')
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', confirm:'', institutionName:'' })

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:flex-row font-poppins md:overflow-hidden">
      {/* Left panel — hidden on mobile */}
      <div className="hidden md:flex w-[45%] bg-navy flex-col items-center justify-center px-10 flex-shrink-0">
        <img src="/logo.png" alt="JIPANGE" className="h-20 w-auto mb-5" />
        <div className="space-y-3 w-full max-w-xs">
          {['No more physical queues','Real-time appointment updates','Book any institution in seconds'].map(f => (
            <div key={f} className="flex items-center gap-3 text-sm text-blue-100">
              <span className="w-4 h-4 rounded-full border border-green-brand text-green-brand text-[10px] flex items-center justify-center flex-shrink-0">✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-only compact header */}
      <div className="md:hidden bg-navy px-6 py-6 flex items-center justify-center">
        <img src="/logo.png" alt="JIPANGE" className="h-12 w-auto" />
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-white flex items-center justify-center px-6 sm:px-10 md:px-12 py-8 md:py-0 overflow-y-auto">
        <div className="w-full max-w-sm py-4 md:py-8">
          <h1 className="text-2xl font-bold text-navy mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm mb-5">Choose your account type to get started</p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { key:'client',  icon:'👤', title:'I am a Client',      sub:'Book appointments at any institution' },
              { key:'institution', icon:'🏢', title:'I am an Institution', sub:'Manage your organisation and appointments' },
            ].map(r => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`p-4 rounded-xl border-2 text-left transition-colors ${role === r.key ? 'border-green-brand bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="text-xl mb-2">{r.icon}</div>
                <div className="text-sm font-semibold text-gray-900 mb-0.5">{r.title}</div>
                <div className="text-xs text-gray-500">{r.sub}</div>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {role === 'institution' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Institution Name</label>
                <input className="input" placeholder="City General Hospital" value={form.institutionName} onChange={set('institutionName')} />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <input className="input" placeholder="Brian Otieno" value={form.name} onChange={set('name')} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
              <input className="input" type="email" placeholder="brian@example.com" value={form.email} onChange={set('email')} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
              <input className="input" placeholder="+254 700 000 000" value={form.phone} onChange={set('phone')} />
            </div>
            {role === 'institution' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                <select className="input">
                  {['Hospital','Bank','Government','University','Other'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={set('password')} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
              <input className="input" type="password" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} />
            </div>
          </div>

          <button className="btn-primary w-full py-2.5 text-sm mt-5" onClick={() => navigate('/login')}>Create Account</button>
          <p className="text-center text-xs text-gray-500 mt-3">
            Already have an account?{' '}
            <button className="text-green-brand font-medium hover:underline" onClick={() => navigate('/login')}>Sign In</button>
          </p>
          <p className="text-center text-[11px] text-gray-400 mt-2">By registering you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
