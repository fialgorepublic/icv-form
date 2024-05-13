import {
  TextField,
  Checkbox,
  MenuItem,
  InputLabel,
  Select,
  Stack,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  ListItem,
  List,
  FormHelperText,
  Box,
  Typography,
  Toolbar,
  AppBar,
} from "@mui/material";

import {
  preferToLearn,
  prefferedLearningStyle,
  computerAccess,
  computerSkillsLevel,
  options,
  computerQuestions,
  computerPrograms,
  encounterDifficulties,
  studyTechniques,
  newLearnings,
  learningmethods,
  preferPresenter,
  supports,
} from "./data";
import { useFormik } from "formik";
import { formInitialValues } from "./initialValues";
import * as yup from "yup";
import axios, { isCancel, AxiosError } from "axios";
import { useState, useEffect } from "react";
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
    prefer_to_learn: yup.string().required("* Please Select Prefer to learn"),
    prefer_learning_style: yup
      .string()
      .required("* Please Select Preferred learning style"),
    access_computer_and_net: yup
      .string()
      .required("* Please Select One Option"),
    computer_skill_level: yup
      .string()
      .required("* Please Select Computer Skill level"),
    require_digital_resource: yup.string().required("* Please Select One"),
    can_login_pc: yup.string().required("* Please Select One"),
    difficulties_in_learning: yup.string().required("* Please Select One"),
    best_way_to_learn: yup.string().required("* Please Select One"),
    when_you_are_learning: yup.string().required("* Please Select One"),
    further_info_to_icv: yup.string().required("* Please Select One"),
    support_to_complete_course: yup.string().required("* Please Select One"),
    prefer_presenter: yup.string().required("* Please Select One"),
    study_techniques_in_past: yup.string().required("* Please Select One"),
    can_send_mail: yup.string().required("* Please Select One"),
    how_encounter_difficulities: yup.string().required("* Please Select One"),
    can_navigate_site: yup.string().required("* Please Select One"),
    can_create_folder: yup.string().required("* Please Select One"),
    can_find_info: yup.string().required("* Please Select One"),
    can_attach_doc: yup.string().required("* Please Select One"),
    can_save_mail: yup.string().required("* Please Select One"),
    can_login_online_system: yup.string().required("* Please Select One"),
    // used_online_software: yup
    //   .string()
    //   .required("* Please Select atleast one program"),
    further_info_description: yup.string().when("further_info_to_icv", {
      is: (val) => val === "Yes",
      then: (schema) => yup.string().required("* Please Select One."),
      otherwise: (schema) => schema.min(0),
    }),
    // difficulties_overcome: yup.string().when("difficulties_in_learning", {
    //   is: (val) => val === "Yes",
    //   then: (schema) =>
    //     yup
    //       .string()
    //       .required(
    //         "* Please give a brief description of your past learning experiences."
    //       ),
    //   otherwise: (schema) => schema.min(0),
    // }),
    solution_access_content: yup.string().when("access_computer_and_net", {
      is: (val) => val === "No",
      then: (schema) =>
        yup
          .string()
          .required(
            "* Please Enter Solutions and strateies for accessing online content."
          ),
      otherwise: (schema) => schema.min(0),
    }),
  });

  const handleSave = async (values) => {
    const id = localStorage.getItem("id");
    console.log("values", values);
    handleLoader(true);
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${id}`, {
        apply_detail: {
          pre_enrollment_attributes: values,
        },
      })
      .then(function (res) {
        localStorage.setItem("data", JSON.stringify(res.data));
        localStorage.setItem("currentAciveStep", 7);
        localStorage.setItem("id", res.data.id);
        handleLoader(false);
        handleNext();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSave,
    validateOnChange: false,
  });
  useEffect(() => {
    if (data && data?.pre_enrollment) {
      console.log("dataaaaaa", data);
      const {
        future_career_goals,
        achieve_career_goals,
        prior_training,
        currently_employed,
        doing_training,
        course_name,
        organisation_name,
        prefer_learn,
        learn_best,
        regular_access_computer,
        user_computer_a_day,
        can_login_pc,
        can_send_mail,
        can_navigate_site,
        can_create_folder,
        can_find_info,
        can_attach_doc,
        can_save_mail,
        can_login_online_system,
        need_support,
        hear_about_us,
        need_support_detail,
        sol_get_online_data,
        prefer_to_learn,
        prefer_learning_style,
        access_computer_and_net,
        solution_access_content,
        computer_skill_level,
        difficulties_in_learning,
        difficulties_overcome,
        how_encounter_difficulities,
        study_techniques_in_past,
        best_way_to_learn,
        when_you_are_learning,
        prefer_presenter,
        support_to_complete_course,
        further_info_to_icv,
        further_info_description,
        used_online_software,
        require_digital_resource,
      } = data.pre_enrollment;
      setInitialValues({
        future_career_goals,
        achieve_career_goals,
        prior_training,
        currently_employed,
        doing_training,
        course_name,
        organisation_name,
        prefer_learn,
        learn_best,
        regular_access_computer,
        user_computer_a_day,
        can_login_pc,
        can_send_mail,
        can_navigate_site,
        can_create_folder,
        can_find_info,
        can_attach_doc,
        can_save_mail,
        can_login_online_system,
        need_support,
        hear_about_us,
        need_support_detail,
        sol_get_online_data,
        prefer_to_learn,
        prefer_learning_style,
        access_computer_and_net,
        solution_access_content,
        computer_skill_level,
        difficulties_in_learning,
        difficulties_overcome,
        how_encounter_difficulities,
        study_techniques_in_past,
        best_way_to_learn,
        when_you_are_learning,
        prefer_presenter,
        support_to_complete_course,
        further_info_to_icv,
        further_info_description,
        used_online_software,
        require_digital_resource,
      });
      // console.log('new dataa', initialValues)
      formik.setValues({
        future_career_goals,
        achieve_career_goals,
        prior_training,
        currently_employed,
        doing_training,
        course_name,
        organisation_name,
        prefer_learn,
        learn_best,
        regular_access_computer,
        user_computer_a_day,
        can_login_pc,
        can_send_mail,
        can_navigate_site,
        can_create_folder,
        can_find_info,
        can_attach_doc,
        can_save_mail,
        can_login_online_system,
        need_support,
        hear_about_us,
        need_support_detail,
        sol_get_online_data,
        prefer_to_learn,
        prefer_learning_style,
        access_computer_and_net,
        solution_access_content,
        computer_skill_level,
        difficulties_in_learning,
        difficulties_overcome,
        how_encounter_difficulities,
        study_techniques_in_past,
        best_way_to_learn,
        when_you_are_learning,
        prefer_presenter,
        support_to_complete_course,
        further_info_to_icv,
        further_info_description,
        used_online_software,
        require_digital_resource,
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
                  Pre-Training Review
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component="section"
              sx={{
                p: 2,
                border: "1px solid grey",
                mt: "20px",
                height: "250px",
                overflow: "scroll",
              }}
            >
              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
                fontWeight={500}
              >
                As a Registered Training Organisation (RTO), ICV must conduct a
                Pre-Training Review for each prospective Student, as part of
                enrolment, or before the commencement of training, to ascertain
                a suitable, and the most suitable, program for that individual
                to enrol in.
              </Typography>
              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
              >
                To ensure that the course you enrol in with us is both suitable
                and appropriate, meaning that the training and assessment;
              </Typography>

              <List
                sx={{
                  listStyleType: "disc",
                  listStylePosition: "inside",
                  fontSize: "18px",
                }}
              >
                <ListItem sx={{ display: "list-item" }}>
                  meets your needs,
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  links to likely job and/or participation outcomes
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  minimises duplication of your existing competencies (identify
                  any competencies previously acquired)
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  is at the appropriate level (taking into consideration
                  literacy and numeracy levels)
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  whether the proposed learning strategies (including online
                  delivery) and materials are appropriate for you, where
                  necessary, the steps to overcome any barriers
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  uses delivery modes and durations optimised for your needs and
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  includes reasonable support to facilitate your participation
                  and achievements
                </ListItem>
              </List>

              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
              >
                During your enrolment process, you have already provided much of
                the information ICV needs to undertake a partial review,
                however, we need to ask you for further information related to
                your existing or previous educational and digital capabilities.
              </Typography>
              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
              >
                Please answer the following questions as best you can. The
                enrolment officer/ student support officer or the administration
                team will be happy to help with any queries you may have. They
                will also review your responses and may ask you some follow-up
                questions to clarify any details and make sure you are happy
                with the process.
              </Typography>

              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
              >
                You are free to withdraw from the enrolment process at any time.
                Similarly, if the enrolment officer considers that this may not
                be the most suitable course for you, they will discuss
                alternative options with you before you make a
                commitment/commence your training.
              </Typography>

              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
              >
                A visit to the Victorian Skills Gateway website may provide you
                with further information to satisfy you, that you are choosing a
                course that is suitable for your career development, or further
                study outcomes and more importantly appropriate for your current
                level of knowledge and skill
              </Typography>
            </Box>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={4}
              ml={2}
              fontSize={18}
            >
              ICV Pre-Training Review is a review that genuinely seeks to
              understand your training needs.
            </Typography>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              ml={2}
              fontSize={18}
            >
              It's a set of questions that encourages you to reflect on your own
              aspirations and guides your selection of suitable training.
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ color: "#000000" }}
                >
                  1. How do you prefer to learn?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="prefer_to_learn"
                  autoFocus
                  value={formik.values.prefer_to_learn}
                  onChange={formik.handleChange}
                >
                  {preferToLearn.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.prefer_to_learn &&
                    formik.errors.prefer_to_learn}
                </FormHelperText>
              </FormControl>
            </Box>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ color: "#000000" }}
                >
                  2. What is your preferred learning style?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="prefer_learning_style"
                  value={formik.values.prefer_learning_style}
                  onChange={formik.handleChange}
                >
                  {prefferedLearningStyle.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.prefer_learning_style &&
                    formik.errors.prefer_learning_style}
                </FormHelperText>
              </FormControl>
            </Box>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              3. The course you have chosen to undertaken may be offered through
              virtual classroom. This means that the course is delivered off
              campus and requires you to use a computer/device to login to your
              classroom, participate in and complete activities and/or
              assessments.
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ color: "#000000" }}
                >
                  (a) Do you have access to computers and the internet?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  row
                  name="access_computer_and_net"
                  value={formik.values.access_computer_and_net}
                  onChange={formik.handleChange}
                >
                  {computerAccess.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.access_computer_and_net &&
                    formik.errors.access_computer_and_net}
                </FormHelperText>
              </FormControl>
            </Box>

            {formik.values.access_computer_and_net === "No" && (
              <Box component="section" sx={{ p: 2 }}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  variant="outlined"
                  label={
                    <Typography variant="p">
                      If No, discuss solutions and strategies for accessing
                      online content when needed and document here.fsadfas
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  name="solution_access_content"
                  value={formik.values.solution_access_content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.solution_access_content &&
                    Boolean(formik.errors.solution_access_content)
                  }
                  helperText={
                    formik.touched.solution_access_content &&
                    formik.errors.solution_access_content
                  }
                />
              </Box>
            )}
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ color: "#000000" }}
                >
                  (b) At what level do you believe your computer skills are at?
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  row
                  name="computer_skill_level"
                  value={formik.values.computer_skill_level}
                  onChange={formik.handleChange}
                >
                  {computerSkillsLevel.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.computer_skill_level &&
                    formik.errors.computer_skill_level}
                </FormHelperText>
              </FormControl>
            </Box>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
              fontWeight={500}
            >
              4. It is an expectation that you can access digital learning
              resources to complete the requirements of your course. Do you
              think you might need assistance with using the technology or
              software used?
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  row
                  name="require_digital_resource"
                  value={formik.values.require_digital_resource}
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
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.require_digital_resource &&
                    formik.errors.require_digital_resource}
                </FormHelperText>
              </FormControl>
            </Box>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
              fontWeight={500}
            >
              Please select the relevant option from dropdown list based on your
              ability.
            </Typography>
            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  I can turn on and login to a personal computer
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.can_login_pc}
                  label={
                    <Typography variant="p">
                      I can turn on and login to a personal computer
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  onChange={formik.handleChange}
                  name="can_login_pc"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.can_login_pc &&
                    Boolean(formik.errors.can_login_pc)
                  }
                  helperText={
                    formik.touched.can_login_pc && formik.errors.can_login_pc
                  }
                >
                  {computerQuestions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.can_login_pc && formik.errors.can_login_pc}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  I can send an email
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.can_send_mail}
                  label={
                    <Typography variant="p">
                      I can send an email
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  onChange={formik.handleChange}
                  name="can_send_mail"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.can_send_mail &&
                    Boolean(formik.errors.can_send_mail)
                  }
                  helperText={
                    formik.touched.can_send_mail && formik.errors.can_send_mail
                  }
                >
                  {computerQuestions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.can_send_mail && formik.errors.can_send_mail}
                </FormHelperText>
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  I can navigate to a website to locate required information
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.can_navigate_site}
                  label={
                    <Typography variant="p">
                      I can navigate to a website to locate required information
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  onChange={formik.handleChange}
                  name="can_navigate_site"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.can_navigate_site &&
                    Boolean(formik.errors.can_navigate_site)
                  }
                  helperText={
                    formik.touched.can_navigate_site &&
                    formik.errors.can_navigate_site
                  }
                >
                  {computerQuestions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.can_navigate_site &&
                    formik.errors.can_navigate_site}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  I can create folders and subfolders and rename them as
                  required
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.can_create_folder}
                  label={
                    <Typography variant="p">
                      I can create folders and subfolders and rename them as
                      required
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  onChange={formik.handleChange}
                  name="can_create_folder"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.can_create_folder &&
                    Boolean(formik.errors.can_create_folder)
                  }
                  helperText={
                    formik.touched.can_create_folder &&
                    formik.errors.can_create_folder
                  }
                >
                  {computerQuestions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.can_create_folder &&
                    formik.errors.can_create_folder}
                </FormHelperText>
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  I can find information using an internet search engine
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.can_find_info}
                  label={
                    <Typography variant="p">
                      I can find information using an internet search engine
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  onChange={formik.handleChange}
                  name="can_find_info"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.can_find_info &&
                    Boolean(formik.errors.can_find_info)
                  }
                  helperText={
                    formik.touched.can_find_info && formik.errors.can_find_info
                  }
                >
                  {computerQuestions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.can_find_info && formik.errors.can_find_info}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  I can attach documents to an email{" "}
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.can_attach_doc}
                  label={
                    <Typography variant="p">
                      I can attach documents to an email
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  onChange={formik.handleChange}
                  name="can_attach_doc"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.can_attach_doc &&
                    Boolean(formik.errors.can_attach_doc)
                  }
                  helperText={
                    formik.touched.can_attach_doc &&
                    formik.errors.can_attach_doc
                  }
                >
                  {computerQuestions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.can_attach_doc &&
                    formik.errors.can_attach_doc}
                </FormHelperText>
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  I can save emails in different folders
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.can_save_mail}
                  label={
                    <Typography variant="p">
                      I can save emails in different folders
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  onChange={formik.handleChange}
                  name="can_save_mail"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.can_save_mail &&
                    Boolean(formik.errors.can_save_mail)
                  }
                  helperText={
                    formik.touched.can_save_mail && formik.errors.can_save_mail
                  }
                >
                  {computerQuestions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.can_save_mail && formik.errors.can_save_mail}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  I can login to an online system and follow prompts
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.can_login_online_system}
                  label={
                    <Typography variant="p">
                      I can login to an online system and follow prompts
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  onChange={formik.handleChange}
                  name="can_login_online_system"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.can_login_online_system &&
                    Boolean(formik.errors.can_login_online_system)
                  }
                  helperText={
                    formik.touched.can_login_online_system &&
                    formik.errors.can_login_online_system
                  }
                >
                  {computerQuestions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.can_login_online_system &&
                    formik.errors.can_login_online_system}
                </FormHelperText>
              </FormControl>
            </Stack>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              5. Have you used any of the following programs?{" "}
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
            <Box component="section">
              {computerPrograms.map((option) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      value={option}
                      checked={formik.values.used_online_software.includes(
                        option
                      )}
                      name="used_online_software"
                      onChange={formik.handleChange}
                    />
                  }
                  label={option}
                  sx={{ m: "auto" }}
                />
              ))}
            </Box>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              6. ICV uses a range of training and assessment strategies
              throughout the course. Some of these may include, written
              assessments, discussions, worksheets, role plays, projects,
              practical demonstrations, case studies/scenarios. In the past,
              have you encountered any difficulties with learning new things?
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  row
                  name="difficulties_in_learning"
                  sx={{ display: "flex", justifyContent: "right" }}
                  value={formik.values.difficulties_in_learning}
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
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.difficulties_in_learning &&
                    formik.errors.difficulties_in_learning}
                </FormHelperText>
              </FormControl>
            </Box>
            {formik.values.difficulties_in_learning === "Yes" && (
              <Box component="section" sx={{ p: 2 }}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  variant="outlined"
                  value={formik.values.difficulties_overcome}
                  label={
                    <Typography variant="p">
                      If you answered Yes, please give a brief description of
                      your past learning experiences below and how these were
                      overcome
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  onChange={formik.handleChange}
                  name="difficulties_overcome"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.difficulties_overcome &&
                    Boolean(formik.errors.difficulties_overcome)
                  }
                  helperText={
                    formik.touched.difficulties_overcome &&
                    formik.errors.difficulties_overcome
                  }
                />
              </Box>
            )}
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              7. If you encounter any difficulties with learning or assessment,
              what would you do?
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  row
                  name="how_encounter_difficulities"
                  value={formik.values.how_encounter_difficulities}
                  onChange={formik.handleChange}
                  sx={{ display: "flex", justifyContent: "left" }}
                >
                  {encounterDifficulties.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.how_encounter_difficulities &&
                    formik.errors.how_encounter_difficulities}
                </FormHelperText>
              </FormControl>
            </Box>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              8. Throughout your course, you will be required to complete
              self-study. What study techniques have you used in the past?
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="study_techniques_in_past"
                  value={formik.values.study_techniques_in_past}
                  onChange={formik.handleChange}
                >
                  {studyTechniques.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.study_techniques_in_past &&
                    formik.errors.study_techniques_in_past}
                </FormHelperText>
              </FormControl>
            </Box>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              9. What's the best way for you to learn something new?
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  row
                  name="best_way_to_learn"
                  value={formik.values.best_way_to_learn}
                  onChange={formik.handleChange}
                  sx={{ display: "flex", justifyContent: "left" }}
                >
                  {newLearnings.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.best_way_to_learn &&
                    formik.errors.best_way_to_learn}
                </FormHelperText>
              </FormControl>
            </Box>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              10. When you are learning you
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="when_you_are_learning"
                  value={formik.values.when_you_are_learning}
                  onChange={formik.handleChange}
                  row
                >
                  {learningmethods.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.when_you_are_learning &&
                    formik.errors.when_you_are_learning}
                </FormHelperText>
              </FormControl>
            </Box>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              11. You prefer a presenter or a teacher who uses
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="prefer_presenter"
                  value={formik.values.prefer_presenter}
                  onChange={formik.handleChange}
                  row
                >
                  {preferPresenter.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.prefer_presenter &&
                    formik.errors.prefer_presenter}
                </FormHelperText>
              </FormControl>
            </Box>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              12. What support do you think you will need to participate and
              complete this course successfully?
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="support_to_complete_course"
                  value={formik.values.support_to_complete_course}
                  onChange={formik.handleChange}
                  row
                >
                  {supports.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.support_to_complete_course &&
                    formik.errors.support_to_complete_course}
                </FormHelperText>
              </FormControl>
            </Box>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              Is there any further information you would like to provide, or ask
              of ICV to help guide and support you through your learning
              journey?
              <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  row
                  name="further_info_to_icv"
                  value={formik.values.further_info_to_icv}
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
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.further_info_to_icv &&
                    formik.errors.further_info_to_icv}
                </FormHelperText>
              </FormControl>
            </Box>
            {formik.values.further_info_to_icv === "Yes" && (
              <Box component="section" sx={{ p: 2 }}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  variant="outlined"
                  value={formik.values.further_info_description}
                  label={
                    <Typography variant="p">
                      If yes, please write below
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  onChange={formik.handleChange}
                  name="further_info_description"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.further_info_description &&
                    Boolean(formik.errors.further_info_description)
                  }
                  helperText={
                    formik.touched.further_info_description &&
                    formik.errors.further_info_description
                  }
                />
              </Box>
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
