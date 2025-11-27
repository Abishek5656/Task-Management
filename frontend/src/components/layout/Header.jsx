import React, { useCallback, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


import { logout } from "../../store/auth/authSlice";

export default function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/signin", { replace: true });
  }, [dispatch, navigate]);


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
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
