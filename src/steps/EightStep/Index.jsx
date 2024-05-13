import {
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import axios, { isCancel, AxiosError } from "axios";
import { useState, useEffect } from "react";
import { formInitialValues } from "./initialValues";
const Index = ({
  data,
  activeStep,
  handleNext,
  handleBack,
  steps,
  handleLoader,
}) => {
  const [initialValues, setInitialValues] = useState(formInitialValues);
  const [nextBtn, handleNextBtn] = useState(true);
  const handleCheckbox = () => {
    if (event.target.checked) {
      formik.setFieldValue("student_handbook_declaration", true);
      handleNextBtn(false);
    } else {
      handleNextBtn(true);
      formik.setFieldValue("student_handbook_declaration", false);
    }
  };
  const handleSave = async (values) => {
    console.log("values", values);
    handleLoader(true);
    const id = localStorage.getItem("id");
    // console.log("values", values);
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${id}`, {
        apply_detail: values,
      })
      .then(function (res) {
        localStorage.setItem("data", JSON.stringify(res.data));
        localStorage.setItem("currentAciveStep", 8);
        localStorage.setItem("id", res.data.id);
        handleLoader(false);
        handleNext();
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSave,
  });

  useEffect(() => {
    if (data) {
      if (nextBtn) {
        handleNextBtn(!nextBtn);
      }
      const { student_handbook_declaration } = data;
      setInitialValues({
        student_handbook_declaration,
      });
      // console.log('new dataa', initialValues)
      formik.setValues({
        student_handbook_declaration,
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
              mt={2}
              fontSize={18}
              fontWeight={500}
            >
              Please ensure you have fully read, understood and acknowledged the
              information provided in the below documents before continuing:
            </Typography>
            <Typography
              variant="p"
              color="#007bff"
              component="div"
              mt={2}
              fontSize={22}
            >
              <a
                href="https://www.icv.edu.au/wp-content/uploads/Student-Handbook-Local.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                Student Handbook
              </a>
            </Typography>
            <Typography
              variant="p"
              color="#007bff"
              component="div"
              mt={2}
              fontSize={22}
            >
              <a
                href="https://www.icv.edu.au/wp-content/uploads/Indicative-Fee-Schedule.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                Indicative Fee Schedule
              </a>
            </Typography>

            <Typography
              variant="p"
              color="#007bff"
              component="div"
              fontSize={22}
            >
              <a
                href="https://www.icv.edu.au/wp-content/uploads/Information-for-students.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                Information for Students
              </a>
            </Typography>
            <Box component="section">
              <FormControlLabel
                control={
                  <Checkbox
                    name="student_handbook_declaration"
                    checked={formik.values.student_handbook_declaration}
                    value={formik.values.student_handbook_declaration}
                    onChange={() => handleCheckbox()}
                  />
                }
                label="I hereby confirm that I've fully read, understood and acknowledge the information provided in the above documents."
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
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={nextBtn}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Index;
