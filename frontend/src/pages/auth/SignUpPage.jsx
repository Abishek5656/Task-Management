// // import React, { useState } from "react";
// // import {
// //   Box,
// //   Card,
// //   CardContent,
// //   Container,
// //   Grid,
// //   Typography,
// //   TextField,
// //   FormControl,
// //   FormLabel,
// //   RadioGroup,
// //   FormControlLabel,
// //   Radio,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Button,
// //   Link,
// //   FormHelperText,
// // } from "@mui/material";


// // import { useNavigate } from "react-router-dom"
// // import { signupApi } from "../../api/authApi";

// // // RequestManagerSignUp.jsx
// // // Single-file responsive Sign Up form designed for laptop (and scales down to tablet/phone)

// // export default function SignUpPage() {

// //   const navigate = useNavigate()

// //   const [values, setValues] = useState({
// //     fullName: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     role: "employee",
// //     managerId: "",
// //   });

// //   const [errors, setErrors] = useState({});

// //   // Example managers list (replace with API data)
// //   const managers = [
// //     { id: "m1", name: "Priya R" },
// //     { id: "m2", name: "Rahul S" },
// //     { id: "m3", name: "Asha K" },
// //   ];

// //   const handleChange = (field) => (e) => {
// //     const value = e.target.value;
// //     setValues((v) => ({ ...v, [field]: value }));

// //     // simple live validation for passwords
// //     if ((field === "password" || field === "confirmPassword") && values.confirmPassword) {
// //       setErrors((prev) => ({
// //         ...prev,
// //         confirmPassword:
// //           field === "password"
// //             ? value !== values.confirmPassword
// //               ? "Passwords do not match"
// //               : ""
// //             : values.password !== value
// //               ? "Passwords do not match"
// //               : "",
// //       }));
// //     }

// //   };

// //   const validate = () => {
// //     const e = {};
// //     if (!values.fullName.trim()) e.fullName = "Full name is required";
// //     if (!values.email) e.email = "Email is required";
// //     // basic email pattern
// //     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Enter a valid email";
// //     if (!values.password) e.password = "Password is required";
// //     if (!values.confirmPassword) e.confirmPassword = "Confirm your password";
// //     if (values.password && values.confirmPassword && values.password !== values.confirmPassword)
// //       e.confirmPassword = "Passwords do not match";
// //     if (values.role === "employee" && !values.managerId) e.managerId = "Please select a manager (optional but recommended)";

// //     setErrors(e);
// //     return Object.keys(e).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validate()) return;

// //     // submit payload
// //     const payload = { ...values };
// //     // TODO: replace with API call

// //     try {
// //       const res = await signupApi(payload);

// //     } catch (error) {

// //     }
// //     console.log("Submitting:", payload);
// //     alert("Sign up submitted. Check console for payload (replace with API call).\n");
// //   };

// //   return (
// //     <Container maxWidth="md" sx={{ mt: 6 }}>
// //       <Card sx={{ borderRadius: 2, boxShadow: 6 }}>
// //         <CardContent>
// //           <Grid container spacing={2} alignItems="center">
// //             <Grid item xs={12} md={6}>
// //               {/* Left side: title + small description */}
// //               <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}>
// //                 <Typography variant="h5" component="h1" gutterBottom>
// //                   Request Manager
// //                 </Typography>
// //                 <Typography variant="subtitle1" color="text.secondary">
// //                   Sign up to create and manage requests. Use your company email for best results.
// //                 </Typography>

// //                 {/* On wide screens you can place an illustrative block here */}
// //                 <Box sx={{ mt: 4, display: { xs: "none", md: "block" } }}>
// //                   <img
// //                     alt="signup-illustration"
// //                     src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='150'><rect width='100%' height='100%' fill='%23f5f5f5'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='14'>Request Manager</text></svg>"
// //                     style={{ width: "100%", maxWidth: 320, borderRadius: 8 }}
// //                   />
// //                 </Box>
// //               </Box>
// //             </Grid>

