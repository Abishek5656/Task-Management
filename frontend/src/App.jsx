import React, { lazy, Suspense } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./pages/ProtectedRoute.jsx";

function App() {
  const Signup = lazy(() => import("./pages/auth/SignUpPage.jsx"));
  const Login = lazy(() => import("./pages/auth/SignInPage.jsx"));
  const EmployeeDashboard = lazy(() => import("./pages/employee/EmployeeDashboard.jsx"));
  const CreateRequestPage = lazy(() => import("./pages/employee/CreateRequestPage.jsx"));
  const ManagerDashboard = lazy(() => import("./pages/manager/ManagerDashboard.jsx"));
  const RequestDetailsPage = lazy(() => import("./pages/shared/RequestDetailsPage.jsx"));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>

          {/*ROOT SHOULD NOT USE RoleRedirect — only go to signin */}
          <Route path="/" element={<Navigate to="/signin" replace />} />

          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Employee */}
          <Route
            path="/dashboard"
            element={
             <ProtectedRoute allowedRoles={[1]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          {/* Employee create request */}
          <Route
            path="/create-request"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <CreateRequestPage />
              </ProtectedRoute>
            }
          />

          {/* Manager */}
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

          {/* fallback */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
