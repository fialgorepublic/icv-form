import {
  Box,
  Typography,
  Grid,
  Checkbox,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { formInitialValues } from "./initialValues";
import { useFormik } from "formik";
import * as yup from "yup";
import axios, { isCancel, AxiosError } from "axios";
import SignatureCanvas from "react-signature-canvas";
import { useRef, useEffect, useState } from "react";
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
    privacy_statement_consent: yup.string().required("* Please Select"),
    read_LLN: yup.string().required("* Please Select"),
    read_eligibility_form: yup.string().required("* Please Select"),
    info_sheet_acknowledgment: yup.string().required("* Please Select"),
    enrollment_agreement_consent: yup.string().required("* Please Select"),
    read_fee_structure: yup.string().required("* Please Select"),
    terms_and_condition: yup
      .string()
      .required("* Please Select term and condition"),
    signature: yup.string().required("* Please Add Your Signature"),
  });

  const handleSave = async (values) => {
    const id = localStorage.getItem("id");
    handleLoader(true);
    console.log("values", values);
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${id}`, {
        apply_detail: {...values, completed: true},
      })
      .then(function (res) {
        localStorage.removeItem("data");
        localStorage.removeItem("id");

        localStorage.setItem("currentAciveStep", 11);
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
        privacy_statement_consent,
        read_LLN,
        read_eligibility_form,
        info_sheet_acknowledgment,
        enrollment_agreement_consent,
        read_fee_structure,
        terms_and_condition,
        signature,
        completed,
      } = data;

      setInitialValues({
        privacy_statement_consent,
        read_LLN,
        read_eligibility_form,
        info_sheet_acknowledgment,
        enrollment_agreement_consent,
        read_fee_structure,
        terms_and_condition,
        signature,
        completed,
      });
      // console.log('new dataa', initialValues)
      formik.setValues({
        privacy_statement_consent,
        read_LLN,
        read_eligibility_form,
        info_sheet_acknowledgment,
        enrollment_agreement_consent,
        read_fee_structure,
        terms_and_condition,
        signature,
        completed,
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
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={4}
              ml={2}
              fontSize={18}
              fontWeight={600}
            >
              THIS IS IMPORTANT
            </Typography>
            <Box
              component="section"
              sx={{
                p: 2,
                border: "1px solid grey",
                mt: "20px",
                height: "200px",
                overflow: "scroll",
              }}
            >
              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
                lineHeight={1.3}
              >
                This qualification is intended for learners who are serious
                about enrolling in and completing the course. The course
                timetable does not allow for uncommitted learners.
              </Typography>

              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
                lineHeight={1.3}
              >
                So you must read, understand, agree and sign the Enrolment
                Agreement (You will get a chance to download a copy of this
                Enrolment Agreement once you will complete this application
                form)
              </Typography>

              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
                lineHeight={1.3}
              >
                In particular, you must understand that failure to meet the
                assessment and attendance requirements of the course may result
                in you being withdrawn from the course, with an impact on your
                ability to access future Government Subsidised training
              </Typography>
            </Box>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={4}
              ml={2}
              fontSize={18}
              fontWeight={600}
            >
              Privacy Statement
            </Typography>
            <Box
              component="section"
              sx={{
                p: 2,
                border: "1px solid grey",
                mt: "20px",
                height: "200px",
                overflow: "scroll",
              }}
            >
              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
                lineHeight={1.3}
              >
                I declare that the information provided to ICV in this
                application for study is to the best of my knowledge true
                correct and complete at the time of my enrolment/application.I
                acknowledge that providing any false information and/or failing
                to disclose any information relevant to my application for
                enrolment and/or failure to complete an application/enrolment
                form may result in the withdrawal of any offer, particularly as
                it relates to my eligibility to obtain an offer for government
                subsided training, and/or cancellation of enrolment at the
                discretion of ICV.
              </Typography>

              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
                lineHeight={1.3}
              >
                I understand that it is my responsibility to provide all
                relevant and required documentation.I authorise ICV to check all
                available records to confirm that information provided is
                correct, particularly information pertaining to my eligibility
                for the Skills First program.
              </Typography>
            </Box>
            <Grid container spacing={2} mt={4}>
              <Grid item xs={6}>
                <Box component="section">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.privacy_statement_consent}
                        value={formik.values.privacy_statement_consent}
                        name="privacy_statement_consent"
                        onChange={formik.handleChange}
                      />
                    }
                    label={
                      <Typography variant="p">
                        I Consent to the collection use and disclose of my
                        personal information in accordance with the{" "}
                        <b>Privacy Notice Above</b>.
                      </Typography>
                    }
                  />
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {formik.touched.privacy_statement_consent &&
                      formik.errors.privacy_statement_consent}
                  </FormHelperText>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box component="section">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.read_LLN}
                        value={formik.values.read_LLN}
                        name="read_LLN"
                        onChange={formik.handleChange}
                      />
                    }
                    label={
                      <Typography variant="p">
                        I hereby confirm that, I've undertaken the{" "}
                        <b>LLN Assessment</b> by myself. I acknowledge that this
                        LLN Asessment will identify if I meet the course entry
                        requirements and if any additional support is required
                        to complete this course.
                      </Typography>
                    }
                  />
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {formik.touched.read_LLN && formik.errors.read_LLN}
                  </FormHelperText>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={4}>
              <Grid item xs={6}>
                <Box component="section">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.read_eligibility_form}
                        value={formik.values.read_eligibility_form}
                        name="read_eligibility_form"
                        onChange={formik.handleChange}
                      />
                    }
                    label={
                      <Typography variant="p">
                        I hereby confirm that I have completed the{" "}
                        <b>Skills First Eligibility Form</b> in order to
                        determine if I meet the eligibility requirements for
                        Skills First Training. In addition to this, I also
                        confirm that this form will help ICV to make
                        preliminaary estimate of the applicable fee (if any) I
                        am required to pay preliminary.
                      </Typography>
                    }
                  />
                </Box>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.read_eligibility_form &&
                    formik.errors.read_eligibility_form}
                </FormHelperText>
              </Grid>
              <Grid item xs={6}>
                <Box component="section">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.info_sheet_acknowledgment}
                        value={formik.values.info_sheet_acknowledgment}
                        name="info_sheet_acknowledgment"
                        onChange={formik.handleChange}
                      />
                    }
                    label="I acknowledge that I have received ICV’s Student Information Sheet, which contains information about my rights and obligations under a training program. Further, I acknowledge that enrolment under the Skills First Program will impact future Skills First Entitlements."
                  />
                </Box>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.info_sheet_acknowledgment &&
                    formik.errors.info_sheet_acknowledgment}
                </FormHelperText>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={4}>
              <Grid item xs={6}>
                <Box component="section">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.enrollment_agreement_consent}
                        value={formik.values.enrollment_agreement_consent}
                        name="enrollment_agreement_consent"
                        onChange={formik.handleChange}
                      />
                    }
                    label="I have read, understood, and agree to Terms of Agreement mentioned above. I will keep a copy of this enrolment agreement and receipts of any payments of tuition or non-tuition fees."
                  />
                </Box>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.enrollment_agreement_consent &&
                    formik.errors.enrollment_agreement_consent}
                </FormHelperText>
              </Grid>
              <Grid item xs={6}>
                <Box component="section">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.read_fee_structure}
                        value={formik.values.read_fee_structure}
                        name="read_fee_structure"
                        onChange={formik.handleChange}
                      />
                    }
                    label={
                      <Typography variant="p">
                        I hereby confirm that I have read, understood and
                        acknowledged the <b>Fee Schedule.</b>
                      </Typography>
                    }
                  />
                </Box>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.read_fee_structure &&
                    formik.errors.read_fee_structure}
                </FormHelperText>
              </Grid>
            </Grid>
            <Box component="section" textAlign={"center"} fontWeight={600}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.terms_and_condition}
                    value={formik.values.terms_and_condition}
                    name="terms_and_condition"
                    onChange={formik.handleChange}
                  />
                }
                label={
                  <Typography variant="p">
                    I have read and agree to the Terms & Conditions.
                  </Typography>
                }
              />
              <FormHelperText sx={{ color: "#d32f2f", textAlign: "center" }}>
                {formik.touched.terms_and_condition &&
                  formik.errors.terms_and_condition}
              </FormHelperText>
            </Box>
          </div>
          <Box component="section" textAlign={"center"} fontWeight={600}>
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
              sx={{ border: "1px solid black", width: "60%", margin: "auto" }}
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
