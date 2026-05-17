import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ProtectedRoute wraps any page that requires login.
// If the user is NOT authenticated, they get redirected to /login automatically.
// Usage: <ProtectedRoute><YourPage /></ProtectedRoute>
const ProtectedRoute = ({ children }) => {
  // Get user AND loading state from AuthContext
  // 'loading' is true while we're checking localStorage on first page load
  const { user, loading } = useAuth();

  // While checking auth state (reading localStorage), show a spinner
  // This prevents a brief flash of the /login redirect before user is restored
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not logged in, redirect to /login
  // 'replace' means the /login page replaces the current history entry,
  // so the user can't click "Back" to bypass the auth check
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the actual protected page
  return children;
};

export default ProtectedRoute;

