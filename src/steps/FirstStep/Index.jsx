import { AddCircleOutline } from "@mui/icons-material";
import { formInitialValues } from "./initialValues";
import { useFormik } from "formik";
import * as yup from "yup";
import axios, { isCancel, AxiosError } from "axios";
import Courses from "./Cources";
import { useState, useEffect } from "react";

import {
  AppBar,
  Toolbar,
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
  Box,
  Button,
  FormHelperText,
} from "@mui/material";

import {
  learningPreference,
  detailTitle,
  genderDetail,
  preferredLocations,
  internationStudents,
} from "./data";

export default function Index({
  data,
  activeStep,
  handleNext,
  steps,
  handleLoader,
}) {
  const [expandAccordion, setExpandAccordion] = useState(false);

  const [initialValues, setInitialValues] = useState(formInitialValues);

  const validationSchema = yup.object({
    course_id: yup.string().required("* Please Select Course"),
    student_start_course: yup.date().required("* Please select proposed date"),
    like_to_study: yup.string().required("* Please select like to study"),
    student_course_location: yup.string().when("like_to_study", {
      is: (like_to_study) => like_to_study === "In-class",
      then: (schema) => yup.string().required("* Please Select Location"),
      otherwise: (schema) => schema.min(0),
    }),
    given_name: yup.string().required("* Please Enter Given Name"),
    family_name: yup.string().required("* Please Enter Family Name"),
    dob: yup.string().required("* Please Select date of birth"),
  });

  const handleSave = async (values) => {
    console.log("values", values);
    handleLoader(true);
    if (data?.id) {
      console.log("true", data.id);
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${data.id}`,
          {
            apply_detail: values,
          }
        )
        .then(function (res) {
          localStorage.setItem("data", JSON.stringify(res.data));
          localStorage.setItem("currentAciveStep", 1);
          localStorage.setItem("id", res.data.id);
          handleLoader(false);
          handleNext();
        })
        .catch(function (error) {
          console.log("fahad", error);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/v1/apply_details`, {
          apply_detail: values,
        })
        .then(function (res) {
          localStorage.setItem("data", JSON.stringify(res.data));
          localStorage.setItem("currentAciveStep", 1);
          localStorage.setItem("id", res.data.id);
          handleLoader(false);
          handleNext();
        })
        .catch(function (error) {
          console.log("fahad", error);
        });
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSave,
    validateOnChange: false,
  });

  useEffect(() => {
    if (data) {
      const {
        course_id,
        student_start_course,
        like_to_study,
        student_course_location,
        title,
        given_name,
        family_name,
        dob,
        middle_name,
        international_student,
        gender,
      } = data;
      setInitialValues({
        course_id,
        student_start_course,
        like_to_study,
        student_course_location,
        title,
        given_name,
        family_name,
        dob,
        middle_name,
        international_student,
        gender,
      });

      formik.setValues({
        course_id,
        student_start_course,
        like_to_study,
        student_course_location,
        title,
        given_name,
        family_name,
        middle_name,
        dob,
        international_student,
        gender,
      });
    }
  }, [data]);
  console.log("Error", formik?.errors);
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
                  Select Course
                </Typography>
              </Toolbar>
            </AppBar>

            <Courses
              formik={formik}
              handleChange={formik.handleChange}
              handleLoader={handleLoader}
            />

            <FormHelperText sx={{ color: "#d32f2f" }}>
              {formik.touched.course_id && formik.errors.course_id}
            </FormHelperText>
            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <TextField
                id="outlined-basic"
                fullWidth
                type="date"
                name="student_start_course"
                value={formik.values.student_start_course}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputLabelProps={{ shrink: true }}
                error={
                  formik.touched.student_start_course &&
                  Boolean(formik.errors.student_start_course)
                }
                helperText={
                  formik.touched.student_start_course &&
                  formik.errors.student_start_course
                }
                label={
                  <Typography variant="p">
                    When would you like to start this course?
                    <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                      *
                    </span>
                  </Typography>
                }
                variant="outlined"
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label1">
                  How would you like to study?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label1"
                  id="demo-simple-select"
                  name="like_to_study"
                  label={
                    <Typography variant="p">
                      How would you like to study?
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  value={formik.values.like_to_study}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.like_to_study &&
                    Boolean(formik.errors.like_to_study)
                  }
                >
                  {learningPreference.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.like_to_study && formik.errors.like_to_study}
                </FormHelperText>
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ mt: "20px" }}>
              {formik.values.like_to_study === "In-class" && (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    What is your preferred location to undertake this course?
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="student_course_location"
                    value={formik.values.student_course_location}
                    label="What is your preferred location to undertake this course?"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.student_course_location &&
                      Boolean(formik.errors.student_course_location)
                    }
                  >
                    {preferredLocations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {formik.touched.student_course_location &&
                      formik.errors.student_course_location}
                  </FormHelperText>
                </FormControl>
              )}
            </Stack>
            <Accordion defaultExpanded={expandAccordion}>
              <AccordionSummary
                expandIcon={
                  <AddCircleOutline
                    sx={{ color: "#ffffff", fontSize: "30px" }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ background: "#1976d2", mt: "35px", color: "#ffffff" }}
              >
                <Typography variant="h6" color="inherit" component="div">
                  Personal Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Title</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="title"
                      value={formik.values.title}
                      label="How would you like to study?"
                      onChange={formik.handleChange}
                    >
                      {detailTitle.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    label={
                      <Typography variant="p">
                        Given Name
                        <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                          *
                        </span>
                      </Typography>
                    }
                    variant="outlined"
                    name="given_name"
                    value={formik.values.given_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.given_name &&
                      Boolean(formik.errors.given_name)
                    }
                    helperText={
                      formik.touched.given_name && formik.errors.given_name
                    }
                  />
                </Stack>
                <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    label="Middle Name"
                    variant="outlined"
                    name="middle_name"
                    value={formik.values.middle_name}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    label={
                      <Typography variant="p">
                        Family Name
                        <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                          *
                        </span>
                      </Typography>
                    }
                    variant="outlined"
                    name="family_name"
                    value={formik.values.family_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.family_name &&
                      Boolean(formik.errors.family_name)
                    }
                    helperText={
                      formik.touched.family_name && formik.errors.family_name
                    }
                  />
                </Stack>
                <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker"]}
                      sx={{ width: "100%" }}
                    >
                      <DatePicker
                        label={
                          <Typography variant="p">
                            Date of Birth
                            <span
                              style={{ color: "#d32f2f", marginLeft: "3px" }}
                            >
                              *
                            </span>
                          </Typography>
                        }
                        name="dob"
                        value={formik?.values?.dob}
                        onChange={(newVal) =>
                          formik.setFieldValue("dob", newVal)
                        }
                        onBlur={formik.handleBlur}
                        error={formik.touched.dob && Boolean(formik.errors.dob)}
                        helperText={formik.touched.dob && formik.errors.dob}
                      />
                    </DemoContainer>
                  </LocalizationProvider> */}
                  <TextField
                    id="outlined-basic"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    name="dob"
                    label={
                      <Typography variant="p">
                        Date of Birth
                        <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                          *
                        </span>
                      </Typography>
                    }
                    variant="outlined"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                    helperText={formik.touched.dob && formik.errors.dob}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="gender"
                      value={formik.values.gender}
                      label="Gender"
                      onChange={formik.handleChange}
                    >
                      {genderDetail.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={
                  <AddCircleOutline
                    sx={{ color: "#ffffff", fontSize: "30px" }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ background: "#1976d2", mt: "35px", color: "#ffffff" }}
              >
                <Typography variant="h6" color="inherit" component="div">
                  Are you an overseas or Local Student?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Are you applying as an international student (requiring an
                      international student visa) or as a Local student?
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="international_student"
                      value={formik.values.international_student}
                      label="Are you applying as an international student (requiring an international student visa) or as a Local student?"
                      onChange={formik.handleChange}
                    >
                      {internationStudents.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </div>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button color="primary" variant="contained" type="submit">
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </form>
    </>
  );
}
