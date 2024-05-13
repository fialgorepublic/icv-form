import {
  Box,
  Stack,
  List,
  FormLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
  Toolbar,
  AppBar,
  Button,
  ListItem,
  FormHelperText,
} from "@mui/material";
import { formInitialValues } from "./initialValues";
import * as yup from "yup";
import { useFormik } from "formik";
import axios, { isCancel, AxiosError } from "axios";
import SignatureCanvas from "react-signature-canvas";
import { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
const options = ["Yes", "No"];
const Index = ({
  data,
  activeStep,
  handleNext,
  handleBack,
  steps,
  handleLoader,
}) => {
  const signatureRef = useRef();
  const [initialValues, setInitialValues] = useState(formInitialValues);
  const clearSignature = () => {
    signatureRef.current.clear();
    formik.setFieldValue("signature", "");
  };

  const validationSchema = yup.object({
    course_name: yup.string().required("* Please Enter Course Name"),
    done_any_program: yup.string().required("* Please Select One"),
    enrolled_any_training: yup.string().required("* Please Select One"),
    enrolled_in_common_wealth: yup.string().required("* Please Select One"),
    name: yup.string().required("* Please Enter Name"),
    declaration_date: yup.string().required("* Please Select Date"),
    program_description: yup.string().when("done_any_program", {
      is: (done_any_program) => done_any_program === "Yes",
      then: (schema) => yup.string().required("* Please Enter about Program"),
      otherwise: (schema) => schema.min(3),
    }),
    signature: yup.string().required("* Please Add Your Signature"),
  });

  const handleSave = async (values) => {
    const id = localStorage.getItem("id");
    handleLoader(true);
    console.log(values);
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${id}`, {
        apply_detail: { student_declaration_attributes: values },
      })
      .then(function (res) {
        localStorage.setItem("data", JSON.stringify(res.data));
        localStorage.setItem("currentAciveStep", 9);
        localStorage.setItem("id", res.data.id);
        handleLoader(false);
        handleNext();
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSave,
    validateOnChange: false,
  });

  useEffect(() => {
    if (data && data.student_declaration) {
      const {
        course_name,
        done_any_program,
        program_description,
        enrolled_any_training,
        enrolled_in_common_wealth,
        name,
        signature,
        declaration_date,
      } = data.student_declaration;

      setInitialValues({
        course_name,
        done_any_program,
        program_description,
        enrolled_any_training,
        enrolled_in_common_wealth,
        name,
        signature,
        declaration_date,
      });
      // console.log('new dataa', initialValues)
      formik.setValues({
        course_name,
        done_any_program,
        program_description,
        enrolled_any_training,
        enrolled_in_common_wealth,
        name,
        signature,
        declaration_date,
      });
    }
  }, [data]);

  console.log("errors", formik.errors);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            border: "1px solid #E5EAF2",
            borderRadius: "12px 12px 0 0",
            mt: "60px",
          }}
        >
          <div style={{ width: "90%", margin: "auto", margin: "40px" }}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Section B - student declaration
                </Typography>
              </Toolbar>
            </AppBar>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={4}
              ml={2}
              fontSize={18}
            >
              To be completed by the student -
              <b>
                don't leave any section blank unless you are asked to skip a
                question or go to the declaration. please ask the training
                provider for help if you don't understand a question
              </b>
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <TextField
                id="outlined-basic"
                fullWidth
                variant="outlined"
                autoFocus
                name="course_name"
                label={
                  <Typography variant="p">
                    Q.1: Write the name of the course/s you're applying for
                    <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                      *
                    </span>
                  </Typography>
                }
                value={formik.values.course_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.course_name &&
                  Boolean(formik.errors.course_name)
                }
                helperText={
                  formik.touched.course_name && formik.errors.course_name
                }
              />
            </Box>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ color: "#000000" }}
                >
                  Q.2: Are you doing, or have you done any other Skills First
                  Training in 2024? Tick your response.
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  row
                  name="done_any_program"
                  value={formik.values.done_any_program}
                  onChange={formik.handleChange}
                >
                  {options.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f", textAlign: "center" }}>
                  {formik.touched.done_any_program &&
                    formik.errors.done_any_program}
                </FormHelperText>
              </FormControl>
              {formik.values.done_any_program === "Yes" && (
                <TextField
                  id="outlined-basic"
                  fullWidth
                  variant="outlined"
                  name="program_description"
                  label={
                    <Typography variant="p">
                      write the course name(s) include training you haven't
                      started yet
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  value={formik.values.program_description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.program_description &&
                    Boolean(formik.errors.program_description)
                  }
                  helperText={
                    formik.touched.program_description &&
                    formik.errors.program_description
                  }
                  sx={{ mt: "20px" }}
                />
              )}
            </Box>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ color: "#000000" }}
                >
                  Q.3: Are you enrolled in a school, including government,
                  non-government, independent, Catholic or home school?.
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  row
                  name="enrolled_any_training"
                  value={formik.values.enrolled_any_training}
                  onChange={formik.handleChange}
                >
                  {options.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                  <FormHelperText
                    sx={{ color: "#d32f2f", textAlign: "center" }}
                  >
                    {formik.touched.enrolled_any_training &&
                      formik.errors.enrolled_any_training}
                  </FormHelperText>
                </RadioGroup>
              </FormControl>
            </Box>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ color: "#000000" }}
                >
                  Q.4: Are you enrolled in the Commonwealth Government's Skills
                  for Education and Employment Program?.
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  row
                  name="enrolled_in_common_wealth"
                  value={formik.values.enrolled_in_common_wealth}
                  onChange={formik.handleChange}
                >
                  {options.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f", textAlign: "center" }}>
                  {formik.touched.enrolled_in_common_wealth &&
                    formik.errors.enrolled_in_common_wealth}
                </FormHelperText>
              </FormControl>
            </Box>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={4}
              ml={2}
              fontSize={18}
            >
              <b>Student Declaration</b>- read and complete the declaration
              below.
            </Typography>
            <List
              sx={{
                listStyleType: "disc",
                listStylePosition: "inside",
                fontSize: "18px",
              }}
            >
              <ListItem sx={{ display: "list-item" }}>
                I understand that my enrolment may be subsidised by the
                Victorian and Commonwealth Government under Skills First
                Program. I understand my enrolment may affect my eligibility for
                more Skills First training.
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                I understand that the Department of Jobs, Skills, Industry and
                Regions may contact me to participate in a survey or interview.
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                I declare the information in this form is true and accurate.
              </ListItem>
            </List>
            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <TextField
                id="outlined-basic"
                fullWidth
                variant="outlined"
                name="name"
                label={
                  <Typography variant="p">
                    Your Name
                    <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                      *
                    </span>
                  </Typography>
                }
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                id="outlined-basic"
                type="date"
                fullWidth
                variant="outlined"
                name="declaration_date"
                InputLabelProps={{ shrink: true }}
                label={
                  <Typography variant="p">
                    Declaration Date
                    <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                      *
                    </span>
                  </Typography>
                }
                value={formik.values.declaration_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.declaration_date &&
                  Boolean(formik.errors.declaration_date)
                }
                helperText={
                  formik.touched.declaration_date &&
                  formik.errors.declaration_date
                }
              />
            </Stack>
          </div>
          <Box component="section" fontWeight={600} textAlign={"center"}>
            <Typography variant="h4" color="inherit" component="div">
              Student Signature
            </Typography>
            <TextField
              id="signature"
              name="signature"
              label="Signature"
              fullWidth
              sx={{ display: "none" }}
              value={formik.values.signature}
              onChange={formik.handleChange}
            />
            <Box
              sx={{
                border: "1px solid black",
                width: "60%",
                margin: "auto",
                mt: "30px",
              }}
            >
              <SignatureCanvas
                ref={signatureRef}
                penColor="black"
                canvasProps={{
                  width: 400,
                  height: 200,
                  className: "sigCanvas",
                }}
                onEnd={() =>
                  formik.setFieldValue(
                    "signature",
                    signatureRef.current.toDataURL()
                  )
                }
              />
            </Box>
            <FormHelperText sx={{ color: "#d32f2f", textAlign: "center" }}>
              {formik.touched.signature && formik.errors.signature}
            </FormHelperText>
            <Button
              variant="contained"
              onClick={clearSignature}
              sx={{ margin: "20px" }}
            >
              Clear Signature
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button color="primary" variant="contained" type="submit">
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Index;
