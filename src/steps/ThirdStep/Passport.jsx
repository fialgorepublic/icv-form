import {
  Stack,
  Typography,
  TextField,
} from "@mui/material";
const Passport = ({formik}) => {
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
        Passport Details
      </Typography>
      <Stack direction="row" spacing={3} sx={{ mt: "10px" }}>
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={formik.values.document_no}
          label={
            <Typography variant="p">
              Document Numbe
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="document_no"
          onBlur={formik.handleBlur}
          error={
            formik.touched.card_name &&
            Boolean(formik.errors.document_no)
          }
          helperText={
            formik.touched.document_no && formik.errors.document_no
          }
        />
      </Stack>
    </>
  );
};

export default Passport;
