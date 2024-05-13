import {
  Button,
  TextField,
  List,
  ListItem,
  FormLabel,
  Box,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Typography,
  Toolbar,
  AppBar,
} from "@mui/material";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { formInitialValues } from "./initialValues";
import axios, { isCancel, AxiosError } from "axios";
import UploadFileIcon from "@mui/icons-material/UploadFile";
const options = ["Yes", "No"];
const Index = ({
  data,
  activeStep,
  handleNext,
  handleBack,
  steps,
  handleLoader,
}) => {
  const [initialValues, setInitialValues] = useState(formInitialValues);

  const handleSave = async (values) => {
    const id = localStorage.getItem("id");
    handleLoader(true);
    const formData = new FormData();
    formData.append(
      "apply_detail[apply_for_credit_transeer]",
      values.apply_for_credit_transeer
    );
    formData.append(
      "apply_detail[competency_credit_transfer]",
      values.competency_credit_transfer
    );
    formData.append("apply_detail[apply_for_rpl]", values.apply_for_rpl);
    formData.append(
      "apply_detail[competency_for_rpl]",
      values.competency_for_rpl
    );
    formData.append(
      "apply_detail[supporting_evidence]",
      values.supporting_evidence
    );
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (res) {
        localStorage.setItem("data", JSON.stringify(res.data));
        localStorage.setItem("currentAciveStep", 10);
        localStorage.setItem("id", res.data.id);
        handleLoader(false);
        handleNext();
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSave,
    validateOnChange: false,
  });

  useEffect(() => {
    if (data) {
      const {
        apply_for_credit_transeer,
        apply_for_rpl,
        competency_credit_transfer,
        competency_for_rpl,
      } = data;
      setInitialValues({
        apply_for_credit_transeer,
        apply_for_rpl,
        competency_credit_transfer,
        competency_for_rpl,
      });
      // console.log('new dataa', initialValues)
      formik.setValues({
        apply_for_credit_transeer,
        apply_for_rpl,
        competency_credit_transfer,
        competency_for_rpl,
      });
    }
  }, [data]);
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
                  Credit Transfer (CT) / Recognition of Prior Learning (RPL) /
                  Recognition of Current Competencies (RCC).
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
              Applicants have the opportunity to provide evidence of the level
              of their knowledge, skills and expertise to show ICV why they do
              not need to repeat particular learning experiences within the
              qualifications offered by ICV. This can be demonstrated through
              Credit Transfer (CT) or Recognition of Prior Learning (RPL).
            </Typography>

            <Box component="section" sx={{ p: 2 }}>
              <FormControl>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ color: "#000000", textAlign: "center" }}
                >
                  <b>Credit Transfer </b>is a process that provides students
                  with agreed and consistent credit outcomes for components of a
                  qualification based on identified equivalence in content and
                  learning outcomes between matched qualifications.
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  row
                  name="apply_for_credit_transeer"
                  value={formik.values.apply_for_credit_transeer}
                  onChange={formik.handleChange}
                  sx={{ justifyContent: "center", mt: "15px" }}
                >
                  {options.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <TextField
                id="outlined-basic"
                fullWidth
                multiline
                rows={4}
                label="Please enter the units of competency for Credit Transfer"
                variant="outlined"
                sx={{ mt: "25px" }}
                disabled={
                  formik.values.apply_for_credit_transeer === "" ||
                  formik.values.apply_for_credit_transeer === "No"
                }
                name="competency_credit_transfer"
                value={formik.values.competency_credit_transfer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={4}
              ml={2}
              fontSize={18}
              sx={{ textAlign: "center" }}
            >
              <b>
                Recognition of Prior Learning (RPL)/ Recognition of Current
                Competencies (RCC)
              </b>{" "}
              RPL/RCC is an assessment process that involves assessment of an
              individual’s relevant prior learning (including formal, informal
              and non-formal learning).
            </Typography>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={4}
              ml={2}
              fontSize={18}
              sx={{ textAlign: "center" }}
            >
              RPL enables students who have not undertaken the unit or
              equivalent but have the required knowledge and skills to
              demonstrate competency for the unit in an assessment only pathway.
              An RPL assessment kit is available for applicants wishing to apply
              for RPL and information sessions are available to support them in
              their application process.
            </Typography>

            <Box component="section" sx={{ p: 2 }}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ color: "#000000", textAlign: "center" }}
                >
                  Do you want to apply for RPL (Recognition of Prior Learning)?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="apply_for_rpl"
                  value={formik.values.apply_for_rpl}
                  onChange={formik.handleChange}
                  row
                  sx={{ justifyContent: "center", mt: "15px" }}
                >
                  {options.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <TextField
                id="outlined-basic"
                fullWidth
                multiline
                rows={4}
                helperText=""
                label="Please enter the units of competency for RPL / RCC"
                variant="outlined"
                sx={{ mt: "25px" }}
                disabled={
                  formik.values.apply_for_rpl === "" ||
                  formik.values.apply_for_rpl === "No"
                }
                name="competency_for_rpl"
                value={formik.values.competency_for_rpl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
            <Box component="section" sx={{ p: 2 }}>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit" component="div">
                    Verification of Documentation
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={4}
              ml={2}
              fontSize={18}
              lineHeight={1.3}
            >
              In certain instances, ICV is required to verify documentation
              provided by prospective students in support of their application.
              For the purpose of AQF Certification, ICV will either authenticate
              the information by directly accessing the USI transcript online
              (where a student has activated permission for ICV to do so in the
              USI Registry System), or by contacting the organisation that
              issued the document to confirm the content is valid.
            </Typography>
            <List
              sx={{
                listStyleType: "disc",
                listStylePosition: "inside",
                fontSize: "18px",
              }}
            >
              For the purpose of personal documentation, such as proof of
              identity, ICV will;
              <ListItem sx={{ display: "list-item" }}>
                Accept a certified copy (an ‘original copy’ certified by a
                person who is on the list of approved witnesses-) as listed on
                the Commonwealth Attorney General’s Department website at:{" "}
                <a
                  href="www.ag.gov.au/Publications/Pages/Statutorydeclarationsignatorylist.aspx"
                  target="_blank"
                >
                  www.ag.gov.au/Publications/Pages/Statutorydeclarationsignatorylist.aspx
                </a>
                .
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                Sight the original documentation and make a copy.
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                Use the Commonwealth Government’s Document Verification Service
                (the DVS) to compare an individual's identifying information
                with a government record.
              </ListItem>
            </List>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={4}
              ml={2}
              fontSize={18}
              lineHeight={1.3}
            >
              Please upload a zip file of any testamurs or other supporting
              evidence (optional):
            </Typography>
            <Box component="section" sx={{ p: 2 }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileIcon />}
                sx={{ marginRight: "1rem" }}
              >
                Upload
                <input
                  type="file"
                  hidden
                  name="supporting_evidence"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "supporting_evidence",
                      event.currentTarget.files[0]
                    );
                  }}
                />
              </Button>
              <span
                style={{
                  marginLeft: "10px",
                  fontSize: "20px",
                }}
              >
                {formik.values?.supporting_evidence?.name}
              </span>
              <TextField
                id="outlined-basic"
                fullWidth
                multiline
                rows={4}
                helperText=""
                name="additional_info_industry_experience"
                value={formik.values.additional_info_industry_experience}
                onChange={formik.handleChange}
                label="Did you have any other information to add, including details of any relevant industry experience?"
                variant="outlined"
                sx={{ mt: "25px" }}
              />
            </Box>
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
