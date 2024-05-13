import {
  Paper,
  Button,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  InputLabel,
  Select,
  FormHelperText,
  FormControl,
  MenuItem,
  Stack,
  Typography,
  Toolbar,
  AppBar,
  Box,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { citzenships, documents } from "./data";
import { useFormik } from "formik";
import * as yup from "yup";
import axios, { isCancel, AxiosError } from "axios";
import { formInitialValues } from "./initialValues";
import { useState, useEffect } from "react";

const index = ({
  data,
  activeStep,
  handleNext,
  handleBack,
  steps,
  handleLoader,
}) => {
  const [images, setImages] = useState({});
  const [initialValues, setInitialValues] = useState(formInitialValues);
  // const FileName = () => {

  // }
  console.log("images", images);
  const handleImageSelect = (key, e) => {
    console.log("key", key);
    const selectedImage = e.target.files[0];
    setImages((prevState) => ({
      ...prevState,
      [key]: selectedImage,
    }));
  };

  // const formImage = (fileName) => {
  //   const keys = Object.keys(images);
  //   const key = keys.filter((as) => as === fileName);
  //   keys.
  // };
  const validationSchema = yup.object({
    status: yup.string().required("* Please Select Citizenship Status"),
  });

  const handleSave = async (values) => {
    const id = localStorage.getItem("id");
    console.log("apply_detail[citizenship_attributes][values]", values);
    handleLoader(true);
    const formData = new FormData();
    formData.append(
      "apply_detail[citizenship_attributes][status]",
      values.status
    );
    for (const key in images) {
      if (images[key]) {
        formData.append(
          `apply_detail[citizenship_attributes][${key}]`,
          images[key]
        );
      }
    }
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
        localStorage.setItem("currentAciveStep", 4);
        localStorage.setItem("id", res.data.id);
        handleLoader(false);
        handleNext();
      })
      .catch(function (error) {
        console.log("fahad", error);
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSave,
    validateOnChange: false,
  });

  useEffect(() => {
    if (data && data?.citizenship) {
      const {
        status,
        green_medicare_card,
        aus_birth_certificate,
        current_aus_passport,
        newzealand_passport,
        naturalisation_certificate,
        formal_doc,
        other_doc,
        current_driving_licence,
        current_learner_permit,
        proof_of_age,
        key_cards,
      } = data?.citizenship;

      setInitialValues({
        status,
        green_medicare_card,
        aus_birth_certificate,
        current_aus_passport,
        newzealand_passport,
        naturalisation_certificate,
        formal_doc,
        other_doc,
        current_driving_licence,
        current_learner_permit,
        proof_of_age,
        key_cards,
      });
      formik.setValues({
        status,
        green_medicare_card,
        aus_birth_certificate,
        current_aus_passport,
        newzealand_passport,
        naturalisation_certificate,
        formal_doc,
        other_doc,
        current_driving_licence,
        current_learner_permit,
        proof_of_age,
        key_cards,
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
                  Identity Check
                </Typography>
              </Toolbar>
            </AppBar>
            <Stack direction="row" spacing={3} sx={{ mt: "50px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Citizenship Status
                  <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="status"
                  autoFocus
                  label={
                    <Typography variant="p">
                      Citizenship Status
                      <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                        *
                      </span>
                    </Typography>
                  }
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                >
                  {citzenships.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.status && formik.errors.status}
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
              Please provide details of the identification you can provide
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ background: "rgba(243, 246, 249, 0.6)", mt: "20px" }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Document Name </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documents.map((option) => (
                    <TableRow
                      key={option.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{option.label}</TableCell>
                      <TableCell align="left">
                        {option.value !== "" && (
                          <>
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
                                name={option.name}
                                onChange={(e) =>
                                  handleImageSelect(option.name, e)
                                }
                              />
                            </Button>
                          </>
                        )}
                      </TableCell>
                      <TableCell>{images[option.name]?.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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

export default index;
