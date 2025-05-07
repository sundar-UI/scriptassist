import { Navigate } from 'react-router-dom'
import { useAppStore } from '../store/app.store'

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppStore()
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute
