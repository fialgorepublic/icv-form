import { Stack, Typography, TextField } from "@mui/material";
const CitizenshipCertificate = ({ formik }) => {
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
        Citizenship Certificate Details
      </Typography>
      <Stack direction="row" spacing={3} sx={{ mt: "10px" }}>
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={formik.values.stock_no}
          label={
            <Typography variant="p">
              Stock Number
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="stock_no"
          onBlur={formik.handleBlur}
          error={formik.touched.stock_no && Boolean(formik.errors.stock_no)}
          helperText={formik.touched.stock_no && formik.errors.stock_no}
        />
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={formik.values.citizenship_aquisition_date}
          label={
            <Typography variant="p">
              Aquisition Date
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="citizenship_aquisition_date"
          onBlur={formik.handleBlur}
          error={
            formik.touched.citizenship_aquisition_date &&
            Boolean(formik.errors.citizenship_aquisition_date)
          }
          helperText={
            formik.touched.citizenship_aquisition_date &&
            formik.errors.citizenship_aquisition_date
          }
        />
      </Stack>
    </>
  );
};

export default CitizenshipCertificate;
