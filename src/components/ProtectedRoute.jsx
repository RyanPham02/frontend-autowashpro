import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user } = useAuth();

  if (!user) {
    // Chưa đăng nhập, chuyển về trang login
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    // Cần quyền admin nhưng user hiện tại không phải admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
