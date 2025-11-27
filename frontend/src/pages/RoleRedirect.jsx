import { Navigate } from "react-router-dom";

export default function RoleRedirect() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in → go to signin
  if (!token || !user) return <Navigate to="/signin" />;

  // Employee
  if (user.role === 1) return <Navigate to="/dashboard" />;

  // Manager
  if (user.role === 2) return <Navigate to="/manager" />;

  // fallback
  return <Navigate to="/signin" />;
}
