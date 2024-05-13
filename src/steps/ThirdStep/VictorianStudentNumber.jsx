import {
  FormControl,
  FormControlLabel,
  TextField,
  FormHelperText,
  Stack,
  RadioGroup,
  Radio,
  Typography,
  Toolbar,
  AppBar,
} from "@mui/material";
import { useState } from "react";
const VictorianStudentNumber = ({ formik }) => {
  const [haveVictorian, setHaveVictorian] = useState();
  const handleVictorianNumber = (event) => {
    setHaveVictorian(event.target.value);
  };
  return (
    <>
      <Typography variant="h6" color="inherit" component="div" mt={4}>
        Cannot remember your USI?
      </Typography>
      <Typography variant="p" color="inherit" component="div">
        If you have a USI but cannot remember it, please visit the{" "}
        <a href="https://www.usi.gov.au/students">USI Registrar</a> and click on
        the <b>I have forgotten my USI </b> option. The{" "}
        <a href="https://www.usi.gov.au/students">USI Registrar</a> will provide
        instructions for retrieving your USI.
      </Typography>
      <AppBar position="static" sx={{ mt: "30px" }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Do you have a Victorian Student Number?
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="p" color="inherit" component="div" m={3}>
        To be completed by all students aged up to 24 years: Since 2009 in
        schools and since 2011 for vocational education and training (VET)
        organisations and Adult Community Education providers, a Victorian
        Student Number (VSN) has been allocated upon enrolment to each
        individual student aged up to 24 years. Students should report their VSN
        on all subsequent enrolments at a Victorian school or training
        organisation. In particular, all students who are currently enrolled in
        either a VET provider or a Victorian school (including those already
        participating in a VET in schools program) should obtain their VSN from
        their current education or training organisation and report their VSN on
        this enrolment form.Students who are enrolling for the first time since
        the VSN was introduced will get a new VSN.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: "50px" }}>
        <FormControl fullWidth>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="have_victorian_stu_num"
            sx={{ ml: "30px" }}
            value={formik.values.have_victorian_stu_num}
            onChange={formik.handleChange}
          >
            <FormControlLabel value="No" control={<Radio />} label="No" />
            <FormControlLabel
              value="Yes, but VSN is unknown"
              control={<Radio />}
              label="Yes, but VSN is unknown"
            />
            <FormControlLabel
              value="Yes, please specify"
              control={<Radio />}
              label="Yes, please specify"
            />
          </RadioGroup>
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {formik.touched.have_victorian_stu_num &&
              formik.errors.have_victorian_stu_num}
          </FormHelperText>
        </FormControl>
        <TextField
          disabled={formik.values.have_victorian_stu_num === "" || formik.values.have_victorian_stu_num === "No" || formik.values.have_victorian_stu_num === "Yes, but VSN is unknown"}
          id="outlined-basic"
          variant="outlined"
          fullWidth
          value={formik.values.victorian_stu_num}
          onChange={formik.handleChange}
          name="victorian_stu_num"
          onBlur={formik.handleBlur}
          error={
            formik.touched.victorian_stu_num &&
            Boolean(formik.errors.victorian_stu_num)
          }
          helperText={formik.touched.victorian_stu_num && formik.errors.victorian_stu_num}
        />
      </Stack>
    </>
  );
};

export default VictorianStudentNumber;
