import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function PrivateRoute({ children }) {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to='/register' replace />
  }
  return children
}
export default PrivateRoute
