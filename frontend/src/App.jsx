import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const Signup = lazy(() => import("./pages/auth/SignUpPage.jsx"));
  const Login = lazy(() => import("./pages/auth/SignInPage.jsx"));

  const token = localStorage.getItem("token");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/signup" 
            element={token ? <div>Home page</div> : <Signup />} 
          />

          <Route path="/signin" element={token ? <div>Home page</div> :<Login /> } />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
