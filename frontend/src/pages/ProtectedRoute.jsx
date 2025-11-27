import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) return <Navigate to="/signin" />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // redirect based on role
    return user.role === 2 ? <Navigate to="/manager" /> : <Navigate to="/dashboard" />;
  }

  return children;
}