// //             <Grid item xs={12} md={6}>
// //               {/* Right side: form */}
// //               <Box
// //                 component="form"
// //                 onSubmit={handleSubmit}
// //                 sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}
// //                 noValidate
// //               >
// //                 <Grid container spacing={2}>
// //                   <Grid item xs={12}>
// //                     <TextField
// //                       fullWidth
// //                       label="Full Name"
// //                       value={values.fullName}
// //                       onChange={handleChange("fullName")}
// //                       error={Boolean(errors.fullName)}
// //                       helperText={errors.fullName}
// //                       placeholder="John Doe"
// //                       autoComplete="name"
// //                     />
// //                   </Grid>

// //                   <Grid item xs={12}>
// //                     <TextField
// //                       fullWidth
// //                       label="Email"
// //                       value={values.email}
// //                       onChange={handleChange("email")}
// //                       error={Boolean(errors.email)}
// //                       helperText={errors.email}
// //                       placeholder="john.doe@company.com"
// //                       autoComplete="email"
// //                       type="email"
// //                     />
// //                   </Grid>

// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       label="Password"
// //                       value={values.password}
// //                       onChange={handleChange("password")}
// //                       error={Boolean(errors.password)}
// //                       helperText={errors.password}
// //                       type="password"
// //                       autoComplete="new-password"
// //                     />
// //                   </Grid>

// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       label="Confirm Password"
// //                       value={values.confirmPassword}
// //                       onChange={handleChange("confirmPassword")}
// //                       error={Boolean(errors.confirmPassword)}
// //                       helperText={errors.confirmPassword}
// //                       type="password"
// //                       autoComplete="new-password"
// //                     />
// //                   </Grid>

// //                   <Grid item xs={12}>
// //                     <FormControl component="fieldset">
// //                       <FormLabel component="legend">Role</FormLabel>
// //                       <RadioGroup
// //                         row
// //                         value={values.role}
// //                         onChange={(e) => setValues((v) => ({ ...v, role: e.target.value }))}
// //                       >
// //                         <FormControlLabel value="employee" control={<Radio />} label="Employee" />
// //                         <FormControlLabel value="manager" control={<Radio />} label="Manager" />
// //                       </RadioGroup>
// //                     </FormControl>
// //                   </Grid>

// //                   {/* Manager selection: shown if role is employee - optional */}
// //                   {values.role === "employee" && (
// //                     <Grid item xs={12}>
// //                       <FormControl fullWidth error={Boolean(errors.managerId)}>
// //                         <InputLabel id="manager-select-label">Manager (optional)</InputLabel>
// //                         <Select
// //                           labelId="manager-select-label"
// //                           label="Manager (optional)"
// //                           value={values.managerId}
// //                           onChange={(e) => setValues((v) => ({ ...v, managerId: e.target.value }))}
// //                           displayEmpty
// //                         >
// //                           <MenuItem value="">-- Select Manager --</MenuItem>
// //                           {managers.map((m) => (
// //                             <MenuItem key={m.id} value={m.id}>
// //                               {m.name}
// //                             </MenuItem>
// //                           ))}
// //                         </Select>
// //                         {errors.managerId && <FormHelperText>{errors.managerId}</FormHelperText>}
// //                       </FormControl>
// //                     </Grid>
// //                   )}
// //                   <Grid item xs={12} sx={{ mt: 1 }}>
// //                     <Button
// //                       type="submit"
// //                       variant="contained"
// //                       fullWidth
// //                       sx={{ py: 1.5 }}

// //                     >
// //                       Sign Up
// //                     </Button>
// //                   </Grid>

// //                   <Grid item xs={12}>
// //                     <Typography variant="body2" align="center">
// //                       Already have an account?{' '}
// //                       <Link
// //                         underline="none"
// //                         sx={{ cursor: "pointer" }}
// //                         onClick={() => navigate("/signin")}
// //                       >
// //                         Sign In
// //                       </Link>
// //                     </Typography>
// //                   </Grid>

// //                 </Grid>
// //               </Box>
// //             </Grid>
// //           </Grid>
// //         </CardContent>
// //       </Card>

