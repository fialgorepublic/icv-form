import {
  Typography,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { contactMethod } from "./data";
const ContactDetails = ({ formik }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={
          <AddCircleOutlineIcon sx={{ color: "#ffffff", fontSize: "30px" }} />
        }
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ background: "#1976d2", mt: "35px", color: "#ffffff" }}
      >
        <Typography variant="h6" color="inherit" component="div">
          Contacts Detail
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
          <TextField
            id="outlined-basic"
            fullWidth
            type="number"
            label="Home Phone"
            variant="outlined"
            onChange={formik.handleChange}
            name="home_phone"
            value={formik.values.home_phone}
          />
          <TextField
            id="outlined-basic"
            fullWidth
            type="number"
            label="Work Phone"
            variant="outlined"
            onChange={formik.handleChange}
            name="work_phone"
            value={formik.values.work_phone}
          />
        </Stack>
        <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            type="number"
            name="mobile_no"
            value={formik.values.mobile_no}
            label={
              <Typography variant="p">
                Mobile
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile_no && Boolean(formik.errors.mobile_no)}
            helperText={formik.touched.mobile_no && formik.errors.mobile_no}
          />
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            label={
              <Typography variant="p">
                Email Address
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            name="email"
            value={formik.values.email}
          />
        </Stack>
        <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Contact Method
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Contact Method"
              onChange={formik.handleChange}
              name="contact_method"
              value={formik.values.contact_method}
            >
              {contactMethod.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default ContactDetails;
