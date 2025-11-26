import React from "react";
import { TextField } from "@mui/material";

export default function TextInput({ label, ...props }) {
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      size="small"
      {...props}
    />
  );
}
