import React from "react";
import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" }
      }}
    >
      <Toolbar />

      <List>
        <ListItemButton component={Link} to="/my-requests">
          <ListItemText primary="My Requests" />
        </ListItemButton>

        <ListItemButton component={Link} to="/assigned-to-me">
          <ListItemText primary="Assigned To Me" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
