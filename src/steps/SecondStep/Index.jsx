import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import ResidentialAddress from "./ResidentialAddress";
import PostalAddress from "./PostalAddress";
import ContactDetails from "./ContactDetails";
import EmergencyContact from "./EmergencyContact";
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
  const [initialValues, setInitialValues] = useState(formInitialValues);

  const validationSchema = yup.object({
    street_number: yup.string().required("* Please Enter Stree Number"),
    suburb: yup.string().required("* Please Enter Suburb"),
    state: yup.string().required("* Please Enter State"),
    post_code: yup.string().required("* Please Enter Post Code"),
    postal_suburb: yup.string().required("* Please Enter Suburb"),
    postal_state: yup.string().required("* Please Enter State"),
    postal_post_code: yup.string().required("* Please Enter Post Code"),
    postal_street_number: yup.string().required("* Please Enter Street Number"),
    mobile_no: yup.string().required("* Please Enter Mobile No."),
    email: yup.string().required("* Please Enter Suburb"),
    name: yup.string().required("* Please Enter Name"),
    relationship: yup.string().required("* Please Enter Relationship"),
    mobile: yup.string().required("* Please Enter Mobile no"),
  });

  const handleSave = async (values) => {
    handleLoader(true);
    const id = localStorage.getItem("id");
    const residential_address = {
      unit_detail: values.unit_detail,
      building_name: values.building_name,
      street_number: values.street_number,
      street_name_and_type: values.street_name_and_type,
      suburb: values.suburb,
      state: values.state,
      post_code: values.post_code,
    };

    const postal_address = {
      postal_unit_detail: values.postal_unit_detail,
      postal_building_name: values.postal_building_name,
      postal_po_box: values.postal_po_box,
      postal_street_number: values.postal_street_number,
      postal_street_name_and_type: values.postal_street_name_and_type,
      postal_suburb: values.postal_suburb,
      postal_state: values.state,
      postal_post_code: values.postal_post_code,
      same_as_redential: values.same_as_redential,
    };

    const contact_detail = {
      home_phone: values.home_phone,
      work_phone: values.work_phone,
      mobile_no: values.mobile_no,
      email: values.email,
      contact_method: values.contact_method,
    };

    const emergency_contact_detail = {
      name: values.name,
      relationship: values.relationship,
      phone: values.phone,
      mobile: values.mobile,
    };
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${id}`, {
        apply_detail: {
          residential_address_attributes: residential_address,
          postal_address_attributes: postal_address,
          contacts_detail_attributes: contact_detail,
          emergency_contact_attributes: emergency_contact_detail,
        },
      })
      .then(function (res) {
        console.log("Response", res.data);
        localStorage.setItem("data", JSON.stringify(res.data));
        localStorage.setItem("currentAciveStep", 2);
        localStorage.setItem("id", res.data.id);
        handleLoader(false);
        handleNext();
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSave,
  });

  useEffect(() => {
    if (
      data &&
      data?.residential_address &&
      data?.postal_address &&
      data?.contacts_detail &&
      data.emergency_contact
    ) {
      const {
        unit_detail,
        building_name,
        street_number,
        street_name_and_type,
        suburb,
        state,
        post_code,
      } = data?.residential_address;
      const {
        postal_unit_detail,
        postal_building_name,
        postal_po_box,
        postal_street_number,
        postal_street_name_and_type,
        postal_suburb,
        postal_state,
        postal_post_code,
        same_as_redential,
      } = data?.postal_address;

      const { home_phone, work_phone, mobile_no, email, contact_method } =
        data?.contacts_detail;
      const { name, relationship, phone, mobile } = data?.emergency_contact;

      setInitialValues({
        unit_detail,
        building_name,
        street_number,
        street_name_and_type,
        suburb,
        state,
        post_code,
        postal_unit_detail,
        postal_building_name,
        postal_po_box,
        postal_street_number,
        postal_street_name_and_type,
        postal_suburb,
        postal_state,
        postal_post_code,
        same_as_redential,
        home_phone,
        work_phone,
        mobile_no,
        email,
        contact_method,
        name,
        relationship,
        phone,
        mobile,
      });
      formik.setValues({
        unit_detail,
        building_name,
        street_number,
        street_name_and_type,
        suburb,
        state,
        post_code,
        postal_unit_detail,
        postal_building_name,
        postal_po_box,
        postal_street_number,
        postal_street_name_and_type,
        postal_suburb,
        postal_state,
        postal_post_code,
        same_as_redential,
        home_phone,
        work_phone,
        mobile_no,
        email,
        contact_method,
        name,
        relationship,
        phone,
        mobile,
      });
    }
  }, [data]);
  console.log("Erors", formik.errors);
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
            <ResidentialAddress formik={formik} />
            <PostalAddress formik={formik} />
            <ContactDetails formik={formik} />
            <EmergencyContact formik={formik} />
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
