// import { Navigate } from "react-router-dom";

// export default function RoleRedirect() {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   if (!token || !user) {
//     return <Navigate to="/signin" replace />;
//   }

//   if (user.role === 1) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   if (user.role === 2) {
//     return <Navigate to="/manager" replace />;
//   }

//   return <Navigate to="/signin" replace />;
// }


import { Navigate } from "react-router-dom";

export default function RoleRedirect() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || !user) return <Navigate to="/signin" replace />;

  if (user.role === 1) return <Navigate to="/dashboard" replace />;
  if (user.role === 2) return <Navigate to="/manager" replace />;

  return <Navigate to="/signin" replace />;
}
