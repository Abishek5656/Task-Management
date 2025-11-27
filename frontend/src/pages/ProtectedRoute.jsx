import { Navigate } from "react-router-dom";
import React, { useMemo } from "react";

function ProtectedRoute({ children, allowedRoles }) {
  if (typeof window === "undefined") return null;


  const { token, user } = useMemo(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return { token, user };
  }, []);

  if (!token || !user) {
    return <Navigate to="/signin" replace />;
  }

  // Role access check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return user.role === 1
      ? <Navigate to="/dashboard" replace />
      : <Navigate to="/manager" replace />;
  }

  return children;
}

export default React.memo(ProtectedRoute);
