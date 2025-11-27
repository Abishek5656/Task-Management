import React, { useEffect } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

import Sidebar from "../../components/layout/Sidebar.jsx";
import Header from "../../components/layout/Header.jsx";
import Button from "../../components/ui/Button.jsx";

import { useDispatch, useSelector } from "react-redux";
import { fetchMyRequests } from "../../store/request/requestSlice";

export default function EmployeeDashboard() {
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector((state) => state.requests);

  // Load data on page load
  useEffect(() => {
    dispatch(fetchMyRequests());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {/* Header */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            My Requests
          </Typography>

          <Button href="/create-request">+ Create New Request</Button>
        </Grid>

        {/* If loading */}
        {loading && (
          <Box sx={{ mt: 5, textAlign: "center" }}>
            <CircularProgress />
          </Box>
        )}

        {/* If error */}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {/* Table */}
        {!loading && !error && (
          <Paper sx={{ mt: 3, overflowX: "auto" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Manager Status</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {list.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Requests Found
                    </TableCell>
                  </TableRow>
                ) : (
                  list.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.assignedToName}</TableCell>

                      {/* Status Mapping */}
                      <TableCell>
                        {row.status === 1
                          ? "AWAITING_MANAGER"
                          : row.status === 2
                            ? "APPROVED"
                            : row.status === 3
                              ? "REJECTED"
                              : "UNKNOWN"}
                      </TableCell>

                      <TableCell>
                        {row.managerStatus === 1
                          ? "PENDING"
                          : row.managerStatus === 2
                            ? "APPROVED"
                            : row.managerStatus === 3
                              ? "REJECTED"
                              : "UNKNOWN"}
                      </TableCell>

                      <TableCell>
                        {new Date(row.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

