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
const MedicareCard = ({formik}) => {
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
        Medicare Card Details
      </Typography>
      <Stack direction="row" spacing={3} sx={{ mt: "10px" }}>
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={formik.values.card_name}
          label={
            <Typography variant="p">
              Name on Card
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="card_name"
          onBlur={formik.handleBlur}
          error={
            formik.touched.card_name &&
            Boolean(formik.errors.card_name)
          }
          helperText={
            formik.touched.card_name && formik.errors.card_name
          }
        />

        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={formik.values.card_no}
          label={
            <Typography variant="p">
              Card Number
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="card_no"
          onBlur={formik.handleBlur}
          error={
            formik.touched.card_no &&
            Boolean(formik.errors.card_no)
          }
          helperText={
            formik.touched.card_no && formik.errors.card_no
          }
        />
      </Stack>
      <Stack direction="row" spacing={3} sx={{ mt: "10px" }}>
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={formik.values.refrence_no}
          label={
            <Typography variant="p">
              Individual Ref Number
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
          }
          onChange={formik.handleChange}
          name="refrence_no"
          onBlur={formik.handleBlur}
          error={
            formik.touched.refrence_no &&
            Boolean(formik.errors.refrence_no)
          }
          helperText={
            formik.touched.refrence_no && formik.errors.refrence_no
          }
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Card Colour <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.card_color}
            label={
              <Typography variant="p">
                Card Color
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            name="card_color"
            onBlur={formik.handleBlur}
            error={
              formik.touched.card_color &&
              Boolean(formik.errors.card_color)
            }
          >
            <MenuItem value="Green">Green</MenuItem>
            <MenuItem value="Blue">Blue</MenuItem>
            <MenuItem value="Yellow">Yellow</MenuItem>
          </Select>
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {formik.touched.card_color && formik.errors.card_color}
          </FormHelperText>
        </FormControl>
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
          <InputLabel id="demo-simple-select-label">Month <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span></InputLabel>
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
              formik.touched.expiry_month &&
              Boolean(formik.errors.expiry_month)
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
          <InputLabel id="demo-simple-select-label">Year<span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span></InputLabel>
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
              formik.touched.expiry_year &&
              Boolean(formik.errors.expiry_year)
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

export default MedicareCard;
