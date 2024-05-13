import {
  Stack,
  Typography,
  TextField,
} from "@mui/material";
const Visa = ({formik}) => {
  return (
    <>
    <Typography
      variant="p"
      color="inherit"
      component="div"
      mt={2}
      fontSize={17}
      fontWeight={600}
    >
      Visa Details
    </Typography>
    <Stack direction="row" spacing={3} sx={{ mt: "10px" }}>
      <TextField
        id="outlined-basic"
        fullWidth
        variant="outlined"
        value={formik.values.passport_no}
          label={
            <Typography variant="p">
             Passport Number
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="passport_no"
          onBlur={formik.handleBlur}
          error={
            formik.touched.passport_no &&
            Boolean(formik.errors.passport_no)
          }
          helperText={formik.touched.passport_no && formik.errors.passport_no}
      />
      <TextField
        id="outlined-basic"
        fullWidth
        variant="outlined"
        value={formik.values.country_of_issue}
          label={
            <Typography variant="p">
              Country of Issue
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="country_of_issue"
          onBlur={formik.handleBlur}
          error={
            formik.touched.country_of_issue &&
            Boolean(formik.errors.country_of_issue)
          }
          helperText={formik.touched.country_of_issue && formik.errors.country_of_issue}
      />
    </Stack>
  </>
  )
}

export default Visa