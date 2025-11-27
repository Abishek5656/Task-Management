// // // import { Navigate } from "react-router-dom";

// // // export default function ProtectedRoute({ children, allowedRoles }) {
// // //   const token = localStorage.getItem("token");
// // //   const user = JSON.parse(localStorage.getItem("user") || "null");

// // //   // Not logged in
// // //   if (!token || !user) return <Navigate to="/signin" replace />;

// // //   // Wrong role
// // //   if (allowedRoles && !allowedRoles.includes(user.role)) {
// // //     return user.role === 2
// // //       ? <Navigate to="/manager" replace />
// // //       : <Navigate to="/dashboard" replace />;
// // //   }

// // //   return children;
// // // }

// // import { Navigate } from "react-router-dom";

// // export default function ProtectedRoute({ children, allowedRoles }) {
// //   // -------- SAFE ACCESS TO LOCAL STORAGE --------
// //   const token =
// //     typeof window !== "undefined"
// //       ? localStorage.getItem("token")
// //       : null;

// //   const user =
// //     typeof window !== "undefined"
// //       ? JSON.parse(localStorage.getItem("user") || "null")
// //       : null;

// //   // -------- NOT LOGGED IN --------
// //   if (!token || !user) {
// //     return <Navigate to="/signin" replace />;
// //   }

// //   // -------- ROLE NOT ALLOWED --------
// //   if (allowedRoles && !allowedRoles.includes(user.role)) {
// //     return user.role === 2
// //       ? <Navigate to="/manager" replace />
// //       : <Navigate to="/dashboard" replace />;
// //   }

// //   // -------- ALLOWED ROUTE --------
// //   return children;
// // }

// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, allowedRoles }) {
//   if (typeof window === "undefined") return null;

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   // Not logged in → go to signin
//   if (!token || !user) return <Navigate to="/signin" replace />;

//   // User logged in but role not allowed
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     // ❗ FIX: Do NOT redirect back to "/"
//     // Instead push user to their correct dashboard ONLY ONCE
//     return user.role === 1
//       ? <Navigate to="/dashboard" replace />
//       : <Navigate to="/manager" replace />;
//   }

//   return children;
// }



import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || !user) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return user.role === 1
      ? <Navigate to="/dashboard" replace />
      : <Navigate to="/manager" replace />;
  }

  return children;
}
