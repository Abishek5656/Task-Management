// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Typography,
//   Button,
//   Grid,
//   Link,
// } from "@mui/material";

// import { useDispatch, useSelector } from "react-redux";

// export default function SignInPage() {


//    const dispatch = useDispatch();
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (field) => (e) => {
//     setValues((v) => ({ ...v, [field]: e.target.value }));
//   };

//   const validate = () => {
//     const e = {};

//     if (!values.email) e.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
//       e.email = "Enter a valid email";

//     if (!values.password) e.password = "Password is required";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validate()) return;

//     console.log("Submitting Sign In:", values);
//     // Here you will call your API or Redux login method
//   };

//   return (
//     <Grid
//       container
//       justifyContent="center"
//       alignItems="center"
//       sx={{
//         minHeight: "100vh",
//         backgroundColor: "#f5f5f5",
//         padding: 2,
//       }}
//     >
//       <Grid item xs={12} sm={8} md={4}>
//         <Card sx={{ borderRadius: 3, padding: 2, boxShadow: 4 }}>
//           <CardContent>
//             <Typography
//               variant="h5"
//               align="center"
//               sx={{ fontWeight: "bold", mb: 2 }}
//             >
//               Request Manager
//             </Typography>

//             <Typography
//               variant="h6"
//               align="center"
//               sx={{ mb: 3, color: "text.secondary" }}
//             >
//               Sign In
//             </Typography>

//             {/* Email */}
//             <TextField
//               fullWidth
//               label="Email"
//               type="email"
//               margin="normal"
//               value={values.email}
//               onChange={handleChange("email")}
//               error={Boolean(errors.email)}
//               helperText={errors.email}
//             />

//             {/* Password */}
//             <TextField
//               fullWidth
//               label="Password"
//               type="password"
//               margin="normal"
//               value={values.password}
//               onChange={handleChange("password")}
//               error={Boolean(errors.password)}
//               helperText={errors.password}
//             />

//             {/* Sign In Button */}
//             <Button
//               fullWidth
//               variant="contained"
//               size="large"
//               sx={{ mt: 3, borderRadius: 2 }}
//               onClick={handleSubmit}
//             >
//               Sign In
//             </Button>

//             {/* Sign Up Link */}
//             <Typography align="center" sx={{ mt: 3 }}>
//               Don’t have an account?{" "}
//               <Link href="/signup" underline="hover">
//                 Sign Up
//               </Link>
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Grid,
  Link,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../../store/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const validate = () => {
    const e = {};

    if (!values.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Enter a valid email";

    if (!values.password) e.password = "Password is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    dispatch(signinUser(values));
  };

  // Redirect after successful login
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Card sx={{ borderRadius: 3, padding: 2, boxShadow: 4 }}>
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Request Manager
            </Typography>

            <Typography
              variant="h6"
              align="center"
              sx={{ mb: 3, color: "text.secondary" }}
            >
              Sign In
            </Typography>

            {/* Backend error */}
            {error && (
              <Typography color="error" fontSize={14} sx={{ mb: 1 }}>
                {error}
              </Typography>
            )}

            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={values.email}
              onChange={handleChange("email")}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            {/* Password */}
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={values.password}
              onChange={handleChange("password")}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />

            {/* Sign In Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, borderRadius: 2 }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            {/* Sign Up Link */}
            <Typography align="center" sx={{ mt: 3 }}>
              Don’t have an account?{" "}
              <Link href="/signup" underline="hover">
                Sign Up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
