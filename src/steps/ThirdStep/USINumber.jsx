import {
  TextField,
  Stack,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Typography,
  Toolbar,
  AppBar,
  FormHelperText,
} from "@mui/material";

import { useEffect } from "react";
import CreateUsi from "./CreateUsi";
const USINumber = ({ formik, handlebtnDisable }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Unique Student Identifier
          </Typography>
        </Toolbar>
      </AppBar>

      <Typography variant="p" color="inherit" component="div" m={3}>
        From January 1st 2015 Registered Training Organisation can be prevented
        from issuing you with a nationally recognised VET qualification or
        statement of attainment when you complete your course if you do not have
        a valid Unique Student Identifier (USI). In addition, we are required to
        include your USI in the data we submit to NCVER.
      </Typography>
      <Typography variant="p" color="inherit" component="div" m={3}>
        If you have not yet obtained a USI you can apply for it directly at{" "}
        <a href="https://www.usi.gov.au/students/how-do-i-create-usi">
          https://www.usi.gov.au/students/how-do-i-create-usi
        </a>{" "}
        on a computer or mobile device.
      </Typography>
      <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Do you have a Unique Student Identifier?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="have_usi_number"
            label="Do you have a Unique Student Identifier?"
            value={formik?.values?.have_unique_identifier}
            name="have_unique_identifier"
            autoFocus
            onChange={formik.handleChange}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>

        <TextField
          disabled={formik.values.have_unique_identifier === "No"}
          id="usi_number"
          fullWidth
          name="unique_identifier"
          value={formik.values.unique_identifier}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.unique_identifier &&
            formik.values.have_unique_identifier === "Yes"
          }
          helperText="(Your USI is 10 digits long and must contain only capital letters (except O and I) and digits 2 - 9)"
          label={
            <Typography variant="p">
              Please enter your Unique Student Identifier
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          variant="outlined"
        />
        <FormHelperText sx={{ color: "#d32f2f" }}>
          {formik.touched.have_unique_identifier &&
            formik.errors.have_unique_identifier &&
            formik.values.have_unique_identifier === "Yes"}
        </FormHelperText>
      </Stack>

      {formik.values.have_unique_identifier === "No" && (
        <CreateUsi formik={formik} handlebtnDisable={handlebtnDisable} />
      )}
      {/* <CreateUsi formik={formik} /> */}
    </>
  );
};

export default USINumber;
