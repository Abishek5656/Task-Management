import React from "react";
import { Box, Toolbar, Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Header from "../../components/layout/Header.jsx";
import Button from "../../components/ui/Button.jsx";

const rows = [
  { id: 12, title: "Laptop Issue", assignedTo: "Emp B", status: "AWAIT_MGR", mgrStatus: "PENDING" },
  { id: 13, title: "Access Req", assignedTo: "Emp C", status: "IN_PROGRESS", mgrStatus: "APPROVED" }
];

export default function EmployeeDashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      
      <Header />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            My Requests
          </Typography>

          <Button href="/create-request">+ Create New Request</Button>
        </Grid>

        <Paper sx={{ mt: 3, overflowX: "auto" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Manager Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.assignedTo}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.mgrStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

      </Box>
    </Box>
  );
}
