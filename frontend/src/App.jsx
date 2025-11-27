import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RoleRedirect  from "./pages/RoleRedirect.jsx"
import  ProtectedRoute  from "./pages/ProtectedRoute.jsx"

function App() {
  const Signup = lazy(() => import("./pages/auth/SignUpPage.jsx"));
  const Login = lazy(() => import("./pages/auth/SignInPage.jsx"));
  const EmployeeDashboard = lazy(() => import("./pages/employee/EmployeeDashboard.jsx"));
  const CreateRequestPage = lazy(() => import("./pages/employee/CreateRequestPage.jsx"));
  const ManagerDashboard = lazy(() => import("./pages/manager/ManagerDashboard.jsx"));
  const RequestDetailsPage = lazy(() => import("./pages/shared/RequestDetailsPage.jsx"));


  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>

          {/* ROOT REDIRECT BASED ON USER ROLE */}
          <Route path="/" element={<RoleRedirect />} />

          {/* SIGNUP */}
          <Route
            path="/signup"
            element={!token ? <Signup /> : <RoleRedirect />}
          />

          {/* SIGNIN */}
          <Route
            path="/signin"
            element={!token ? <Login /> : <RoleRedirect />}
          />

          {/* EMPLOYEE ROUTES (role = 1) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-request"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <CreateRequestPage />
              </ProtectedRoute>
            }
          />

          {/* MANAGER ROUTES (role = 2) */}
          <Route
            path="/manager"
            element={
              <ProtectedRoute allowedRoles={[2]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/request/:id"
            element={
              <ProtectedRoute allowedRoles={[2]}>
                <RequestDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
