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
const DriverLicence = ({ formik }) => {
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
        Driver's Licence Details
      </Typography>
      <Stack direction="row" spacing={3} sx={{ mt: "10px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            State<span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>{" "}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.state}
            label={
              <Typography variant="p">
                State
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            name="state"
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

        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={formik.values.licence_number}
          label={
            <Typography variant="p">
              Licence Number
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="licence_number"
          onBlur={formik.handleBlur}
          error={
            formik.touched.licence_number &&
            Boolean(formik.errors.licence_number)
          }
          helperText={formik.touched.licence_number && formik.errors.licence_number}
          
        />
      </Stack>
      <Typography
        variant="h6"
        color="inherit"
        component="div"
        mt={2}
        fontSize={17}
        fontWeight={600}
      >
        Expiry Date
      </Typography>
      <Stack direction="row" spacing={3} sx={{ mt: "10px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Month<span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.expiry_month}
            label={
              <Typography variant="p">
                Month
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            name="expiry_month"
            onBlur={formik.handleBlur}
            error={
              formik.touched.expiry_month && Boolean(formik.errors.expiry_month)
            }
          >
            {Array(12)
              .fill(1)
              .map((x, y) => x + y)
              .map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {formik.touched.expiry_month && formik.errors.expiry_month}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Year <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.expiry_year}
            label={
              <Typography variant="p">
                Year
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            name="expiry_year"
            onBlur={formik.handleBlur}
            error={
              formik.touched.expiry_year && Boolean(formik.errors.expiry_year)
            }
          >
            {Array(70)
              .fill(1974)
              .map((x, y) => x + y)

              .map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {formik.touched.expiry_year && formik.errors.expiry_year}
          </FormHelperText>
        </FormControl>
      </Stack>
    </>
  );
};

export default DriverLicence;
