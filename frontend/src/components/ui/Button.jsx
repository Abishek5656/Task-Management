import React from "react";
import { Button as MuiButton } from "@mui/material";

export default function Button({ children, ...props }) {
  return (
    <MuiButton
      variant={props.variant || "contained"}
      sx={{ textTransform: "none", fontWeight: 600 }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
