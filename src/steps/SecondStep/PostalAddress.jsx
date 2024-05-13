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
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { states } from "./data";
const PostalAddress = ({ formik }) => {
  // const [checked, setChecked] = useState(true);

  const handleInputChange = (event, formik) => {
    const { checked } = event.target;
    // formik.setFieldValue("postal_unit_detail", formik.values.unit_detail);
    if (checked) {
      formik.setFieldValue("postal_unit_detail", formik.values.unit_detail);
      formik.setFieldValue('same_as_redential', true)
      // debugger;
      formik.setFieldValue("postal_building_name", formik.values.building_name);
      formik.setFieldValue("postal_post_code", formik.values.post_code);
      formik.setFieldValue("postal_street_number", formik.values.street_number);
      formik.setFieldValue(
        "postal_street_name_and_type",
        formik.values.street_name_and_type
      );
      formik.setFieldValue("postal_suburb", formik.values.suburb);
      formik.setFieldValue("postal_state", formik.values.state);
    } else {
      formik.setFieldValue('same_as_redential', false)
      formik.setFieldValue("postal_building_name", "");
      formik.setFieldValue("postal_unit_detail", "");
      formik.setFieldValue("postal_post_code", "");
      formik.setFieldValue("postal_street_number", "");
      formik.setFieldValue("postal_street_name_and_type", "");
      formik.setFieldValue("postal_suburb", "");
      formik.setFieldValue("postal_state", "");
    }
    // const fieldValue = values[fieldName];
    // formik.values.postal_unit_detail = formik.values.unit_detail;
  };
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
          Postal Address
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => handleInputChange(e, formik)}
              value={formik.values.same_as_redential}
              checked={formik.values.same_as_redential}
              name="same_as_redential"
            />
          }
          label="Same as residential address..."
        />
        <Stack direction="row" spacing={3} sx={{ mt: "20px" }}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Flat/ Unit Number"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.postal_unit_detail}
            name="postal_unit_detail"
          />
          <TextField
            id="outlined-basic"
            fullWidth
            label="Building Name:"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.postal_building_name}
            name="postal_building_name"
          />
        </Stack>
        <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="PO Box"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.postal_po_box}
            name="postal_po_box"
          />
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            label={
              <Typography variant="p">
                Street Number
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.postal_street_number}
            error={
              formik.touched.postal_street_number &&
              Boolean(formik.errors.postal_street_number)
            }
            helperText={
              formik.touched.postal_street_number &&
              formik.errors.postal_street_number
            }
            name="postal_street_number"
          />
        </Stack>
        <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Street Name:"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.postal_street_name_and_type}
            name="postal_street_name_and_type"
          />
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            label={
              <Typography variant="p">
                Suburb
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.postal_suburb &&
              Boolean(formik.errors.postal_suburb)
            }
            helperText={
              formik.touched.postal_suburb && formik.errors.postal_suburb
            }
            value={formik.values.postal_suburb}
            name="postal_suburb"
          />
        </Stack>
        <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              State
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="postal_state"
              label={
                <Typography variant="p">
                  State
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </Typography>
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postal_state}
              error={
                formik.touched.postal_state &&
                Boolean(formik.errors.postal_state)
              }
            >
              {states.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d32f2f" }}>
              {formik.touched.postal_state && formik.errors.postal_state}
            </FormHelperText>
          </FormControl>
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            name="postal_post_code"
            label={
              <Typography variant="p">
                Post Code
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </Typography>
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.postal_post_code}
            error={
              formik.touched.postal_post_code &&
              Boolean(formik.errors.postal_post_code)
            }
            helperText={
              formik.touched.postal_post_code && formik.errors.postal_post_code
            }
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default PostalAddress;
