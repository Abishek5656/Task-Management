import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const Signup = lazy(() => import("./pages/auth/SignUpPage.jsx"));
  const Login = lazy(() => import("./pages/auth/SignInPage.jsx"));
  const EmployeeDashboard = lazy(() => import("./pages/employee/EmployeeDashboard.jsx"));
  const CreateRequestPage = lazy(() => import("./pages/employee/CreateRequestPage.jsx"));



  const token = localStorage.getItem("token");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={token ? <div>Home page</div> : <Signup />}
          />

          <Route path="/signin" element={token ? <div>Home page</div> : <Login />} />


          {/* ---------- PROTECTED ROUTES ---------- */}
          <Route path="/dashboard" element={<EmployeeDashboard />} />

          <Route path="/create-request" element={ <CreateRequestPage />}
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
