import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  return (
    <div className="min-h-screen bg-page font-poppins flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-10 h-10 rounded-full border-2 border-green-brand flex items-center justify-center mb-3">
            <span className="text-green-brand font-bold">✓</span>
          </div>
          <span className="text-navy font-bold text-base tracking-widest">JIPANGE</span>
        </div>

        {!success ? (
          <>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Reset your password</h2>
            <p className="text-gray-500 text-sm text-center mb-6">Enter the email linked to your account and we will send you a reset link.</p>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
            <input className="input mb-4" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            <button className="btn-primary w-full py-2.5 text-sm" onClick={() => email && setSuccess(true)}>Send Reset Link</button>
            <button className="w-full text-center text-xs text-navy hover:underline mt-3" onClick={() => navigate('/login')}>← Back to Sign In</button>
            <button className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-2" onClick={() => setSuccess(true)}>demo: toggle success state</button>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-brand text-2xl mb-4">✓</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Check your inbox</h2>
              <p className="text-gray-500 text-sm mb-6">A reset link has been sent to your email address. It expires in 30 minutes.</p>
              <button className="btn-primary w-full py-2.5 text-sm mb-3">Open Gmail</button>
              <button className="text-xs text-gray-500 hover:text-navy hover:underline mb-3" onClick={() => setSuccess(false)}>Resend email</button>
              <button className="text-xs text-navy hover:underline" onClick={() => navigate('/login')}>← Back to Sign In</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
