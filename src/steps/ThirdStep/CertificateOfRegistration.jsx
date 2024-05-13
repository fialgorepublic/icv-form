import { Stack, Typography, TextField } from "@mui/material";

const CertificateOfRegistration = ({ formik }) => {
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
        Certificate of Registration by Descent Details
      </Typography>
      <Stack direction="row" spacing={3} sx={{ mt: "10px" }}>
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={formik.values.aquisition_date}
          label={
            <Typography variant="p">
              Aquisition Date
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="aquisition_date"
          onBlur={formik.handleBlur}
          error={
            formik.touched.aquisition_date &&
            Boolean(formik.errors.aquisition_date)
          }
          helperText={
            formik.touched.aquisition_date && formik.errors.aquisition_date
          }
        />
      </Stack>
    </>
  );
};

export default CertificateOfRegistration;
