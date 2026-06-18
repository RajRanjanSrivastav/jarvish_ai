import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  user: any;
  loading: boolean;
}

const ProtectedRoute = ({ user, loading }: ProtectedRouteProps) => {
  if (loading) {
    return (
      <div className="min-h-screen flex item-center justify-center bg-[#f8f8fc]">
        <div className="w-8 h-8 border-4 border-red-400 border-t-transparent rounded-full animated-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
