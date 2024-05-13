import {
  Typography,
  Stack,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const EmergencyContact = ({ formik }) => {
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
          Emergency Contact Detatils
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            label={
              <Typography variant="p">
                Name
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            name="name"
            value={formik.values.name}
          />
          <TextField
            id="outlined-basic"
            fullWidth
            label={
              <Typography variant="p">
                Relationship
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.relationship && Boolean(formik.errors.relationship)
            }
            helperText={
              formik.touched.relationship && formik.errors.relationship
            }
            variant="outlined"
            name="relationship"
            value={formik.values.relationship}
          />
        </Stack>
        <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Phone"
            variant="outlined"
            onChange={formik.handleChange}
            name="phone"
            value={formik.values.phone}
            type="number"
          />
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            label={
              <Typography variant="p">
                Mobile
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            name="mobile"
            type="number"
            value={formik.values.mobile}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default EmergencyContact;
