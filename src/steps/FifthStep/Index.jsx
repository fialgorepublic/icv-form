import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Button,
  ListItem,
  List,
  Checkbox,
  FormControlLabel,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Box,
  Typography,
  Toolbar,
  AppBar,
} from "@mui/material";
import { useFormik } from "formik";
import { formInitialValues } from "./initialValues";
import axios, { isCancel, AxiosError } from "axios";
import { useState, useEffect } from "react";
import { concession_types } from "./data";
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
    console.log("Values", values);
    const id = localStorage.getItem("id");
    handleLoader(true);
    const formData = new FormData();
    formData.append("apply_detail[dependant_spouse]", values.dependant_spouse);
    formData.append("apply_detail[concession_types][]", [
      values.concession_types,
    ]);
    formData.append(
      "apply_detail[copy_of_concession_card]",
      values.copy_of_concession_card
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
        localStorage.setItem("currentAciveStep", 5);
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
      const { dependant_spouse, concession_types } = data;
      setInitialValues({
        dependant_spouse,
        concession_types,
      });
      // console.log('new dataa', initialValues)
      formik.setValues({
        dependant_spouse,
        concession_types,
      });
    }
  }, [data]);
  console.log("Formit", formik.values.concession_types);
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
                  Concession Application
                </Typography>
              </Toolbar>
            </AppBar>
            <Box component="section" sx={{ p: 2 }}>
              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
              >
                If you wish to apply for a government subsidised tuition fee
                Concession / Exemption or Fee Waiver for this course, please
                confirm the below option(s) that will need to be taken into
                account as part of your application. Further details will be
                provided to you regarding eligibility for the listed Concession,
                Exemption or Fee Waiver after these details have been reviewed.
              </Typography>
              <Typography
                variant="p"
                color="inherit"
                component="div"
                mt={2}
                fontSize={18}
              >
                Note: You will need to provide the original (or a certified
                copy) of any evidence uploaded, upon request. Additional
                evidence may be required based on the selected initiative.
              </Typography>
            </Box>
            <Accordion>
              <AccordionSummary
                expandIcon={
                  <AddCircleOutlineIcon
                    sx={{ color: "#ffffff", fontSize: "30px" }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ background: "#1976d2", mt: "35px", color: "#ffffff" }}
              >
                <Typography variant="h6" color="inherit" component="div">
                  Concessions / Exemptions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box component="section" sx={{ p: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.dependant_spouse}
                        value={formik.values.dependant_spouse}
                        name="dependant_spouse"
                        onChange={formik.handleChange}
                      />
                    }
                    label="Do you hold, or are you the dependant spouse or child of a holder of any of the following:"
                    sx={{ m: "auto", mt: "20px" }}
                  />
                  <List
                    sx={{
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                  >
                    {concession_types.map((concession) => (
                      <ListItem sx={{ display: "list-item" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              disabled={!formik.values.dependant_spouse}
                              checked={formik.values.concession_types.includes(
                                concession
                              )}
                              value={concession}
                              name="concession_types"
                              onChange={formik.handleChange}
                            />
                          }
                          label={concession}
                          sx={{ m: "auto", mt: "20px" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    mt={2}
                    fontSize={18}
                  >
                    Please upload a copy of your concession card, referral
                    letter or other documentary evidence (optional)
                  </Typography>
                  <Button
                    disabled={!formik.values.dependant_spouse}
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                    sx={{ ml: "10px", mt: "10px" }}
                  >
                    Upload
                    <input
                      type="file"
                      name="copy_of_concession_card"
                      hidden
                      onChange={(event) => {
                        formik.setFieldValue(
                          "copy_of_concession_card",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </Button>
                  <span
                    style={{
                      marginLeft: "20px",
                      fontSize: "20px",
                    }}
                  >
                    {formik.values?.copy_of_concession_card?.name}
                  </span>
                </Box>
              </AccordionDetails>
            </Accordion>
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
