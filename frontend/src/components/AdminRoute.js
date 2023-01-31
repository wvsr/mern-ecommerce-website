import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function PrivateRoute({ children }) {
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return <Navigate to='/register' replace />
  }
  return children
}
export default PrivateRoute
