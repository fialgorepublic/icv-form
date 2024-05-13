import {
  ListItem,
  List,
  Box,
  Checkbox,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  TextField,
  Stack,
  Typography,
  Toolbar,
  AppBar,
  Button,
  FormHelperText,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  countryList,
  EnglishLevel,
  states,
  qualificationLevels,
  highestSchoolLever,
  employmentStatuses,
  employmentDuration,
  employmentIndustries,
  occupations,
  reasonsForCourse,
  disabilities,
  languages_list,
  straitIslander,
} from "./data";
import { formInitialValues } from "./initialValues";
import * as yup from "yup";
import axios, { isCancel, AxiosError } from "axios";
const Index = ({
  data,
  activeStep,
  handleNext,
  handleBack,
  steps,
  handleLoader,
}) => {
  const [initialValues, setInitialValues] = useState(formInitialValues);
  const validationSchema = yup.object({
    born_country: yup.string().required("* Please Select Country"),
    born_town: yup.string().required("* Please Enter Born Town"),
    speak_other_language: yup
      .string()
      .required("* Please Select Other Language"),
    english_level: yup.string().required("* Please Select your English Level"),
    islander_origin: yup
      .string()
      .required("* Please Select Aboriginal or Torres Strait Islander origin?"),
    highest_school_level: yup
      .string()
      .required("* Please Select Highest School Level"),
    // completed_school_year: yup.string().when("highest_school_level", {
    //   is: (val) => val === "Never attended school",
    //   then: (schema) => yup.string().required("* Please Select School Completed Year"),
    //   otherwise: (schema) => schema.min(0),
    // }),
    // completed_school_name: yup.string().when("highest_school_level", {
    //   is: (highest_school_level) =>
    //     highest_school_level === "Never attended school",
    //   then: (schema) => yup.string().required("* Please Enter School Name"),
    //   otherwise: (schema) => schema.min(0),
    // }),
    still_secondry_school: yup.string().required("* Please Select Value"),
    completed_qualification: yup.string().required("* Please Select one"),
    name_of_qualification: yup.string().when("completed_qualification", {
      is: (completed_qualification) => completed_qualification === "Yes",
      then: (schema) => yup.string().required("* Please Enter Qualification"),
      otherwise: (schema) => schema.min(0),
    }),
    // speak_language_than_english: yup.string().when("speak_other_language", {
    //   is: (val) => val == "Yes",
    //   then: (schema) => yup.string().required("Please Select Language"),
    //   otherwise: (schema) => schema.min(0),
    // }),
    reason_for_taking_course: yup
      .string()
      .required("* Please Select One Reason"),
    disability: yup.string().required("* Please Select One Option"),
  });

  const handleSave = async (values) => {
    const id = localStorage.getItem("id");
    handleLoader(true);
    console.log(values);
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${id}`, {
        apply_detail: values,
      })
      .then(function (res) {
        localStorage.setItem("data", JSON.stringify(res.data));
        localStorage.setItem("currentAciveStep", 6);
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
    window.scrollTo(20, 100);
    if (data) {
      const {
        born_country,
        born_town,
        speak_other_language,
        speak_language_than_english,
        english_level,
        islander_origin,
        highest_school_level,
        completed_school_year,
        completed_school_name,
        still_secondry_school,
        completed_qualification,
        certificate_I,
        certificate_II,
        certificate_III,
        certificate_IV,
        diploma_level,
        advanced_degree,
        bachelor_degree,
        other_certificate,
        name_of_qualification,
        qualification_completed_year,
        current_employment_status,
        reason_for_taking_course,
        disability,
        having_disabilites,
        employment_duration,
        employment_industry,
        occupation,
      } = data;
      setInitialValues({
        born_country,
        born_town,
        speak_other_language,
        speak_language_than_english,
        english_level,
        islander_origin,
        highest_school_level,
        completed_school_year,
        completed_school_name,
        still_secondry_school,
        completed_qualification,
        certificate_I,
        certificate_II,
        certificate_III,
        certificate_IV,
        diploma_level,
        advanced_degree,
        bachelor_degree,
        other_certificate,
        name_of_qualification,
        qualification_completed_year,
        current_employment_status,
        reason_for_taking_course,
        disability,
        having_disabilites,
        employment_duration,
        employment_industry,
        occupation,
      });
      // console.log('new dataa', initialValues)
      formik.setValues({
        born_country,
        born_town,
        speak_other_language,
        speak_language_than_english,
        english_level,
        islander_origin,
        highest_school_level,
        completed_school_year,
        completed_school_name,
        still_secondry_school,
        completed_qualification,
        certificate_I,
        certificate_II,
        certificate_III,
        certificate_IV,
        diploma_level,
        advanced_degree,
        bachelor_degree,
        other_certificate,
        name_of_qualification,
        qualification_completed_year,
        current_employment_status,
        reason_for_taking_course,
        disability,
        having_disabilites,
        employment_duration,
        employment_industry,
        occupation,
      });
    }
  }, [data]);

  console.log("Errors", formik.errors);
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
                  Government Data Collection Requirements
                </Typography>
              </Toolbar>
            </AppBar>
            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  In which country were you born?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="born_country"
                  autoFocus
                  label={
                    <Typography variant="p">
                      In which country were you born?
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  value={formik.values.born_country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.born_country &&
                    Boolean(formik.errors.born_country)
                  }
                >
                  {countryList.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.born_country && formik.errors.born_country}
                </FormHelperText>
              </FormControl>
              <TextField
                id="outlined-basic"
                fullWidth
                variant="outlined"
                name="born_town"
                label={
                  <Typography variant="p">
                    Town of Birth
                    <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                      *
                    </span>
                  </Typography>
                }
                value={formik.values.born_town}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.born_town && Boolean(formik.errors.born_town)
                }
                helperText={formik.touched.born_town && formik.errors.born_town}
              />
            </Stack>

            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  How well do you speak English?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="english_level"
                  label={
                    <Typography variant="p">
                      How well do you speak English?
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  value={formik.values.english_level}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.english_level &&
                    Boolean(formik.errors.english_level)
                  }
                >
                  {EnglishLevel.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.english_level && formik.errors.english_level}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Do you speak another language apart from English at home?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="speak_other_language"
                  label={
                    <Typography variant="p">
                      Do you speak another language apart from English at home?
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  value={formik.values.speak_other_language}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.speak_other_language &&
                    Boolean(formik.errors.speak_other_language)
                  }
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.speak_other_language &&
                    formik.errors.speak_other_language}
                </FormHelperText>
              </FormControl>
            </Stack>
            {formik.values.speak_other_language === "Yes" && (
              <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Please specify below and if more than one language, indicate
                    the one that is spoken most at home?
                    <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                      *
                    </span>
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="speak_language_than_english"
                    label={
                      <Typography variant="p">
                        Please specify below and if more than one language,
                        indicate the one that is spoken most at home? *
                        <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                          *
                        </span>
                      </Typography>
                    }
                    value={formik.values.speak_language_than_english}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.speak_language_than_english &&
                      Boolean(formik.errors.speak_language_than_english)
                    }
                  >
                    {languages_list.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {formik.touched.speak_language_than_english &&
                      formik.errors.speak_language_than_english}
                  </FormHelperText>
                </FormControl>
              </Stack>
            )}

            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Are you of Aboriginal or Torres Strait Islander origin?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="islander_origin"
                  label={
                    <Typography variant="p">
                      Are you of Aboriginal or Torres Strait Islander origin?
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  value={formik.values.islander_origin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.islander_origin &&
                    Boolean(formik.errors.islander_origin)
                  }
                >
                  {straitIslander.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.islander_origin &&
                    formik.errors.islander_origin}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  What is your highest COMPLETED school level?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="highest_school_level"
                  label={
                    <Typography variant="p">
                      What is your highest COMPLETED school level?
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  value={formik.values.highest_school_level}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.highest_school_level &&
                    Boolean(formik.errors.highest_school_level)
                  }
                >
                  {highestSchoolLever.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.highest_school_level &&
                    formik.errors.highest_school_level}
                </FormHelperText>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  In which year did you complete that school level?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  disabled={
                    formik.values.highest_school_level === "" ||
                    formik.values.highest_school_level ===
                      "Never attended school"
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="completed_school_year"
                  label={
                    <Typography variant="p">
                      In which year did you complete that school level?
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  value={formik.values.completed_school_year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.completed_school_year &&
                    Boolean(formik.errors.completed_school_year)
                  }
                >
                  {Array(51)
                    .fill(1974)
                    .map((x, y) => x + y)

                    .map((val) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.completed_school_year &&
                    formik.errors.completed_school_year}
                </FormHelperText>
              </FormControl>
              <TextField
                disabled={
                  formik.values.highest_school_level === "" ||
                  formik.values.highest_school_level === "Never attended school"
                }
                id="outlined-basic"
                fullWidth
                variant="outlined"
                name="completed_school_name"
                label={
                  <Typography variant="p">
                    School Name
                    <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                      *
                    </span>
                  </Typography>
                }
                value={formik.values.completed_school_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.completed_school_name &&
                  Boolean(formik.errors.completed_school_name)
                }
                helperText={
                  formik.touched.completed_school_name &&
                  formik.errors.completed_school_name
                }
              />
            </Stack>

            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Are you still at secondary school?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="still_secondry_school"
                  label={
                    <Typography variant="p">
                      Are you still at secondary school?
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  value={formik.values.still_secondry_school}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.still_secondry_school &&
                    Boolean(formik.errors.still_secondry_school)
                  }
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.still_secondry_school &&
                    formik.errors.still_secondry_school}
                </FormHelperText>
              </FormControl>
            </Stack>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={4}
              fontSize={17}
            >
              Have you successfully COMPLETED any of the following
              qualifications?
            </Typography>
            <Grid container spacing={2} textAlign={"center"}>
              <Grid item xs={4}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  mt={4}
                  fontSize={17}
                >
                  A = Australian qualification
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  mt={4}
                  fontSize={17}
                >
                  E = Australian Equivalent qualification
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  mt={4}
                  fontSize={17}
                >
                  I = International
                </Typography>
              </Grid>
            </Grid>

            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="completed_qualification"
              value={formik.values.completed_qualification}
              onChange={formik.handleChange}
            >
              <Stack
                direction="row"
                spacing={10}
                sx={{ mt: "50px", justifyContent: "center" }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label="No, none – please go to next question"
                />
              </Stack>
              <FormHelperText sx={{ color: "#d32f2f", textAlign: "center" }}>
                {formik.touched.completed_qualification &&
                  formik.errors.completed_qualification}
              </FormHelperText>
            </RadioGroup>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={4}
              fontSize={17}
            >
              please tick the applicable box against ANY qualification level you
              have, where;
            </Typography>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              ml={3}
              fontSize={15}
            >
              If yes, choose the relevant qualification. Note: If you have
              multiple qualifications at the same level from different
              locations, use the following priority order to determine which
              identifier to use:
            </Typography>
            <Grid container spacing={2} textAlign={"center"}>
              <Grid item xs={4}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  mt={4}
                  fontSize={17}
                >
                  1 = Australian qualification
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  mt={4}
                  fontSize={17}
                >
                  2 = Australian Equivalent qualification
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  mt={4}
                  fontSize={17}
                >
                  3= International qualification
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={4}>
              <Grid item xs={6}>
                <TableContainer
                  component={Paper}
                  sx={{ background: "rgba(243, 246, 249, 0.6)" }}
                >
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">A</TableCell>
                        <TableCell align="center">E</TableCell>
                        <TableCell align="center">I</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {qualificationLevels.slice(0, 4).map((option) => (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            <Checkbox
                              disabled={
                                formik.values.completed_qualification === "No"
                              }
                              checked={formik?.values[option?.name]?.includes(
                                "Australian qualification"
                              )}
                              value="Australian qualification"
                              name={option.name}
                              onChange={formik.handleChange}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              disabled={
                                formik.values.completed_qualification === "No"
                              }
                              checked={formik.values[option.name]?.includes(
                                "Australian Equivalent qualification"
                              )}
                              value="Australian Equivalent qualification"
                              name={option.name}
                              onChange={formik.handleChange}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              disabled={
                                formik.values.completed_qualification === "No"
                              }
                              checked={formik.values[option.name]?.includes(
                                "International"
                              )}
                              value="International"
                              name={option.name}
                              onChange={formik.handleChange}
                            />
                          </TableCell>
                          <TableCell align="center">{option.label}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={6}>
                <TableContainer
                  component={Paper}
                  sx={{ background: "rgba(243, 246, 249, 0.6)" }}
                >
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">A</TableCell>
                        <TableCell align="center">E</TableCell>
                        <TableCell align="center">I</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {qualificationLevels.slice(4, 8).map((option) => (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            <Checkbox
                              disabled={
                                formik.values.completed_qualification === "No"
                              }
                              checked={formik.values[option.name]?.includes(
                                "Australian qualification"
                              )}
                              value="Australian qualification"
                              name={option.name}
                              onChange={formik.handleChange}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              disabled={
                                formik.values.completed_qualification === "No"
                              }
                              checked={formik.values[option.name]?.includes(
                                "Australian Equivalent qualification"
                              )}
                              value="Australian Equivalent qualification"
                              name={option.name}
                              onChange={formik.handleChange}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              disabled={
                                formik.values.completed_qualification === "No"
                              }
                              checked={formik.values[option.name]?.includes(
                                "International"
                              )}
                              value="International"
                              name={option.name}
                              onChange={formik.handleChange}
                            />
                          </TableCell>
                          <TableCell align="center">{option.label}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <TextField
                id="outlined-basic"
                fullWidth
                variant="outlined"
                name="name_of_qualification"
                disabled={formik.values.completed_qualification === "No"}
                label={
                  <Typography variant="p">
                    Name of qualifications/trade
                    <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                      *
                    </span>
                  </Typography>
                }
                value={formik.values.name_of_qualification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.name_of_qualification &&
                  Boolean(formik.errors.name_of_qualification)
                }
                helperText={
                  formik.touched.name_of_qualification &&
                  formik.errors.name_of_qualification
                }
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Year completed
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="qualification_completed_year"
                  value={formik.values.qualification_completed_year}
                  disabled={formik.values.completed_qualification === "No"}
                  label={<Typography variant="p">Year completed</Typography>}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.qualification_completed_year &&
                    Boolean(formik.errors.qualification_completed_year)
                  }
                >
                  {Array(51)
                    .fill(1974)
                    .map((x, y) => x + y)

                    .map((val) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Which of the following categories best describe your current
                  employment status?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="current_employment_status"
                  label={
                    <Typography variant="p">
                      Which of the following categories best describe your
                      current employment status?
                    </Typography>
                  }
                  value={formik.values.current_employment_status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.current_employment_status &&
                    Boolean(formik.errors.current_employment_status)
                  }
                >
                  {employmentStatuses.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            {(formik.values.current_employment_status ===
              "Full time employee" ||
              formik.values.current_employment_status ===
                "Part time employee") && (
              <>
                <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      How long have you worked with this employer?
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="employment_duration"
                      label={
                        <Typography variant="p">
                          How long have you worked with this employer?
                        </Typography>
                      }
                      value={formik.values.employment_duration}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.employment_duration &&
                        Boolean(formik.errors.employment_duration)
                      }
                    >
                      {employmentDuration.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Industry of Employment (not required if never employed)
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="employment_industry"
                      label={
                        <Typography variant="p">
                          Industry of Employment (not required if never
                          employed)
                        </Typography>
                      }
                      value={formik.values.employment_industry}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.employment_industry &&
                        Boolean(formik.errors.employment_industry)
                      }
                    >
                      {employmentIndustries.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Occupation (not required if never employed)
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="occupation"
                      label={
                        <Typography variant="p">
                          Occupation (not required if never employed)
                        </Typography>
                      }
                      value={formik.values.occupation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.occupation &&
                        Boolean(formik.errors.occupation)
                      }
                    >
                      {occupations.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </>
            )}

            {formik.values.current_employment_status ===
              "Self employed - not employing others" && (
              <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Industry of Employment (not required if never employed)
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="employment_industry"
                    label={
                      <Typography variant="p">
                        Industry of Employment (not required if never employed)
                      </Typography>
                    }
                    value={formik.values.employment_industry}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.employment_industry &&
                      Boolean(formik.errors.employment_industry)
                    }
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Occupation (not required if never employed)
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="occupation"
                    label={
                      <Typography variant="p">
                        Occupation (not required if never employed)
                      </Typography>
                    }
                    value={formik.values.occupation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.occupation &&
                      Boolean(formik.errors.occupation)
                    }
                  >
                    {states.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            )}

            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  What is your main reason for undertaking this course?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="reason_for_taking_course"
                  label={
                    <Typography variant="p">
                      What is your main reason for undertaking this course?
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  value={formik.values.reason_for_taking_course}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.reason_for_taking_course &&
                    Boolean(formik.errors.reason_for_taking_course)
                  }
                >
                  {reasonsForCourse.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.reason_for_taking_course &&
                    formik.errors.reason_for_taking_course}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Do you consider yourself to have a disability, impairment or
                  long-term medical condition?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}></span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="disability"
                  label={
                    <Typography variant="p">
                      What is your main reason for undertaking this course?
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  value={formik.values.disability}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.disability &&
                    Boolean(formik.errors.disability)
                  }
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.disability && formik.errors.disability}
                </FormHelperText>
              </FormControl>
            </Stack>

            {formik.values.disability === "Yes" && (
              <>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  mt={4}
                  fontSize={17}
                >
                  If you indicated the presence of a disability, impairment or
                  long-term medical condition, please select the areas in the
                  following list: (You may indicate one or more areas). Please
                  refer to the Disability supplement for an explanation of the
                  following disabilities.
                </Typography>
                <Box component="section">
                  <List
                    sx={{
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                  >
                    {disabilities.map((option) => (
                      <ListItem sx={{ display: "list-item" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formik.values.having_disabilites.includes(
                                option
                              )}
                              value={option}
                              name="having_disabilites"
                              onChange={formik.handleChange}
                            />
                          }
                          label={option}
                          sx={{ m: "auto" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </>
            )}
          </div>
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
