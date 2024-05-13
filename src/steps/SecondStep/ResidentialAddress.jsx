import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
} from "@mui/material";

import { states } from "./data";
import { useEffect } from "react";
const ResidentialAddress = ({ formik }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Residential Address
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
        <TextField
          id="unit_number"
          fullWidth
          label="Flat/ Unit Number"
          name="unit_detail"
          autoFocus
          value={formik.values.unit_detail}
          onChange={formik.handleChange}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          fullWidth
          label="Building Name:"
          variant="outlined"
          name="building_name"
          value={formik.values.building_name}
          onChange={formik.handleChange}
        />
      </Stack>
      <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
        <TextField
          id="outlined-basic"
          fullWidth
          label={
            <Typography variant="p">
              Street Number
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          variant="outlined"
          value={formik.values.street_number}
          name="street_number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.street_number && Boolean(formik.errors.street_number)
          }
          helperText={
            formik.touched.street_number && formik.errors.street_number
          }
        />
        <TextField
          id="outlined-basic"
          fullWidth
          label="Street Name:"
          variant="outlined"
          value={formik.values.street_name_and_type}
          name="street_name_and_type"
          onChange={formik.handleChange}
        />
      </Stack>
      <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={formik.values.suburb}
          name="suburb"
          label={
            <Typography variant="p">
              Suburb
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.suburb && Boolean(formik.errors.suburb)}
          helperText={formik.touched.suburb && formik.errors.suburb}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            State <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="state"
            value={formik.values.state}
            label={
              <Typography variant="p">
                State
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.state && Boolean(formik.errors.state)}
          >
            {states.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {formik.touched.state && formik.errors.state}
          </FormHelperText>
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          name="post_code"
          value={formik.values.post_code}
          label={
            <Typography variant="p">
              Post Code
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.post_code && Boolean(formik.errors.post_code)}
          helperText={formik.touched.post_code && formik.errors.post_code}
        />
      </Stack>
    </>
  );
};

export default ResidentialAddress;
