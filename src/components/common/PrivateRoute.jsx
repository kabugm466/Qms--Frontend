import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function PrivateRoute({ children, roles }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-page">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-brand border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-medium">Loading Jipange…</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  if (roles && !roles.includes(user.role)) {
    const redirectMap = {
      admin: '/admin/overview',
      institution_admin: '/institution/overview',
      staff: '/staff/dashboard',
      client: '/client/dashboard',
    }
    return <Navigate to={redirectMap[user.role] || '/login'} replace />
  }

  return children
}
