import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function NotFound() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const homeMap = {
    admin: '/admin/overview',
    institution_admin: '/institution/overview',
    staff: '/staff/dashboard',
    client: '/client/dashboard',
  }
  const homePath = user ? (homeMap[user.role] || '/login') : '/home'

  return (
    <div className="min-h-screen bg-page font-poppins flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <img src="/logo.png" alt="JIPANGE" className="h-12 w-auto mx-auto mb-6" />

        <div className="text-7xl font-bold text-navy mb-2 tracking-tight">404</div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Page not found</h1>
        <p className="text-sm text-gray-500 mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary text-sm px-5 py-2"
          >
            ← Go Back
          </button>
          <button
            onClick={() => navigate(homePath)}
            className="btn-primary text-sm px-5 py-2"
          >
            {user ? 'Back to Dashboard' : 'Back to Home'}
          </button>
        </div>
      </div>
    </div>
  )
}