// //       {/* Layout notes for developers: on laptops (md and up) the card shows a split layout. On small screens it stacks. */}
// //     </Container>
// //   );
// // }


// // import { useState } from "react";
// // import { signupApi } from "../../api/authApi";

// // function SignUpPage() {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     role: "",
// //     managerId: ""
// //   });

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await signupApi(form);

// //       alert("Signup Success");

// //       // Store JWT token
// //       localStorage.setItem("token", res.data.token);

// //       // Redirect to login or dashboard
// //       window.location.href = "/login";

// //     } catch (err) {
// //       alert(err.response?.data?.error || "Signup failed");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>

// //       <input name="name" placeholder="Full Name" onChange={handleChange} />

// //       <input name="email" placeholder="Email" onChange={handleChange} />

// //       <input name="password" type="password" placeholder="Password" onChange={handleChange} />

// //       <select name="role" onChange={handleChange}>
// //         <option value="">Select Role</option>
// //         <option value="EMPLOYEE">Employee</option>
// //         <option value="MANAGER">Manager</option>
// //       </select>

// //       <input name="managerId" placeholder="Manager ID" onChange={handleChange} />

// //       <button type="submit">Sign Up</button>

// //     </form>
// //   );
// // }

// // export default SignUpPage;



// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   Typography,
//   TextField,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Link,
//   FormHelperText,
// } from "@mui/material";

// import { useNavigate } from "react-router-dom";
// import { signupApi } from "../../api/authApi";

// export default function SignUpPage() {
//   const navigate = useNavigate();

//   const [values, setValues] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: 0,
//     managerId: "",
//   });


//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const managers = [
//     { id: 1, name: "Priya R" },
//     { id: 2, name: "Rahul S" },
//     { id: 3, name: "Asha K" },
//   ];

//   const handleChange = (field) => (e) => {
//     const value = e.target.value;
//     setValues((v) => ({ ...v, [field]: value }));
//   };

//   // auto password match checker
//   useEffect(() => {
//     if (values.password && values.confirmPassword) {
//       setErrors((prev) => ({
//         ...prev,
//         confirmPassword:
//           values.password !== values.confirmPassword
//             ? "Passwords do not match"
//             : "",
//       }));
//     }
//   }, [values.password, values.confirmPassword]);

//   const validate = () => {
//     const e = {};

//     if (!values.fullName.trim()) e.fullName = "Full name is required";

//     if (!values.email) e.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
//       e.email = "Enter a valid email";

//     if (!values.password) e.password = "Password is required";

//     if (!values.confirmPassword)
//       e.confirmPassword = "Confirm your password";

//     if (
//       values.password &&
//       values.confirmPassword &&
//       values.password !== values.confirmPassword
//     )
//       e.confirmPassword = "Passwords do not match";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const payload = { ...values };
//     setLoading(true);

//     try {
//       const res = await signupApi(payload);
//       navigate("/signin");
//     } catch (error) {
//       setErrors((e) => ({
//         ...e,
//         api: error?.response?.data?.message || "Signup failed. Try again.",
//       }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 6 }}>
//       <Card sx={{ borderRadius: 2, boxShadow: 6 }}>
//         <CardContent>
//           <Grid container spacing={2} alignItems="center">
//             {/* Left Section */}
//             <Grid item xs={12} md={6}>
//               <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}>
//                 <Typography variant="h5" component="h1" gutterBottom>
//                   Request Manager
//                 </Typography>

//                 <Typography variant="subtitle1" color="text.secondary">
//                   Sign up to create and manage requests. Use your company email.
//                 </Typography>

//                 <Box sx={{ mt: 4, display: { xs: "none", md: "block" } }}>
//                   <img
//                     alt="signup-illustration"
//                     src="data:image/svg+xml;utf8,
//                     <svg xmlns='http://www.w3.org/2000/svg' width='300' height='150'>
//                       <rect width='100%' height='100%' fill='%23f5f5f5'/>
//                       <text x='50%' y='50%' dominant-baseline='middle'
//                        text-anchor='middle' fill='%23999' font-size='14'>
//                        Request Manager
//                       </text>
//                     </svg>"
//                     style={{ width: "100%", maxWidth: 320, borderRadius: 8 }}
//                   />
//                 </Box>
//               </Box>
//             </Grid>

