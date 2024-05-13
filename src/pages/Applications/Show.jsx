import {
  Container,
  Box,
  Grid,
  CircularProgress,
  Backdrop,
  AppBar,
  Toolbar,
  Typography,
  ListItem,
  Button,
  List,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import CitizenshipFiles from "./CitizenshipFiles";
import toast from "react-hot-toast";
import dayjs from "dayjs";
const Show = ({ loader, setLoader }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [data, setData] = useState({});

  const sentEmailConfirmation = (event, id) => {
    setLoader(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${id}/confirmation_mail`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(function (res) {
        setLoader(false);
        toast.success("Application approved successfully");
        window.scrollTo(0, 0);
      })
      .catch(function (error) {
        toast.error(error.response.data);
        navigate("/");
      });
  };

  useEffect(() => {
    const localStorageItems = ["data", "id", "currentAciveStep"];
    localStorageItems.forEach((k) => localStorage.removeItem(k));
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (res) {
        setLoader(false);
        setData(res.data);
      })
      .catch(function (error) {
        toast.error(error.response.data);
        navigate("/");
      })
      .finally(function () {});
  }, []);
  console.log("id", id);
  const formatDate = (date) => {
    return date ? dayjs(date).format("YYYY-MM-DD") : "";
  };

  const bachelorDegree = (data) => {
    if (data) {
      const bachelor = JSON.parse(data);
      console.log("Bachelor", bachelor);
      return bachelor;
    }
  };
  return (
    <Container>
      {loader ? (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
        >
          <CircularProgress />
        </Backdrop>
      ) : (
        <Box
          sx={{
            border: "1px solid #E5EAF2",
            borderRadius: "12px 12px 0 0",
            mt: "60px",
          }}
        >
          <Grid container>
            <Grid item md={4}>
              <Typography
                variant="p"
                color="inherit"
                component="div"
                sx={{ ml: "80px", mt: "20px", fontSize: "18px" }}
              >
                {formatDate(data.created_at)}
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography
                variant="p"
                color="inherit"
                component="div"
                sx={{ ml: "40px", mt: "10px", fontSize: "30px" }}
              >
                View Enrollment
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography
                variant="p"
                color="inherit"
                component="div"
                sx={{ ml: "40px", mt: "20px", fontSize: "18px" }}
              >
                Registration ID: {data.id}
              </Typography>
            </Grid>
          </Grid>

          <Container>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Registration Details
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  ID
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data.id}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Date
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {formatDate(data.created_at)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Enrolment Type
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  Client Registration
                </Typography>
              </Grid>
            </Grid>
            <Container></Container>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Course Code
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.course?.course_code}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Qualification
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.course?.title}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Container sx={{ mt: "10px" }}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Client Details
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Title
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data.title}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Family Name
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data.family_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Given Name
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data.given_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Middle Name
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data.middle_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  DOB
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data.dob}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Gender
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data.gender}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Container sx={{ mt: "10px" }}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Contact Details
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Home Phone
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.contacts_detail?.home_phone}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Work Phone
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.contacts_detail?.work_phone}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Mobile No.
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.contacts_detail?.mobile_no}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Email
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.contacts_detail?.email}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Contact Method
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.contacts_detail?.contact_method}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Container sx={{ mt: "10px" }}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Residential Address
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Unit
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.residential_address?.unit_detail}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Building
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.residential_address?.building_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Street Number
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.residential_address?.street_number}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Suburb
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.residential_address?.suburb}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  State
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.residential_address?.state}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Street Name & Type:
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.residential_address?.street_name_and_type}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Post Code
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.residential_address?.post_code}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Container sx={{ mt: "10px" }}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Postal Address
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Unit
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.postal_address?.postal_unit_detail}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Building
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.postal_address?.postal_building_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Street Number
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.postal_address?.postal_street_number}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Suburb
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.postal_address?.postal_suburb}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  PO BOX
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.postal_address?.postal_po_box}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  State
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.postal_address?.postal_state}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Street Name & Type:
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.postal_address?.postal_street_name_and_type}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Post Code
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.postal_address?.postal_post_code}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Container sx={{ mt: "10px" }}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Emergency Contact Details
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Name
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.emergency_contact?.name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Relationship
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.emergency_contact?.relationship}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Mobile No.
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.emergency_contact?.mobile}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Phone No.
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.emergency_contact?.phone}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {data?.unique_identifier && (
            <>
              <Container sx={{ mt: "10px" }}>
                <AppBar position="static">
                  <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                      USI No information
                    </Typography>
                  </Toolbar>
                </AppBar>
              </Container>
              <Box
                sx={{
                  mt: "10px",
                }}
              >
                <Grid container m={2}>
                  <Grid item md={6}>
                    <Typography
                      variant="p"
                      color="inherit"
                      component="div"
                      sx={{ ml: "100px", fontSize: "18px" }}
                    >
                      USI No
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant="p"
                      color="inherit"
                      component="div"
                      sx={{ fontSize: "18px" }}
                    >
                      {data?.unique_identifier}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}

          {data?.usi_number?.create_usi == "Yes" && (
            <>
              <Container sx={{ mt: "10px" }}>
                <AppBar position="static">
                  <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                      USI No information
                    </Typography>
                  </Toolbar>
                </AppBar>
              </Container>
              {data?.usi_number?.identified_contact_type === "ImmiCard" && (
                <Box
                  sx={{
                    mt: "10px",
                  }}
                >
                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        ImmiCard Number
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.immi_card_no}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {data?.usi_number?.identified_contact_type ===
                "Citizenship Certificate (Australian)" && (
                <Box
                  sx={{
                    mt: "10px",
                  }}
                >
                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Stock Number
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.stock_no}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Aquisition Date
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.citizenship_aquisition_date}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {data?.usi_number?.identified_contact_type ===
                "Visa (with Non-Australian Passport)" && (
                <Box
                  sx={{
                    mt: "10px",
                  }}
                >
                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Passport Number
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.passport_no}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Country of Issue
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.country_of_issue}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {data?.usi_number?.identified_contact_type ===
                "Birth-Certificate (Australian)" && (
                <Box
                  sx={{
                    mt: "10px",
                  }}
                >
                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        State
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.birt_state}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Registration Number
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.reg_no}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Date Printed
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.date_printed}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Certificate Number
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.certificate_no}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {data?.usi_number?.identified_contact_type ===
                "Passport (Australian)" && (
                <Box
                  sx={{
                    mt: "10px",
                  }}
                >
                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Document Number
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.document_no}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {data?.usi_number?.identified_contact_type ===
                "Driver's Licence (Australian)" && (
                <Box
                  sx={{
                    mt: "10px",
                  }}
                >
                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        State
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.state}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        License Number
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.licence_number}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Expiry Month
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.expiry_month}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Expiry Year
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.expiry_year}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {data?.usi_number?.identified_contact_type ===
                "Medicare Card" && (
                <Box
                  sx={{
                    mt: "10px",
                  }}
                >
                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Name on Card
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.card_name}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Card Number
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.card_no}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Individual Ref Number
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.refrence_no}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Card Colour
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.card_color}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Card Expiry Month
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.expiry_month}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Card Expiry Year
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.usi_number?.expiry_year}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}

              <Grid container m={2}>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px" }}
                  >
                    USI consent date
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    {formatDate(data?.usi_consent_date)}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}

          <Container sx={{ mt: "10px" }}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Goverment Data Collection Details
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Country of Birth
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.born_country}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Town of Birth
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.born_town}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Language Spoken
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data.speak_other_language
                    ? data.speak_language_than_english
                    : "English"}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  English Proficiency
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.english_level}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Indigenous Status
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.islander_origin}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Highest completed school level
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.highest_school_level}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Name of qualifications/trade
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.name_of_qualification}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Year completed
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.qualification_completed_year}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Are you still at secondary school?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.still_secondry_school}
                </Typography>
              </Grid>
            </Grid>

            {bachelorDegree(data?.bachelor_degree) && (
              <Grid container m={2}>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px" }}
                  >
                    Bachelor Degree or Higher Degree
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    {bachelorDegree(data?.bachelor_degree).join(", ")}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {bachelorDegree(data?.advanced_degree) && (
              <Grid container m={2}>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px" }}
                  >
                    Advanced Diploma/Degree
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    {bachelorDegree(data?.advanced_degree).join(", ")}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {bachelorDegree(data?.diploma_level) && (
              <Grid container m={2}>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px" }}
                  >
                    Diploma Level
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    {bachelorDegree(data?.diploma_level).join(", ")}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {bachelorDegree(data?.certificate_IV) && (
              <Grid container m={2}>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px" }}
                  >
                    Certificate IV
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    {bachelorDegree(data?.certificate_IV).join(", ")}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {bachelorDegree(data?.certificate_III) && (
              <Grid container m={2}>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px" }}
                  >
                    Certificate III
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    {bachelorDegree(data?.certificate_III).join(", ")}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {bachelorDegree(data?.certificate_II) && (
              <Grid container m={2}>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px" }}
                  >
                    Certificate II
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    {bachelorDegree(data?.certificate_II).join(", ")}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {bachelorDegree(data?.certificate_I) && (
              <Grid container m={2}>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px" }}
                  >
                    Certificate I
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    {bachelorDegree(data?.certificate_I).join(", ")}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {bachelorDegree(data?.other_certificate) && (
              <Grid container m={2}>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px" }}
                  >
                    Other Certificate
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    {bachelorDegree(data?.other_certificate).join(", ")}
                  </Typography>
                </Grid>
              </Grid>
            )}

            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  School Level
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.highest_school_level}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Year Completed School level
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.completed_school_year}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Employment Status
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.current_employment_status}
                </Typography>
              </Grid>
            </Grid>
            {data?.current_employment_status === "Full time employee" ||
              data?.current_employment_status === "Part time employee" ||
              data?.current_employment_status === "Part time employee" ||
              (data?.current_employment_status ===
                "Self employed - not employing others" && (
                <>
                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Industry
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.employment_industry}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container m={2}>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ ml: "100px", fontSize: "18px" }}
                      >
                        Occupation
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="p"
                        color="inherit"
                        component="div"
                        sx={{ fontSize: "18px" }}
                      >
                        {data?.occupation}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              ))}

            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Study Reason
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.reason_for_taking_course}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Disablitites
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.disability}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Disabilities Type
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.having_disabilites?.join(", ")}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Container>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Identity Check
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Citizenship
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.citizenship?.status}
                </Typography>
              </Grid>
            </Grid>
            {data?.citizenship?.green_medicare_card && (
              <CitizenshipFiles
                name="Green Medicare Card"
                file={data?.green_medicare_card}
              />
            )}

            {data?.citizenship?.aus_birth_certificate?.url && (
              <CitizenshipFiles
                name="Australian Birth Certificate"
                file={data?.aus_birth_certificate}
              />
            )}

            {data?.citizenship?.current_aus_passport?.url && (
              <CitizenshipFiles
                name="Current Australian Passport"
                file={data?.current_aus_passport}
              />
            )}

            {data?.citizenship?.newzealand_passport?.url && (
              <CitizenshipFiles
                name="New Zealand Passport"
                file={data?.newzealand_passport}
              />
            )}

            {data?.citizenship?.naturalisation_certificate?.url && (
              <CitizenshipFiles
                name="Naturalisation Certificate"
                file={data?.naturalisation_certificate}
              />
            )}

            {data?.citizenship?.formal_doc?.url && (
              <CitizenshipFiles
                name="Formal Documentation issued by the Department of Immigration
              confirming permanent residence"
                file={data?.formal_doc}
              />
            )}

            {data?.citizenship?.other_doc?.url && (
              <CitizenshipFiles
                name="Other Documentation"
                file={data?.other_doc}
              />
            )}

            {data?.citizenship?.current_driving_licence?.url && (
              <CitizenshipFiles
                name="Current Drivers Licence"
                file={data?.current_driving_licence}
              />
            )}

            {data?.citizenship?.current_learner_permit?.url && (
              <CitizenshipFiles
                name="Current Learners Permit"
                file={data?.current_learner_permit}
              />
            )}

            {data?.citizenship?.proof_of_age?.url && (
              <CitizenshipFiles name="Proof of Age" file={data?.proof_of_age} />
            )}

            {data?.citizenship?.key_cards?.url && (
              <CitizenshipFiles name="Key Pass Card" file={data?.key_cards} />
            )}
          </Box>

          <Container>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Centrelink/Concession Details
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            {data?.concession_types?.length ? (
              <>
                <Grid container m={2}>
                  <Grid item md={6}>
                    <Typography
                      variant="p"
                      color="inherit"
                      component="div"
                      sx={{ ml: "100px", fontSize: "18px" }}
                    >
                      Concessions
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant="p"
                      color="inherit"
                      component="div"
                      sx={{ fontSize: "18px" }}
                    >
                      {data?.concession_types}
                    </Typography>
                  </Grid>

                  <Grid item md={6}>
                    <Typography
                      variant="p"
                      color="inherit"
                      component="div"
                      sx={{ ml: "100px", fontSize: "18px" }}
                    >
                      Uploaded File
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant="p"
                      color="inherit"
                      component="div"
                      sx={{ fontSize: "18px" }}
                    >
                      <a
                        href={data?.copy_of_concession_card_data?.url}
                        target="_blank"
                      >
                        {data?.copy_of_concession_card_data?.filename}
                      </a>
                    </Typography>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography
                variant="h4"
                color="inherit"
                component="div"
                sx={{ textAlign: "center" }}
              >
                User has not applied for concession
              </Typography>
            )}
          </Box>

          <Container>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Recognition of Prior Learning / Credit Transfer
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Do you want to apply for RPL
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.apply_for_rpl == "No"
                    ? "NO"
                    : data?.competency_for_rpl}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Do you want to apply for Credit Transfer?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.apply_for_credit_transeer == "No"
                    ? "NO"
                    : data?.apply_for_credit_transeer}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Container>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  SECTION B – Student Declaration
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2}>
              <Grid item md={12}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  <b>Q.1: </b>Write the name of the course/s you're applying for
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={12}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  {data?.student_declaration?.course_name}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={12}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  <b>Q.2:</b>
                  Are you doing, or have you done any other Skills First
                  Training in 2024?.
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={12}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  {data?.student_declaration?.done_any_program == "No"
                    ? "No"
                    : data?.student_declaration?.program_description}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={12}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  <b>Q.3:</b>
                  Are you enrolled in a school, including government,
                  non-government, independent, Catholic or home school?
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={12}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  {data?.student_declaration?.enrolled_any_training}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={12}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  <b>Q.4:</b>
                  Are you enrolled in the Commonwealth Government's Skills for
                  Education and Employment Program?
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2}>
              <Grid item md={12}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  {data?.student_declaration?.enrolled_in_common_wealth}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={12}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  <b>Student Declaration</b>- read and complete the declaration
                  below.
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2}>
              <Grid item md={12}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  <List
                    sx={{
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                  >
                    <ListItem sx={{ display: "list-item" }}>
                      I understand that my enrolment may be subsidised by the
                      Victorian and Commonwealth Government under Skills First
                      Program. I understand my enrolment may affect my
                      eligibility for more Skills First training.
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                      I understand that the Department of Jobs, Skills, Industry
                      and Regions may contact me to participate in a survey or
                      interview.
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                      I declare the information in this form is true and
                      accurate.
                    </ListItem>
                  </List>
                </Typography>
              </Grid>
            </Grid>
            <Container sx={{ width: "70%" }}>
              <Grid container m={2}>
                <Grid item md={6} sx={{ border: "1px solid black", p: "20px" }}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px" }}
                  >
                    Name
                  </Typography>
                </Grid>
                <Grid item md={6} sx={{ border: "1px solid black", p: "20px" }}>
                  {data?.student_declaration?.name}
                </Grid>
                <Grid item md={6} sx={{ border: "1px solid black" }}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px", p: "20px" }}
                  >
                    Date
                  </Typography>
                </Grid>
                <Grid item md={6} sx={{ border: "1px solid black", p: "20px" }}>
                  {formatDate(data?.student_declaration?.declaration_date)}
                </Grid>
                <Grid item md={6} sx={{ border: "1px solid black" }}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px", p: "20px" }}
                  >
                    Signature
                  </Typography>
                </Grid>
                <Grid item md={6} sx={{ border: "1px solid black" }}>
                  {data?.student_declaration?.signature?.includes("data") ? (
                    <Box>
                      <img
                        src={data?.student_declaration?.signature}
                        width={"200px"}
                        sx={{ borderBottom: "1px solid black" }}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="h6" color="inherit" component="div">
                        {data?.student_declaration?.signature}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Container>
          </Box>

          <Container>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Pre-Enrolment Review
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  How do you prefer to learn?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.prefer_to_learn}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  What is your preferred learning style?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.prefer_learning_style}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  (a) Do you have access to computers and the internet?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.access_computer_and_net}
                </Typography>
              </Grid>
            </Grid>
            <Container></Container>
            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  (b) At what level do you believe your computer skills are at?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.computer_skill_level}
                </Typography>
              </Grid>
            </Grid>
            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  I can turn on and login to a personal computer
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.can_login_pc}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  I can send an email
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.can_send_mail}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  I can navigate to a website to locate required information
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.can_navigate_site}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  I can create folders and subfolders and rename them as
                  required
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.can_create_folder}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  I can find information using an internet search engine
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.can_find_info}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  I can attach documents to an email
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.can_attach_doc}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  I can save emails in different folders
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.can_save_mail}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  I can login to an online system and follow prompts
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.can_login_online_system}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Have you used any of the following programs?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.used_online_software?.join(",  ")}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  ICV uses a range of training and assessment strategies
                  throughout the course. Some of these may include, written
                  assessments, discussions, worksheets, role plays, projects,
                  practical demonstrations, case studies/scenarios. In the past,
                  have you encountered any difficulties with learning new
                  things?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.difficulties_in_learning}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  If you encounter any difficulties with learning or assessment,
                  what would you do?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.how_encounter_difficulities}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Throughout your course, you will be required to complete
                  self-study. What study techniques have you used in the past?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.study_techniques_in_past}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  What's the best way for you to learn something new?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.best_way_to_learn}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  You prefer a presenter or a teacher who uses
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.when_you_are_learning}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  What support do you think you will need to participate and
                  complete this course successfully?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.support_to_complete_course}
                </Typography>
              </Grid>
            </Grid>

            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "100px", fontSize: "18px" }}
                >
                  Is there any further information you would like to provide, or
                  ask of ICV to help guide and support you through your learning
                  journey?
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.pre_enrollment?.further_info_to_icv}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Container>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Term & Condition Provided
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2}>
              <Grid item md={12}>
                <Typography
                  variant="h4"
                  color="inherit"
                  component="div"
                  sx={{ ml: "30px" }}
                >
                  Privacy Notice
                </Typography>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "40px", mt: "10px", fontSize: "18px" }}
                >
                  Under the Data Provision Requirements 2012, Registered
                  Training Organisation is required to collect personal
                  information about you and to disclose that personal
                  information to the National Centre for Vocational Education
                  Research Ltd (NCVER).
                </Typography>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "40px", mt: "20px", fontSize: "18px" }}
                >
                  Your personal information (including the personal information
                  contained on this enrolment form), may be used or disclosed by
                  Registered Training Organisation for statistical,
                  administrative, regulatory and research purposes. Registered
                  Training Organisation may disclose your personal information
                  for these purposes to:
                </Typography>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "40px", mt: "20px", fontSize: "18px" }}
                >
                  <List
                    sx={{
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                  >
                    <ListItem sx={{ display: "list-item" }}>
                      Commonwealth and State or Territory government departments
                      and authorised agencies; and NCVER.
                    </ListItem>
                  </List>
                </Typography>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "40px", mt: "20px", fontSize: "18px" }}
                >
                  Personal information that has been disclosed to the NCVER may
                  be used or disclosed by NCVER for the following purposes:
                </Typography>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "40px", mt: "20px", fontSize: "18px" }}
                >
                  <List
                    sx={{
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                  >
                    <ListItem sx={{ display: "list-item" }}>
                      populating authenticated VET transcripts;
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                      facilitating statistics and research relating to
                      education, including surveys and data linkage;
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                      pre-populating RTO student enrolment forms;
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                      understanding how the VET market operates, for policy,
                      workforce planning and consumer information; and
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                      administering VET, including programme administration,
                      regulation, monitoring and evaluation.
                    </ListItem>
                  </List>
                </Typography>

                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "40px", mt: "20px", fontSize: "18px" }}
                >
                  You may receive an student survey which may be administered by
                  a government department or NCVER employee, agent or third
                  party contractor or other authorised agencies. Please note you
                  may opt out of the survey at the time of being contacted.
                </Typography>

                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "40px", mt: "20px", fontSize: "18px" }}
                >
                  NCVER will collect, hold, use and disclose your personal
                  information in accordance with the Privacy Act 1988 (Cth), the
                  VET Data Policy and all NCVER policies and protocols
                  (including those published on NCVER’s website at{" "}
                  <a href=" www.ncver.edu.au" target="_blank">
                    {" "}
                    www.ncver.edu.au
                  </a>
                  ).
                </Typography>

                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "40px", mt: "20px", fontSize: "18px" }}
                >
                  For more information about NCVER's Privacy Policy goto{" "}
                  <a href="https://www.ncver.edu.au/privacy" target="_blank">
                    https://www.ncver.edu.au/privacy
                  </a>
                  .
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Container>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Signature
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <Grid container m={2} mt={4}>
              <Grid item md={6}>
                {data?.signature?.includes("data") ? (
                  <Box>
                    <img
                      src={data?.signature}
                      width={"500px"}
                      sx={{ borderBottom: "1px solid black" }}
                    />
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="h6" color="inherit" component="div">
                      {data?.signature}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid item md={6} sx={{ mt: "40px" }}>
                {formatDate(data?.updated_at)}
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              mt: "60px",
              display: "flex",
              justifyContent: "center",
              mb: "50px",
            }}
          >
            <Button
              variant="contained"
              onClick={(eve, id) => sentEmailConfirmation(eve, data?.id)}
            >
              Confirm Application
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Show;
