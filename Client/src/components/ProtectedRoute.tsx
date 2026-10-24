import { Navigate, Outlet } from "react-router-dom";
import type { User } from "../types";

interface ProtectedRouteProps {
  user: User | null;
  loading: boolean;
}

const ProtectedRoute = ({ user, loading }: ProtectedRouteProps) => {
  console.log("what is coming " + user);
  if (loading) {
    return (
      <div className="min-h-screen flex item-center justify-center bg-[#f8f8fc]">
        <div className="w-8 h-8 border-4 border-red-400 border-t-transparent rounded-full animated-spin"></div>
      </div>
    );
  }

  if (!user) {
    console.log("is coming here");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
