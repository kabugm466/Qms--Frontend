import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Public pages
import HomePage        from './pages/public/Home'
import ListingPage     from './pages/public/Listing'
import DetailsPage     from './pages/public/Details'

// Auth pages
import LoginPage          from './pages/auth/Login'
import RegisterPage       from './pages/auth/Register'
import ForgotPasswordPage from './pages/auth/ForgotPassword'

// Client pages
import ClientDashboard     from './pages/client/Dashboard'
import ClientAppointments  from './pages/client/Appointments'
import ClientNotifications from './pages/client/Notifications'
import ClientProfile       from './pages/client/Profile'

// Institution pages
import InstitutionOverview     from './pages/institution/Overview'
import InstitutionAppointments from './pages/institution/Appointments'
import InstitutionQueue        from './pages/institution/QueueManagement'
import InstitutionServices     from './pages/institution/Services'
import InstitutionProfile      from './pages/institution/Profile'

// Admin pages
import AdminOverview     from './pages/admin/Overview'
import AdminInstitutions from './pages/admin/Institutions'
import AdminUsers        from './pages/admin/Users'
import AdminSettings     from './pages/admin/SystemSettings'

// Route guard
import PrivateRoute from './components/common/PrivateRoute'

function RootRedirect() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  const map = {
    admin:             '/admin/overview',
    institution_admin: '/institution/overview',
    staff:             '/institution/overview',
    client:            '/client/dashboard',
  }
  return <Navigate to={map[user.role] || '/login'} replace />
}

export default function App() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<RootRedirect />} />

      {/* Public pages */}
      <Route path="/home"        element={<HomePage />} />
      <Route path="/institutions"element={<ListingPage />} />
      <Route path="/institutions/:id" element={<DetailsPage />} />

      {/* Auth pages */}
      <Route path="/login"          element={<LoginPage />} />
      <Route path="/register"       element={<RegisterPage />} />
      <Route path="/forgot-password"element={<ForgotPasswordPage />} />

      {/* Client dashboard */}
      <Route path="/client/dashboard"    element={<PrivateRoute roles={['client']}><ClientDashboard /></PrivateRoute>} />
      <Route path="/client/appointments" element={<PrivateRoute roles={['client']}><ClientAppointments /></PrivateRoute>} />
      <Route path="/client/notifications"element={<PrivateRoute roles={['client']}><ClientNotifications /></PrivateRoute>} />
      <Route path="/client/profile"      element={<PrivateRoute roles={['client']}><ClientProfile /></PrivateRoute>} />

      {/* Institution dashboard */}
      <Route path="/institution/overview"    element={<PrivateRoute roles={['institution_admin','staff']}><InstitutionOverview /></PrivateRoute>} />
      <Route path="/institution/appointments"element={<PrivateRoute roles={['institution_admin','staff']}><InstitutionAppointments /></PrivateRoute>} />
      <Route path="/institution/queue"       element={<PrivateRoute roles={['institution_admin','staff']}><InstitutionQueue /></PrivateRoute>} />
      <Route path="/institution/services"    element={<PrivateRoute roles={['institution_admin']}><InstitutionServices /></PrivateRoute>} />
      <Route path="/institution/profile"     element={<PrivateRoute roles={['institution_admin']}><InstitutionProfile /></PrivateRoute>} />

      {/* Admin dashboard */}
      <Route path="/admin/overview"     element={<PrivateRoute roles={['admin']}><AdminOverview /></PrivateRoute>} />
      <Route path="/admin/institutions" element={<PrivateRoute roles={['admin']}><AdminInstitutions /></PrivateRoute>} />
      <Route path="/admin/users"        element={<PrivateRoute roles={['admin']}><AdminUsers /></PrivateRoute>} />
      <Route path="/admin/settings"     element={<PrivateRoute roles={['admin']}><AdminSettings /></PrivateRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