//             {/* Right Section - Form */}
//             <Grid item xs={12} md={6}>
//               <Box component="form" onSubmit={handleSubmit} sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}>
//                 <Grid container spacing={2}>

//                   {errors.api && (
//                     <Grid item xs={12}>
//                       <Typography color="error" sx={{ fontSize: 14 }}>
//                         {errors.api}
//                       </Typography>
//                     </Grid>
//                   )}

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Full Name"
//                       value={values.fullName}
//                       onChange={handleChange("fullName")}
//                       error={Boolean(errors.fullName)}
//                       helperText={errors.fullName}
//                       placeholder="John Doe"
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Email"
//                       value={values.email}
//                       onChange={handleChange("email")}
//                       error={Boolean(errors.email)}
//                       helperText={errors.email}
//                       placeholder="john@company.com"
//                       type="email"
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="Password"
//                       value={values.password}
//                       onChange={handleChange("password")}
//                       error={Boolean(errors.password)}
//                       helperText={errors.password}
//                       type="password"
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="Confirm Password"
//                       value={values.confirmPassword}
//                       onChange={handleChange("confirmPassword")}
//                       error={Boolean(errors.confirmPassword)}
//                       helperText={errors.confirmPassword}
//                       type="password"
//                     />
//                   </Grid>

//                   {/* Role */}
//                   {/* <Grid item xs={12}>
//                     <FormControl component="fieldset">
//                       <FormLabel component="legend">Role</FormLabel>
//                       <RadioGroup
//                         row
//                         value={values.role}
//                         onChange={(e) =>
//                           setValues((v) => ({ ...v, role: e.target.value }))
//                         }
//                       >
//                         <FormControlLabel value="employee" control={<Radio />} label="Employee" />
//                         <FormControlLabel value="manager" control={<Radio />} label="Manager" />
//                       </RadioGroup>
//                     </FormControl>
//                   </Grid> */}


//                   <Grid item xs={12}>
//                     <FormControl component="fieldset">
//                       <FormLabel component="legend">Role</FormLabel>

//                       <RadioGroup
//                         row
//                         value={values.role}
//                         onChange={(e) =>
//                           setValues((v) => ({ ...v, role: Number(e.target.value) }))
//                         }
//                       >
//                         <FormControlLabel
//                           value={0}
//                           control={<Radio />}
//                           label="Employee"
//                         />

//                         <FormControlLabel
//                           value={1}
//                           control={<Radio />}
//                           label="Manager"
//                         />
//                       </RadioGroup>
//                     </FormControl>
//                   </Grid>


//                   {/* Manager Dropdown */}
//                   {values.role === 0 && (
//                     <Grid item xs={12}>
//                       <FormControl fullWidth>
//                         <InputLabel id="manager-select-label">Manager (optional)</InputLabel>
//                         <Select
//                           labelId="manager-select-label"
//                           label="Manager (optional)"
//                           value={values.managerId}
//                           onChange={(e) =>
//                             setValues((v) => ({ ...v, managerId: e.target.value }))
//                           }
//                         >
//                           <MenuItem value="">-- Select Manager --</MenuItem>
//                           {managers.map((m) => (
//                             <MenuItem key={m.id} value={m.id}>
//                               {m.name}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                         {errors.managerId && (
//                           <FormHelperText error>{errors.managerId}</FormHelperText>
//                         )}
//                       </FormControl>
//                     </Grid>
//                   )}

//                   <Grid item xs={12} sx={{ mt: 1 }}>
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       fullWidth
//                       sx={{ py: 1.5 }}
//                       disabled={loading}
//                     >
//                       {loading ? "Processing..." : "Sign Up"}
//                     </Button>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Typography align="center" variant="body2">
//                       Already have an account?{" "}
//                       <Link underline="none" sx={{ cursor: "pointer" }} onClick={() => navigate("/signin")}>
//                         Sign In
//                       </Link>
//                     </Typography>
//                   </Grid>

