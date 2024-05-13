import { Button, Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import VictorianStudentNumber from "./VictorianStudentNumber";
import USINumber from "./USINumber";
import { formInitialValues } from "./initialValues";
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
  console.log("Third data", data);
  const [initialValues, setInitialValues] = useState(formInitialValues);
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  console.log("third step", initialValues);
  const handlebtnDisable = (val) => {
    setDisableNextBtn(val);
  };
  const validationSchema = yup.object({
    have_victorian_stu_num: yup.string().required("* Please Select one"),
    unique_identifier: yup.string().when("have_unique_identifier", {
      is: (val) => val === "Yes",
      then: (schema) =>
        yup
          .string()
          .required("* Please Enter USI Number")
          .matches(
            /\A[A-H+J-N+P-Z+2-9]{10}\z/i,
            "* Please Enter Correct Unique Student Identifier"
          ),
      otherwise: (schema) => schema.min(0),
    }),
    contact_method: yup
      .string()
      .when(["create_usi", "have_unique_identifier"], {
        is: (create_usi, have_unique_identifier) =>
          create_usi === "Yes" && have_unique_identifier == "No",
        then: (schema) => yup.string().required("Please Select Contact Method"),
        otherwise: (schema) => schema.min(0),
      }),
    state: yup
      .string()
      .when(
        ["identified_contact_type", "create_usi", "have_unique_identifier"],
        {
          is: (identified_contact_type, create_usi, have_unique_identifier) =>
            identified_contact_type === "Driver's Licence (Australian)" &&
            create_usi === "Yes" &&
            have_unique_identifier == "No",
          then: (schema) => yup.string().required("Please Select State"),
          otherwise: (schema) => schema.min(0),
        }
      ),
    licence_number: yup
      .string()
      .when(
        ["identified_contact_type", "create_usi", "have_unique_identifier"],
        {
          is: (identified_contact_type, create_usi, have_unique_identifier) =>
            identified_contact_type === "Driver's Licence (Australian)" &&
            create_usi === "Yes" &&
            have_unique_identifier == "No",
          then: (schema) =>
            yup.string().required("Please Enter licence Number"),
          otherwise: (schema) => schema.min(0),
        }
      ),
    expiry_month: yup
      .string()
      .when(
        ["identified_contact_type", "create_usi", "have_unique_identifier"],
        {
          is: (identified_contact_type, create_usi, have_unique_identifier) =>
            identified_contact_type === "Driver's Licence (Australian)" &&
            create_usi === "Yes" &&
            have_unique_identifier == "No",
          then: (schema) => yup.string().required("Please Select Expiry Month"),
          otherwise: (schema) => schema.min(0),
        }
      ),
    expiry_year: yup
      .string()
      .when(
        ["identified_contact_type", "create_usi", "have_unique_identifier"],
        {
          is: (identified_contact_type, create_usi, have_unique_identifier) =>
            identified_contact_type === "Driver's Licence (Australian)" &&
            create_usi === "Yes" &&
            have_unique_identifier == "No",
          then: (schema) => yup.string().required("Please Select Expiry Year"),
          otherwise: (schema) => schema.min(0),
        }
      ),
    card_color: yup.string().when("identified_contact_type", {
      is: (val) => val === "Medicare Card",
      then: (schema) => yup.string().required("Please Select Card Color"),
      otherwise: (schema) => schema.min(0),
    }),
    refrence_no: yup.string().when("identified_contact_type", {
      is: (val) => val === "Medicare Card",
      then: (schema) => yup.string().required("Please Enter Reference No."),
      otherwise: (schema) => schema.min(0),
    }),
    card_name: yup.string().when("identified_contact_type", {
      is: (val) => val === "Medicare Card",
      then: (schema) => yup.string().required("Please Enter Card Name"),
      otherwise: (schema) => schema.min(0),
    }),
    card_no: yup.string().when("identified_contact_type", {
      is: (val) => val === "Medicare Card",
      then: (schema) => yup.string().required("Please Enter Card No."),
      otherwise: (schema) => schema.min(0),
    }),
    document_no: yup.string().when("identified_contact_type", {
      is: (val) => val === "Passport (Australian)",
      then: (schema) => yup.string().required("Please Enter Document Number"),
      otherwise: (schema) => schema.min(0),
    }),
    passport_no: yup.string().when("identified_contact_type", {
      is: (val) => val === "Visa (with Non-Australian Passport)",
      then: (schema) => yup.string().required("Please Enter Passport Number"),
      otherwise: (schema) => schema.min(0),
    }),
    country_of_issue: yup.string().when("identified_contact_type", {
      is: (val) => val === "Visa (with Non-Australian Passport)",
      then: (schema) => yup.string().required("Please Enter Issuance Country"),
      otherwise: (schema) => schema.min(0),
    }),
    birt_state: yup.string().when("identified_contact_type", {
      is: (val) => val === "Birth-Certificate (Australian)",
      then: (schema) => yup.string().required("Please Select Birth State"),
      otherwise: (schema) => schema.min(0),
    }),
    reg_no: yup.string().when("identified_contact_type", {
      is: (val) => val === "Birth-Certificate (Australian)",
      then: (schema) => yup.string().required("Please Enter Registration No."),
      otherwise: (schema) => schema.min(0),
    }),
    date_printed: yup.string().when("identified_contact_type", {
      is: (val) => val === "Birth-Certificate (Australian)",
      then: (schema) => yup.string().required("Please Enter Printed Date"),
      otherwise: (schema) => schema.min(0),
    }),
    certificate_no: yup.string().when("identified_contact_type", {
      is: (val) => val === "Birth-Certificate (Australian)",
      then: (schema) => yup.string().required("Please Enter Certificate No."),
      otherwise: (schema) => schema.min(0),
    }),
    aquisition_date: yup.string().when("identified_contact_type", {
      is: (val) => val === "Certificate of Registration by Descent",
      then: (schema) => yup.string().required("Please Enter Aquisition Date"),
      otherwise: (schema) => schema.min(0),
    }),
    stock_no: yup.string().when("identified_contact_type", {
      is: (val) => val === "Citizenship Certificate (Australian)",
      then: (schema) => yup.string().required("Please Enter Stock No."),
      otherwise: (schema) => schema.min(0),
    }),
    citizenship_aquisition_date: yup.string().when("identified_contact_type", {
      is: (val) => val === "Citizenship Certificate (Australian)",
      then: (schema) => yup.string().required("Please Enter Aquisition Date"),
      otherwise: (schema) => schema.min(0),
    }),
    immi_card_no: yup.string().when("identified_contact_type", {
      is: (val) => val === "ImmiCard",
      then: (schema) => yup.string().required("Please Enter ImmiCard detail"),
      otherwise: (schema) => schema.min(0),
    }),
    victorian_stu_num: yup.string().when("have_victorian_stu_num", {
      is: (val) => val === "Yes, please specify",
      then: (schema) => yup.string().required("Please Enter VSN"),
      otherwise: (schema) => schema.min(0),
    }),
  });

  const handleSave = async (values) => {
    console.log("usi agreement", values.usi_agreement);
    handleLoader(true);
    const id = localStorage.getItem("id");
    console.log("values", values);
    const usi_number_attributes = {
      have_unique_identifier: values.have_unique_identifier,
      create_usi: values.create_usi,
      usi_agreement: values.usi_agreement,
      contact_method: values.contact_method,
      identified_contact_type: values.identified_contact_type,
      state: values.state,
      licence_number: values.licence_number,
      card_name: values.card_name,
      card_no: values.card_no,
      refrence_no: values.refrence_no,
      card_color: values.card_color,
      expiry_month: values.expiry_month,
      expiry_year: values.expiry_year,
      document_no: values.document_no,
      passport_no: values.passport_no,
      country_of_issue: values.country_of_issue,
      birt_state: values.birt_state,
      reg_no: values.reg_no,
      date_printed: values.date_printed,
      certificate_no: values.certificate_no,
      citizenship_aquisition_date: values.citizenship_aquisition_date,
      stock_no: values.stock_no,
      aquisition_date: values.aquisition_date,
      immi_card_no: values.immi_card_no,
    };
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${id}`, {
        apply_detail: {
          have_unique_identifier: values.have_unique_identifier,
          unique_identifier: values.unique_identifier,
          have_victorian_stu_num: values.have_victorian_stu_num,
          victorian_stu_num: values.victorian_stu_num,
          usi_number_attributes: usi_number_attributes,
        },
      })
      .then(function (res) {
        localStorage.setItem("data", JSON.stringify(res.data));
        localStorage.setItem("currentAciveStep", 3);
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
    if (data && data?.usi_number) {
      const {
        have_unique_identifier,
        unique_identifier,
        victorian_stu_num,
        have_victorian_stu_num,
      } = data;
      const {
        create_usi,
        birth_country,
        city_birth,
        contact_method,
        identified_contact_type,
        state,
        licence_number,
        card_name,
        card_no,
        refrence_no,
        card_color,
        expiry_month,
        expiry_year,
        document_no,
        passport_no,
        country_of_issue,
        birt_state,
        reg_no,
        date_printed,
        certificate_no,
        aquisition_date,
        stock_no,
        citizenship_aquisition_date,
        immi_card_no,
        usi_agreement,
      } = data?.usi_number;

      setInitialValues({
        have_victorian_stu_num,
        victorian_stu_num,
        have_unique_identifier,
        unique_identifier,
        create_usi,
        birth_country,
        city_birth,
        contact_method,
        identified_contact_type,
        state,
        licence_number,
        card_name,
        card_no,
        refrence_no,
        card_color,
        expiry_month,
        expiry_year,
        document_no,
        passport_no,
        country_of_issue,
        birt_state,
        reg_no,
        date_printed,
        certificate_no,
        aquisition_date,
        stock_no,
        citizenship_aquisition_date,
        immi_card_no,
        usi_agreement,
      });
      formik.setValues({
        have_victorian_stu_num,
        victorian_stu_num,
        have_unique_identifier,
        unique_identifier,
        create_usi,
        birth_country,
        city_birth,
        contact_method,
        identified_contact_type,
        state,
        licence_number,
        card_name,
        card_no,
        refrence_no,
        card_color,
        expiry_month,
        expiry_year,
        document_no,
        passport_no,
        country_of_issue,
        birt_state,
        reg_no,
        date_printed,
        certificate_no,
        aquisition_date,
        stock_no,
        citizenship_aquisition_date,
        immi_card_no,
        usi_agreement,
      });
    }
  }, [data]);
  console.log("Errors", formik.errors);
  console.log("Formik values", formik.values);
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
            <USINumber formik={formik} handlebtnDisable={handlebtnDisable} />
            <VictorianStudentNumber formik={formik} />
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
            disabled={disableNextBtn}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Index;
