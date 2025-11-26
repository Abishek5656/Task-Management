import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, background: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Logo
        </Typography>

        <Typography variant="h6">Request Management</Typography>

        <Box>
          <IconButton size="large" color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