//                 </Grid>
//               </Box>
//             </Grid>

//           </Grid>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Link,
  FormHelperText,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../store/auth/authSlice";

export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: 0,
    managerId: "",
  });

  const [errors, setErrors] = useState({});

  const managers = [
    { id: 1, name: "Priya R" },
    { id: 2, name: "Rahul S" },
    { id: 3, name: "Asha K" },
  ];

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  useEffect(() => {
    if (values.password && values.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          values.password !== values.confirmPassword
            ? "Passwords do not match"
            : "",
      }));
    }
  }, [values.password, values.confirmPassword]);

  const validate = () => {
    const e = {};

    if (!values.fullName.trim()) e.fullName = "Full name is required";
    if (!values.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Invalid email";

    if (!values.password) e.password = "Password is required";
    if (!values.confirmPassword) e.confirmPassword = "Confirm your password";

    if (values.password !== values.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(signupUser(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/signin");
      }
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Card sx={{ borderRadius: 2, boxShadow: 6 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">

            {/* Left Section */}
            <Grid item xs={12} md={6}>
              <Box sx={{ px: 4, py: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                  Request Manager
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Sign up to create and manage requests.
                </Typography>

                <Box sx={{ mt: 4, display: { xs: "none", md: "block" } }}>
                  <img
                    alt="signup"
                    src="data:image/svg+xml;utf8,
                    <svg xmlns='http://www.w3.org/2000/svg' width='300' height='150'>
                      <rect width='100%' height='100%' fill='%23f5f5f5'/>
                      <text x='50%' y='50%' dominant-baseline='middle'
                       text-anchor='middle' fill='%23999' font-size='14'>
                       Request Manager
                      </text>
                    </svg>"
                    style={{ width: "100%", maxWidth: 320, borderRadius: 8 }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Right Section - Form */}
            <Grid item xs={12} md={6}>
              <Box component="form" onSubmit={handleSubmit} sx={{ px: 4, py: 4 }}>

                {error && (
                  <Typography color="error" sx={{ mb: 1, fontSize: 14 }}>
                    {error}
                  </Typography>
                )}

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={values.fullName}
                      onChange={handleChange("fullName")}
                      error={Boolean(errors.fullName)}
                      helperText={errors.fullName}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={values.email}
                      onChange={handleChange("email")}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      value={values.password}
                      onChange={handleChange("password")}
                      error={Boolean(errors.password)}
                      helperText={errors.password}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      error={Boolean(errors.confirmPassword)}
                      helperText={errors.confirmPassword}
                    />
                  </Grid>

                  {/* Role */}
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel>Role</FormLabel>
                      <RadioGroup
                        row
                        value={values.role}
                        onChange={(e) =>
                          setValues((v) => ({
                            ...v,
                            role: Number(e.target.value),
                          }))
                        }
                      >
                        <FormControlLabel value={0} control={<Radio />} label="Employee" />
                        <FormControlLabel value={1} control={<Radio />} label="Manager" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {/* Manager Dropdown */}
                  {values.role === 0 && (
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="manager">Manager (optional)</InputLabel>
                        <Select
                          labelId="manager"
                          label="Manager (optional)"
                          value={values.managerId}
                          onChange={(e) =>
                            setValues((v) => ({ ...v, managerId: e.target.value }))
                          }
                        >
                          <MenuItem value="">-- Select Manager --</MenuItem>
                          {managers.map((m) => (
                            <MenuItem key={m.id} value={m.id}>
                              {m.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ py: 1.3 }}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Sign Up"}
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography align="center" variant="body2">
                      Already have an account?{" "}
                      <Link underline="none" sx={{ cursor: "pointer" }} onClick={() => navigate("/signin")}>
                        Sign In
                      </Link>
                    </Typography>
                  </Grid>

                </Grid>
              </Box>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
