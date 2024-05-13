import {
  Stack,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Typography,
  TextField,
  FormHelperText,
} from "@mui/material";
import { states } from "./data";
const BirthCertificate = ({formik}) => {
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
        Birth Certificate Details
      </Typography>
      <Stack direction="row" spacing={3} sx={{ mt: "10px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">State<span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.birt_state}
          label={
            <Typography variant="p">
              State
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="birt_state"
          onBlur={formik.handleBlur}
          error={
            formik.touched.birt_state &&
            Boolean(formik.errors.birt_state)
          }
          >
            {states.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {formik.touched.birt_state && formik.errors.birt_state}
          </FormHelperText>
        </FormControl>
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={formik.values.reg_no}
          label={
            <Typography variant="p">
             Registration Number
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="reg_no"
          onBlur={formik.handleBlur}
          error={
            formik.touched.reg_no &&
            Boolean(formik.errors.reg_no)
          }
          helperText={formik.touched.reg_no && formik.errors.reg_no}
        />
      </Stack>

      <Stack direction="row" spacing={3} sx={{ mt: "10px" }}>
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={formik.values.date_printed}
          label={
            <Typography variant="p">
              Date Printed
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="date_printed"
          onBlur={formik.handleBlur}
          error={
            formik.touched.date_printed &&
            Boolean(formik.errors.date_printed)
          }
          helperText={formik.touched.date_printed && formik.errors.date_printed}
        />
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={formik.values.certificate_no}
          label={
            <Typography variant="p">
              Certificate Number
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="certificate_no"
          onBlur={formik.handleBlur}
          error={
            formik.touched.certificate_no &&
            Boolean(formik.errors.certificate_no)
          }
          helperText={formik.touched.certificate_no && formik.errors.certificate_no}
        />
      </Stack>
    </>
  );
};

export default BirthCertificate;
