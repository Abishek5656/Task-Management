
import React from "react";
import { TextField, MenuItem } from "@mui/material";

export default function SelectInput({ label, value, onChange, options }) {
  return (
    <TextField
      fullWidth
      select
      label={label}
      size="small"
      value={value}
      onChange={onChange}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
