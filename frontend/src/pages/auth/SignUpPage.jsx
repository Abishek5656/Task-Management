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
import { signupUser, fetchManagers } from "../../store/auth/authSlice";
import { use } from "react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, managers } = useSelector((state) => state.auth);
  // const managers = useSelector((state) => state.auth.managers);

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: 0,
    managerId: "",
  });

  const [errors, setErrors] = useState({});


  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  useEffect(() => {
    dispatch(fetchManagers());
  }, [dispatch]);

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
                        <FormControlLabel value={1} control={<Radio />} label="Employee" />
                        <FormControlLabel value={2} control={<Radio />} label="Manager" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {/* Manager Dropdown */}
                  {/* {values.role === 1 && (
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
                  )} */}

                  {values.role === 1 && (
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
