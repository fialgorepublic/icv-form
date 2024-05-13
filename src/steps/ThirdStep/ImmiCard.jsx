import {
  Stack,
  Typography,
  TextField,
} from "@mui/material";
const ImmiCard = ({formik}) => {
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
      ImmiCard Details
    </Typography>
    <Stack direction="row" spacing={3} sx={{ mt: "10px" }}>
      <TextField
        id="outlined-basic"
        fullWidth
        variant="outlined"
        value={formik.values.immi_card_no}
          label={
            <Typography variant="p">
              ImmiCard Number
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="immi_card_no"
          onBlur={formik.handleBlur}
          error={
            formik.touched.immi_card_no &&
            Boolean(formik.errors.immi_card_no)
          }
          helperText={
            formik.touched.immi_card_no &&
            formik.errors.immi_card_no
          }
      />
    </Stack>
  </>
  )
}

export default ImmiCard