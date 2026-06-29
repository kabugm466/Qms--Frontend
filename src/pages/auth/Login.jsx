import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    // Demo login — replace with real API call
    setTimeout(() => {
      if (email === 'admin@jipange.co.ke') {
        login({ name:'Super Admin', role:'admin', email }, 'demo-token')
        navigate('/admin/overview')
      } else if (email === 'institution@jipange.co.ke') {
        login({ name:'Dr. Jane Kamau', role:'institution_admin', email, institution:'City General Hospital' }, 'demo-token')
        navigate('/institution/overview')
      } else if (email === 'client@jipange.co.ke') {
        login({ name:'Brian Otieno', role:'client', email }, 'demo-token')
        navigate('/client/dashboard')
      } else {
        setError('Invalid email or password. Try: admin@, institution@, or client@jipange.co.ke')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="h-screen flex font-poppins overflow-hidden">
      {/* Left panel */}
      <div className="w-[45%] bg-navy flex flex-col items-center justify-center px-10 flex-shrink-0">
        <img src="/logo.png" alt="JIPANGE" className="h-20 w-auto mb-5" />
        <div className="space-y-3 w-full max-w-xs mb-8">
          {['No more physical queues','Real-time appointment updates','Book any institution in seconds'].map(f => (
            <div key={f} className="flex items-center gap-3 text-sm text-blue-100">
              <span className="w-4 h-4 rounded-full border border-green-brand text-green-brand text-[10px] flex items-center justify-center flex-shrink-0">✓</span>
              {f}
            </div>
          ))}
        </div>
        <div className="w-full max-w-xs h-28 bg-white/10 rounded-xl flex items-center justify-center text-blue-300 text-xs">
          Auth Illustration
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-white flex items-center justify-center px-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-navy mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm mb-7">Sign in to your Jipange account</p>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
              <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input className="input pr-10" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm" onClick={() => setShowPw(!showPw)}>
                  {showPw ? '🙈' : '👁'}
                </button>
              </div>
              <div className="text-right mt-1">
                <button type="button" className="text-green-brand text-xs hover:underline" onClick={() => navigate('/forgot-password')}>Forgot password?</button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button className="w-full border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <span className="text-blue-500 font-bold text-xs">G</span> Continue with Google
          </button>

          <p className="text-center text-xs text-gray-500 mt-5">
            Don't have an account?{' '}
            <button className="text-green-brand font-medium hover:underline" onClick={() => navigate('/register')}>Register here</button>
          </p>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg text-[11px] text-blue-600">
            <strong>Demo logins:</strong><br/>
            admin@jipange.co.ke · institution@jipange.co.ke · client@jipange.co.ke<br/>
            (any password)
          </div>
        </div>
      </div>
    </div>
  )
}
