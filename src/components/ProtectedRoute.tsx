import { Navigate, Outlet } from 'react-router-dom';
import { useAuthData } from 'hooks/useAuthData';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { role: userRole, isAuthenticated } = useAuthData();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
