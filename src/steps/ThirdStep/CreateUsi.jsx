import {
  Checkbox,
  FormGroup,
  ListItem,
  List,
  Box,
  FormControlLabel,
  Stack,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Typography,
  FormHelperText,
} from "@mui/material";
import { identificationDocuments } from "./data";
import DriverLicence from "./DriverLicence";
import MedicareCard from "./MedicareCard";
import Passport from "./Passport";
import Visa from "./Visa";
import BirthCertificate from "./BirthCertificate";
import CertificateOfRegistration from "./CertificateOfRegistration";
import CitizenshipCertificate from "./CitizenshipCertificate";
import ImmiCard from "./ImmiCard";
import { useEffect } from "react";
import { TryOutlined } from "@mui/icons-material";
const CreateUsi = ({ formik, handlebtnDisable }) => {
  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      formik.setFieldValue('usi_agreement', true)
      handlebtnDisable(false);
      
    } else {
      handlebtnDisable(TryOutlined);
      formik.setFieldValue('usi_agreement', false)
    }
  };
  useEffect(() => {
    if (
      formik.values.have_unique_identifier === "No" &&
      formik.values.create_usi === "Yes" && !formik.values.usi_agreement
    ) {
      handlebtnDisable(true);
    } else {
      handlebtnDisable(false);
    }
  }, []);
  console.log('Formik.values', formik.values)
  return (
    <>
      <Stack spacing={3} sx={{ mt: "10px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Would you like ICV to create a USI for you:?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Would you like ICV to create a USI for you:?"
            value={formik.values.create_usi}
            onChange={(event) => {
              formik.setFieldValue("create_usi", event.target.value);
              if (
                event.target.value === "No" &&
                formik.values.have_unique_identifier === "No"
              ) {
                handlebtnDisable(false);
              } else {
                handlebtnDisable(true);
              }
            }}
            name="create_usi"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="p" color="inherit" component="div" m={3}>
          You may already have a USI if you have done any nationally recognised
          training, which could include training at work, completing a first aid
          course or RSA (Responsible Service of Alcohol) course, getting a white
          card, or studying at a TAFE or training organisation. It is important
          that you try to find out whether you already have a USI before
          attempting to create a new one. You should not have more than one USI.
          To check if you already have a USI, use the 'Forgotten USI' link on
          the USI website at{" "}
          <a href="https://www.usi.gov.au/students/">
            https://www.usi.gov.au/students/
          </a>
          .
        </Typography>
      </Stack>

      {formik.values.create_usi === "Yes" && (
        <>
          <Typography variant="p" color="inherit" component="div" mt={4}>
            Please provide information about relevant documentation that will
            enable us to create your USI on your behalf.
          </Typography>
          <Stack direction="row" spacing={3} sx={{ mt: "15px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Preferred Contact Method
                <span style={{ color: "#d32f2f", marginLeft: "3px" }}>*</span>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.contact_method}
                label={
                  <Typography variant="p">
                    Preferred Contact Method
                    <span style={{ color: "#d32f2f", marginLeft: "3px" }}>
                      *
                    </span>
                  </Typography>
                }
                onChange={formik.handleChange}
                name="contact_method"
                onBlur={formik.handleBlur}
                error={
                  formik.touched.contact_method &&
                  Boolean(formik.errors.contact_method)
                }
              >
                <MenuItem value="Email">Email</MenuItem>
                <MenuItem value="Mobile">Mobile</MenuItem>
                <MenuItem value="Post">Post</MenuItem>
              </Select>
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {formik.touched.contact_method && formik.errors.contact_method}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Identification Document Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.identified_contact_type}
                label="Identification Document Type"
                onChange={formik.handleChange}
                name="identified_contact_type"
              >
                {identificationDocuments.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          {formik.values.identified_contact_type ===
            "Driver's Licence (Australian)" && (
            <DriverLicence formik={formik} />
          )}

          {formik.values.identified_contact_type === "Medicare Card" && (
            <MedicareCard formik={formik} />
          )}

          {formik.values.identified_contact_type ===
            "Passport (Australian)" && <Passport formik={formik} />}

          {formik.values.identified_contact_type ===
            "Visa (with Non-Australian Passport)" && <Visa formik={formik} />}

          {formik.values.identified_contact_type ===
            "Birth-Certificate (Australian)" && (
            <BirthCertificate formik={formik} />
          )}

          {formik.values.identified_contact_type ===
            "Certificate of Registration by Descent" && (
            <CertificateOfRegistration formik={formik} />
          )}

          {formik.values.identified_contact_type ===
            "Citizenship Certificate (Australian)" && (
            <CitizenshipCertificate formik={formik} />
          )}

          {formik.values.identified_contact_type === "ImmiCard" && (
            <ImmiCard formik={formik} />
          )}
          <Typography
            variant="p"
            color="inherit"
            component="div"
            mt={2}
            fontSize={18}
          >
            Please indicate your agreement to the following Privacy Notice in
            order for us to create your USI.
          </Typography>
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
              fontWeight={600}
              textAlign={"center"}
            >
              Privacy Notice
            </Typography>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
              fontWeight={600}
              textAlign={"center"}
            >
              Consent for collection, use or disclosure of personal information
            </Typography>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              The following is provided to you on behalf of the Student
              Identifiers Registrar (Registrar).
            </Typography>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              You are advised and agree that you understand and consent that the
              personal information you provide in connection with your
              application for a Unique Student Identifier (USI):
            </Typography>
            <List
              sx={{
                listStyleType: "disc",
                listStylePosition: "inside",
              }}
            >
              <ListItem sx={{ display: "list-item" }}>
                is collected by the Registrar as authorised by the Student
                Identifiers Act 2014.
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                is collected by the Registrar for the purposes of:
                <List
                  sx={{
                    listStyleType: "disc",
                    listStylePosition: "inside",
                  }}
                >
                  <ListItem sx={{ display: "list-item" }}>
                    applying for, verifying and giving a USI;
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    resolving problems with a USI; and
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    creating authenticated vocational education and training
                    (VET) transcripts;
                  </ListItem>
                </List>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                may be disclosed to:
                <List
                  sx={{
                    listStyleType: "disc",
                    listStylePosition: "inside",
                  }}
                >
                  <ListItem sx={{ display: "list-item" }}>
                    Commonwealth and State/Territory government departments and
                    agencies and statutory bodies performing functions relating
                    to VET for:
                    <List
                      sx={{
                        listStyleType: "disc",
                        listStylePosition: "inside",
                      }}
                    >
                      <ListItem sx={{ display: "list-item" }}>
                        the purposes of administering and auditing VET, VET
                        providers and VET programs;
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        education related policy and research purposes; and
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        to assist in determining eligibility for training
                        subsidies;
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    VET Regulators to enable them to perform their VET
                    regulatory functions;
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    VET Admission Bodies for the purposes of administering VET
                    and VET programs;
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    current and former Registered Training Organisations to
                    enable them to deliver VET courses to the individual, meet
                    their reporting obligations under the VET standards and
                    government contracts and assist in determining eligibility
                    for training subsidies;
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    schools for the purposes of delivering VET courses to the
                    individual and reporting on these courses;
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    the National Centre for Vocational Education Research for
                    the purpose of creating authenticated VET transcripts,
                    resolving problems with USIs and for the collection,
                    preparation and auditing of national VET statistics;
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    researchers for education and training related research
                    purposes;
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    any other person or agency that may be authorised or
                    required by law to access the information;
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    any entity contractually engaged by the Student Identifiers
                    Registrar to assist in the performance of his or her
                    functions in the administration of the USI system; and
                  </ListItem>
                </List>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                will not otherwise be disclosed without your consent unless
                authorised or required by or under law.
              </ListItem>
            </List>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              The consequences for not providing the Registrar with some or all
              of your personal information are that the Registrar will not be
              able to issue you with a USI.
            </Typography>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
              fontWeight={600}
            >
              Privacy policies and complaints
            </Typography>

            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              You can find further information on how the Registrar collects,
              uses and discloses the personal information about you in the{" "}
              <a
                href="https://www.usi.gov.au/Documents/Student-Identifiers-Registrar-privacy-policy-v1.1.pdf"
                target="_blank"
              >
                Registrar’s Privacy Policy
              </a>{" "}
              or by contacting the Registrar on{" "}
              <a href="usi@education.gov.au" target="_blank">
                usi@education.gov.au
              </a>{" "}
              or telephone 1300 857 536, international enquiries +61 2 6240
              8740. The Registrar’s Privacy Policy contains information about
              how you may access and seek correction of the personal information
              held about you and how you may make a complaint about a breach of
              privacy by the Registrar in connection with the USI and how such
              complaints will be dealt with.
            </Typography>
            <Typography
              variant="p"
              color="inherit"
              component="div"
              mt={2}
              fontSize={18}
            >
              You may also make a complaint to the Information Commissioner
              about an interference with privacy pursuant to the Privacy Act
              1988, including in relation to the misuse or interference of or
              unauthorised collection, use, access, modification or disclosure
              of USIs.
            </Typography>
          </Box>
          <FormGroup sx={{ width: "100%" }}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => handleCheckboxChange(e)}
                  name="usi_agreement"
                  value={formik.values.usi_agreement}
                  checked={formik.values.usi_agreement}
                />
              }
              label="I agree to the Terms and Conditions"
              sx={{ m: "auto", mt: "20px" }}
            />
          </FormGroup>
        </>
      )}
    </>
  );
};

export default CreateUsi;
