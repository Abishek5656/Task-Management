import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import TextInput from "../../components/form/TextInput";
import SelectInput from "../../components/form/SelectInput";
import Button from "../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  createRequest
  // resetRequestState
} from "../../store/request/requestSlice";
import { useNavigate } from "react-router-dom"
import { authInitialState, fetchManagers } from "../../store/auth/authSlice";

export default function CreateRequestPage() {

  const navigate = useNavigate()


  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    name: authInitialState.user.name
  });

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.requests);


  const managers = useSelector((state) => state.auth.managers);

  // const employees = [
  //   // { label: "one", value: 1 },
  //   { label: "one", value: 1111 },
  //   { label: "one2", value: 8440 },
  // ];

  const employeeOptions = managers.map(m => ({
    label: m.name,
    value: m.managerId
  }));

  useEffect(() => {
    dispatch(fetchManagers());
  }, [dispatch]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleCreate = () => {
    dispatch(createRequest(form));
    navigate("/dashboard")
  };


  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Create New Request
        </Typography>

        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextInput
                  label="Title"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  label="Description"
                  multiline
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    handleChange("description", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <SelectInput
                  label="Assign To (Employee)"
                  value={form.assignedTo}
                  options={employeeOptions}
                  onChange={(e) =>
                    handleChange("assignedTo", e.target.value)
                  }
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>

                <Button onClick={handleCreate} disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
