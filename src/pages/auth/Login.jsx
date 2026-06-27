import { useNavigate } from 'react-router-dom'
export default function LoginPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-page flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🔐</div>
        <h1 className="text-xl font-semibold text-navy mb-2">Login</h1>
        <p className="text-gray-500 text-sm mb-4">Coming soon — Auth Pages</p>
        <button
          onClick={() => navigate('/institution/overview')}
          className="btn-primary mr-2 text-xs"
        >
          → Institution Demo
        </button>
        <button
          onClick={() => navigate('/admin/overview')}
          className="btn-secondary text-xs"
        >
          → Admin Demo
        </button>
      </div>
    </div>
  )
}
