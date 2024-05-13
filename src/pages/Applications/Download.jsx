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
  List,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import dayjs from "dayjs";
const Download = () => {
  const localStorageItems = ["data", "id", "currentAciveStep"];
  localStorageItems.forEach((k) => localStorage.removeItem(k));
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const fullName = (data) => {
    return `${data?.given_name} ${data?.family_name}`;
  };

  const fullAddress = (data) => {
    return `${data?.residential_address?.street_number}, ${data?.residential_address?.building_name}`;
  };

  const courseCode = (course) => {
    return `${course?.course_code} - ${course?.title}`;
  };

  const formatDate = (date) => {
    return date ? dayjs(date).format("YYYY-MM-DD") : "";
  };
  useEffect(() => {
    setLoader(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${id}/download`
      )
      .then(function (res) {
        setLoader(false);
        setData(res.data);
        // toPDF();
        console.log("fafasdfasfsadfa", res);
        // setId("");
      })
      .catch(function (error) {
        console.log("errrrrr", error);
        // toast.error(error.response);
        navigate("/");
      })
      .finally(function () {});
  }, []);

  return (
    <Container>
      {loader && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
        >
          <CircularProgress />
        </Backdrop>
      )}
      {data && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "10px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                toPDF();
                setLoader(true);
                setTimeout(() => {
                  setLoader(false);
                }, 3000);
              }}
              sx={{ ml: "10px" }}
            >
              Download Application
            </Button>
          </Box>
          <Box
            ref={targetRef}
            sx={{
              border: "1px solid #E5EAF2",
              borderRadius: "12px 12px 0 0",
              mt: "60px",
            }}
          >
            <Grid container>
              <Grid item md={12} sx={{ textAlign: "center", m: "10px" }}>
                <Typography
                  variant="p"
                  color="inherit"
                  component="div"
                  sx={{ ml: "40px", mt: "10px", fontSize: "30px" }}
                >
                  This is an enrolment agreement between
                </Typography>
              </Grid>
            </Grid>

            <Container>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit" component="div">
                    Registered Training Organisation
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
                    Legal Name
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    Victorian Education and Training Group Pty Ltd
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
                    Trading Name
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    Under the International College of Victoria
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
                    Address
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    Level 4, 310 King Street, Melbourne, VIC 3000
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
                    Phone
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    03 9942 1836
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
                    info@icv.edu.au
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Container sx={{ mt: "10px" }}>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit" component="div">
                    The Student
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
                    Full Name
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    {fullName(data)}
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
                    Address
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    {fullAddress(data)}
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
                    Phone
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
            </Box>

            <Container sx={{ mt: "10px" }}>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit" component="div">
                    The student is enrolled in the course
                  </Typography>
                </Toolbar>
              </AppBar>
            </Container>
            <Box
              sx={{
                mt: "10px",
              }}
            >
              <Container>
                <Grid container m={2}>
                  <Grid item md={12}>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Course Code and Course Name</TableCell>
                            <TableCell align="right">Duration(Weeks)</TableCell>
                            <TableCell align="right">
                              Proposed Start Date
                            </TableCell>
                            <TableCell align="right">
                              Proposed End Date
                            </TableCell>
                            <TableCell align="right">
                              Delivery Location
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            key={1 + 2}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {courseCode(data?.course)}
                            </TableCell>
                            <TableCell align="right">
                              {data?.course?.duration_in_week}
                            </TableCell>
                            <TableCell align="right">
                              {formatDate(data?.student_start_course)}
                            </TableCell>
                            <TableCell align="right">{1 + 2}</TableCell>
                            <TableCell align="right">
                              {data?.student_course_location
                                ? data?.student_course_location
                                : "Remote Learning"}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Container>
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
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px" }}
                  >
                    1. The Agreement
                  </Typography>

                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "40px", fontSize: "18px" }}
                  >
                    <List
                      sx={{
                        listStyleType: "disc",
                        listStylePosition: "inside",
                      }}
                    >
                      <ListItem sx={{ display: "list-item" }}>
                        1.1. These Terms of enrolment form a binding Agreement
                        between ICV and the recipient of the Letter of Offer.
                        Provision of enrolment is subject to a payment of the
                        agreed fee.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        1.2. The Terms of Agreement may be subject to variation
                        as necessary to comply with any Australian Commonwealth
                        or State law, regulation or amendment thereof.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        1.3. All conditions and special notes contained in the
                        Enrolment Agreement must be met and/or agreed to prior
                        to ICV issuing a Confirmation of Enrolment.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        1.4. The student is responsible for keeping a copy of
                        the enrolment agreement as supplied by ICV and receipts
                        of any payments of tuition fees and non-tuition fees.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        1.5. Students must meet the Language, Literacy and
                        Numeracy entry requirement for the course.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        1.6. Students are required to maintain attendance and
                        `course progress as per ICV policy for the full duration
                        of study
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        1.7. ICV may use its discretion to cancel or defer the
                        enrolment of a student on the grounds of misconduct by
                        the student, financial status (students with overdue
                        fee) or on grounds of compassionate or compelling
                        circumstances.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        1.8. Students are responsible for supplying the Unique
                        Student Identifier (USI) to the college before any
                        statement of attainment or testamur may be issued.
                        Students may seek advice from ICV to apply for a USI
                      </ListItem>
                    </List>
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px" }}
                  >
                    2. ICV’s Obligation
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "40px", mt: "20px", fontSize: "18px" }}
                  >
                    ICV is responsible for the quality of the training and
                    assessment in compliance with these Standards, and for the
                    issuance of the AQF [Australian Qualifications Framework]
                    certification documentation responsible for the quality of
                    the training and assessment in compliance with the Standards
                    for Registered Training Organisation (SRTOs) 2015, and for
                    the issuance of the AQF [Australian Qualifications
                    Framework] certification documentation. For further
                    information, please refer to{" "}
                    <a href="https://www.asqa.gov.au/standards">
                      Users' guide to Standards for RTOs 2015 | Australian
                      Skills Quality Authority (ASQA)
                    </a>
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "20px" }}
                  >
                    3. Fees (FFS)
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "40px", fontSize: "18px" }}
                  >
                    <List
                      sx={{
                        listStyleType: "disc",
                        listStylePosition: "inside",
                      }}
                    >
                      <ListItem sx={{ display: "list-item" }}>
                        3.1. The student will pay ICV the fees specified in the
                        Statement of Fees. ICV will not finalise enrolment in
                        the course until the required initial fee payment is
                        received.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        3.2. Students must maintain payment schedule as per the
                        Statement of Fees. The student must pay course fees on
                        or before the due date. ICV may cancel the enrolment of
                        students who do not make payment of course fees by the
                        due date, in line with ICV’s withdrawal policy and
                        procedures. Please refer to Withdrawal Policy for
                        details
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        3.3.ICV can withhold the issuance of a qualification
                        until the statement of fee are paid in full.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        3.4. Students are required to sign the enrolment
                        agreement prior to or concurrently with payment of their
                        initial fee. Students are required to have a signed
                        enrolment agreement in place prior to commencing
                        classes.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        3.5. ICV does not collect more than $1500 in prepaid
                        fees from local student
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        3.5.3.6. ICV has the right to vary tuition fees and
                        charges from time to time without notice. For more
                        information on tuition fees refer to ICV website.
                        www.icv.edu.au
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        3.7. Additional fees and charges may be incurred during
                        enrolment, for additional fees and charges please refer
                        to the following table:
                      </ListItem>
                    </List>
                  </Typography>
                  <Container>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Particulars</TableCell>
                            <TableCell align="center">Fee</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              Additional statement of attainment (one statement
                              of attainment will be provided free of charge each
                              term)
                            </TableCell>
                            <TableCell align="center">$50.00</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              Replacement Diploma / Certificate
                            </TableCell>
                            <TableCell align="center">$100.00</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              Re-enrolment of unit (after the allocated number
                              of reassessments (2) have been exhausted) (FFS)
                            </TableCell>
                            <TableCell align="center">$1,200.00</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              Replacement ID card
                            </TableCell>
                            <TableCell align="center">$10.00</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              RPL assessment (per unit of competency) (FFS)
                            </TableCell>
                            <TableCell align="center">$500.00</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Container>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", mt: "20px", fontSize: "18px" }}
                  >
                    Students must refer to{" "}
                    <a
                      href="https://www.icv.edu.au/fee-schedule"
                      target="_blank"
                    >
                      https://www.icv.edu.au/fee-schedule
                    </a>{" "}
                    for information on fees. Prior to the commencement of
                    training, ICV will provide each Skills First Student with a
                    Statement of Fees. Where fees are subsidised by a VET
                    Funding Contract, enrolling in this course may affect your
                    future training options and eligibility for further
                    government subsidies
                  </Typography>

                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", mt: "20px", fontSize: "18px" }}
                  >
                    4. Student Participation
                  </Typography>

                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", mt: "20px", fontSize: "18px" }}
                  >
                    Student must meet the attendance and course progress
                    requirements, as part of the student obligation mentioned in
                    their training plan. Students need to be aware that
                    significant non-attendance may seriously jeopardise their
                    chances of success in the unit and potentially the course.
                    If you are unable or unlikely to be able to do so, you must
                    discuss this with your Trainer as soon as possible. Failure
                    to attend classes on a regular basis without acceptable
                    evidence of incapacity may result in unsatisfactory course
                    progress. ICV may cancel your enrolment and notify the
                    relevant department such as Department of Education (for
                    subsidised courses) and Department of Health and Human
                    Services Victoria (for Centrelink funded courses).
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "20px", fontSize: "18px" }}
                  >
                    5. Refund Policy and Procedure
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "18px", fontSize: "16px" }}
                  >
                    Policy
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    ICV will provide a full refund to a student in the case of
                    default by ICV. ICV will provide a full or partial refund to
                    a student in the case of default by the student.
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "18px", fontSize: "16px" }}
                  >
                    Procedure:
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    1. Applying for a refund
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    All applications for a refund must be made using ICV’s
                    refund application form. This is available from the
                    reception desk or from the Administration Officer.
                  </Typography>

                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    2. Payment of refunds
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    All refunds will be paid to the person with whom ICV has a
                    contract unless written authority is received by ICV to pay
                    another party. The postal address for refund applications is
                    provided in the Pre-enrolment information for local students
                    and the student handbook.All approved refunds are made
                    payable to and sent to the student or his/her agent (if
                    written authority has been obtained to do so), in the
                    country of origin as applicable in Australian dollars.
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    3. Refund of fees other than tuition fees
                  </Typography>
                  <List
                    sx={{
                      listStyleType: "disc",
                      listStylePosition: "inside",
                      ml: "30px",
                    }}
                  >
                    <ListItem sx={{ display: "list-item" }}>
                      Application Fees are non-refundable under any
                      circumstances.
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                      Materials fees are refundable in the event of a student
                      not commencing and provided 14 days’ notice prior to the
                      agreed starting day.
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                      Materials fees are not refundable if a student withdraws
                      from a course, or if a student’s enrolment is cancelled.
                      There is no refund available for substitution of
                      materials.
                    </ListItem>
                  </List>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    4. Refunds of tuition Fees
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    ICV will refund tuition fees as follows
                  </Typography>
                  <List
                    sx={{
                      listStyleType: "disc",
                      listStylePosition: "inside",
                      ml: "30px",
                    }}
                  >
                    <ListItem sx={{ display: "list-item" }}>
                      If enrolment is cancelled 8 weeks prior to the agreed
                      starting day, ICV will refund 80% of the Tuition Fee
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                      If enrolment is cancelled after the agreed starting day,
                      there will be no refund
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                      If a student provides, fraudulent or misleading
                      information or documents for enrolment, ICV will not
                      provide any refund from the tuition fee.
                    </ListItem>
                  </List>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    The refunds above will be made within 28 days of the date of
                    receipt by ICV of the student’s written notice advising of
                    cancellation of enrolment. Any commission paid to an agent
                    in relation to the student’s recruitment shall be deducted
                    from the above refund. ICV will only provide refund to the
                    person who has paid fee to ICV on student’s behalf unless a
                    written request has been provided by that person to pay
                    refund to a third person.
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    5. Conditions
                  </Typography>
                  <List
                    sx={{
                      listStyleType: "disc",
                      listStylePosition: "inside",
                      ml: "30px",
                    }}
                  >
                    <ListItem sx={{ display: "list-item" }}>
                      The date for cancellation of enrolment is the date that
                      ICV receives the student’s written application for
                      cancellation of enrolment.
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                      Where a student has enrolled in more than one course with
                      ICV, then the agreed starting day is the commencement date
                      of the first course in which the student is enrolled
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                      In the event that a student has not paid his or her
                      applicable tuition fee, the amount ICV may retain shall be
                      a debt that is due and payable by the student together
                      with any expenses, costs or disbursements incurred by ICV
                      in recovering outstanding monies, including but not
                      limited to debt collection agency fees and legal costs.
                    </ListItem>
                  </List>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    6. Default by ICV
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    Where ICV is in default then ICV shall refund the total of
                    the unused portion of prepaid tuition fees received in
                    respect of the student (including any course money collected
                    by education agents or other parties on behalf of the
                    registered provider) prior to the default day. ICV will make
                    payment of the refund within 14 days after the default day.
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    7. Consumer protection laws
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    The agreement of the student to the conditions stated in the
                    offer acceptance agreement, and the availability of
                    complaints and appeals processes, does not remove the right
                    of the student to take action under Australia’s consumer
                    protection laws.
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    8. Other legal remedies
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "30px", mt: "8px", fontSize: "18px" }}
                  >
                    These Terms and Conditions do not circumscribe the Student’s
                    right to pursue any other legal remedies.
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px" }}
                  >
                    6. Deferment or Withdrawal (cancellation):
                  </Typography>

                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", fontSize: "18px" }}
                  >
                    <List
                      sx={{
                        listStyleType: "disc",
                        listStylePosition: "inside",
                      }}
                    >
                      <ListItem sx={{ display: "list-item" }}>
                        6.1. A student may initiate the deferment, or
                        cancellation of their enrolment due to compassionate and
                        compelling circumstances. ICV can also initiate
                        cancellation of a student’s enrolment in line with its
                        policy. For further details, please refer to ICV’s
                        Course Withdrawal Policy available on ICV’s Website
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        6.2. In certain circumstances, ICV may initiate a
                        cancellation of student’s enrolment. For further
                        details, please refer to ICV’s Course Withdrawal Policy
                        available on ICV’s Website.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        6.3. In the event that a student has not paid his or her
                        applicable tuition fee the amount ICV may retain shall
                        be a debt that is due and payable by the student
                        together with any expenses, costs or disbursements
                        incurred by ICV in recovering outstanding monies,
                        including but not limited to debt collection agency fees
                        and legal costs.
                      </ListItem>
                    </List>
                  </Typography>

                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px" }}
                  >
                    7. Complaints and Appeals:
                  </Typography>

                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", fontSize: "18px" }}
                  >
                    <List
                      sx={{
                        listStyleType: "disc",
                        listStylePosition: "inside",
                      }}
                    >
                      <ListItem sx={{ display: "list-item" }}>
                        7.1. ICV will respond to complaints and appeals received
                        by students with regard to their dealings with ICV, its
                        trainers, assessors or other staff, it’s education
                        agents or a learner. ICV will take all complaints and
                        appeals seriously ensure the principles of natural
                        justice and procedural fairness are adopted at every
                        stage of the complaint and appeal process
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        7.2. The internal complaints and appeals processes are
                        at no cost to the student.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        7.3. All complaints and appeals will be acknowledged in
                        writing within 5 working days of receipt.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        7.4. The assessment of the complaint or appeal will
                        commence within 10 working days of it being made and the
                        outcome advised to the complainant in writing within 20
                        working days of receipt of the complaint, including
                        reasons of the outcome. Where ICV considers more than 60
                        calendar days are required to process and finalise the
                        complaint or appeal, ICV will inform the complainant or
                        appellant in writing, including reasons why more than 60
                        calendar days are required, and regularly update the
                        complainant or appellant on the progress of the matter
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        7.5. Where there is a requirement for a meeting to be
                        arranged, the complainant/appellant may be accompanied
                        and assisted by a support person
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        7.6. Where the complainant is not satisfied with the
                        outcome, they will be advised of their right to an
                        internal appeal at no cost.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        7.7.Where the complainant is not satisfied with the
                        internal appeal outcome, they will be advised of their
                        right to an external appeal.
                      </ListItem>
                    </List>
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "20px", mt: "20px", fontSize: "18px" }}
                  >
                    Please refer to Complaint and Appeal Policy and procedure
                    for more details available at ICV website
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", mt: "20px" }}
                  >
                    8. In Case of an Emergency
                  </Typography>

                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", fontSize: "18px" }}
                  >
                    <List
                      sx={{
                        listStyleType: "disc",
                        listStylePosition: "inside",
                      }}
                    >
                      <ListItem sx={{ display: "list-item" }}>
                        8.1. In the event of circumstances requiring urgent
                        medical care where the student is incapable of speaking
                        on their own behalf, ICV is authorised as a matter of
                        urgency to seek and provide appropriate medical care on
                        behalf of the student.
                      </ListItem>
                    </List>
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", mt: "20px", fontSize: "18px" }}
                  >
                    9. Enrolment under the VET Funding Contract - Skills First
                    Program:
                  </Typography>

                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", mt: "20px", fontSize: "18px" }}
                  >
                    If a student is enrolled under the Skills First Program,
                    please be aware that there are limits on the number of
                    Government subsidised courses you can commence or undertake
                    in any one year and/or in a lifetime. In signing this
                    agreement, you acknowledge that you have been provided with
                    information that explains how your enrolment will impact
                    future Skills First Entitlement.
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", mt: "20px", fontSize: "18px" }}
                  >
                    Allocation of Work Placement (CHC Qualifications)
                  </Typography>

                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", mt: "20px", fontSize: "18px" }}
                  >
                    Students are encouraged to seek workplace arrangements that
                    are convenient to their place of residence, work, or
                    studies. Where students have difficulties in doing so, ICV
                    will offer support and allocate a suitable service where the
                    required placement hours and activities can be undertaken.
                    Where ICV provides such allocation, this will be
                    communicated in writing and request that students accept or
                    reject the offer. Where students reject the offer, they will
                    be responsible to find an alternative place and the offer
                    will be allocated to other student/s. ICV will not be
                    responsible to allocate a placement position for the student
                    who rejected the offer.
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", mt: "20px", fontSize: "18px" }}
                  >
                    10. Victorian Government VET Student Enrolment Privacy
                    Notice
                  </Typography>

                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "15px", mt: "20px", fontSize: "18px" }}
                  >
                    The Victorian Government, through the Department of
                    Education and Training (the Department), develops, monitors
                    and funds vocational education and training (VET) in
                    Victoria. The Victorian Government is committed to ensuring
                    that Victorians have access to appropriate and relevant VET
                    services. Any personal information collected by the
                    Department for VET purposes is protected in accordance with
                    the Privacy and Data Protection Act 2014 (Vic) and the
                    Health Records Act 2001 (Vic).
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "20px", mt: "20px", fontSize: "18px" }}
                  >
                    <List
                      sx={{
                        listStyleType: "disc",
                        listStylePosition: "inside",
                      }}
                    >
                      <ListItem sx={{ display: "list-item" }}>
                        Collection of your data: INTERNATIONAL COLLEGE OF
                        VICTORIA (ICV) is required to provide the Department
                        with student and training activity data. This includes
                        personal information collected in the INTERNATIONAL
                        COLLEGE OF VICTORIA (ICV) enrolment form and unique
                        identifiers such as the Victorian Student Number (VSN)
                        and the Commonwealth’s Unique Student Identifier (USI).
                        INTERNATIONAL COLLEGE OF VICTORIA (ICV) provides data to
                        the Department in accordance with the Victorian VET
                        Student Statistical Collection Guidelines, available at
                        DET website.
                        <Typography
                          variant="p"
                          color="inherit"
                          component="div"
                          sx={{ ml: "20px", mt: "20px", fontSize: "18px" }}
                        >
                          <a
                            href="http://www.education.vic.gov.au/training/providers/rto/Pages/datacollection.aspx"
                            target="_blank"
                          >
                            http://www.education.vic.gov.au/training/providers/rto/Pages/datacollection.aspx
                          </a>
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        Use of your data: The Department uses student and
                        training data, including personal information, for a
                        range of VET purposes including administration,
                        monitoring and planning, including interaction between
                        the Department and Student where appropriate. The data
                        may also be subjected to data analytics, which seek to
                        determine the likelihood of certain events occurring
                        (such as program or subject completion), which may be
                        relevant to the services provided to the student.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        Disclosure of your data As necessary and where lawful,
                        the Department may disclose VET data, including personal
                        information, to its contractors, other government
                        agencies, professional bodies and/or other organisations
                        for VET-related purposes. In particular, this includes
                        disclosure of VET student and training data to the
                        Commonwealth and the National Centre for Vocational
                        Education Research (NCVER).
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        Legal and Regulatory: The Department’s collection and
                        handling of enrolment data and VSNs is authorised under
                        the Education and Training Reform Act 2006 (Vic). The
                        Department is also authorised to collect and handle USIs
                        in accordance with the Student Identifiers Act 2014
                        (Cth) and the Student Identifiers Regulation 2014 (Cth).
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        Survey participation: You may be contacted by a relevant
                        Department for the purpose of:
                        <ListItem sx={{ display: "list-item" }}>
                          receiving an NCVER survey;
                        </ListItem>
                        <ListItem sx={{ display: "list-item" }}>
                          receiving an invitation to participate in a Department
                          endorsed project;
                        </ListItem>
                        <ListItem sx={{ display: "list-item" }}>
                          receiving an invitation to participate in the
                          Department’s annual student outcome survey; and/or
                        </ListItem>
                        <ListItem sx={{ display: "list-item" }}>
                          being contacted by the Department for audit, review or
                          investigation purposes. This provides valuable
                          feedback on the delivery of VET programs in Victoria.
                          Please note you may opt out of the NCVER survey at the
                          time of being contacted.
                        </ListItem>
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        Consequences of not providing your information : Failure
                        to provide your personal information may mean that it is
                        not possible for you to enrol in VET and/or to obtain a
                        Victorian Government VET subsidy.
                      </ListItem>
                      <ListItem sx={{ display: "list-item" }}>
                        Further information : for further information about;
                        <ListItem sx={{ display: "list-item" }}>
                          the way the Department collects and handles personal
                          information, including access, correction and
                          complaints, visit:
                          <a
                            href="http://www.education.vic.gov.au/Pages/privacypolicy.aspx"
                            target="_blank"
                          >
                            http://www.education.vic.gov.au/Pages/privacypolicy.aspx
                          </a>
                        </ListItem>
                        <ListItem sx={{ display: "list-item" }}>
                          Unique Student Identifiers, including access,
                          correction and complaints, visit:
                          <a
                            href="http://www.usi.gov.au/Students/Pages/student-privacy.aspx"
                            target="_blank"
                          >
                            http://www.usi.gov.au/Students/Pages/student-privacy.aspx
                          </a>
                        </ListItem>
                      </ListItem>
                    </List>
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: "20px" }}
                  >
                    11. Important Policies and Procedures
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "25px", mt: "20px", fontSize: "18px" }}
                  >
                    The student will be responsible to read the important
                    policies and procedures available at ICV website and any
                    amendments/updates made to these:
                    <a
                      href=" http://www.icv.edu.au/policies-and-procedures-2/"
                      target="_blank"
                    >
                      {" "}
                      http://www.icv.edu.au/policies-and-procedures-2/
                    </a>
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "25px", mt: "20px", fontSize: "18px" }}
                  >
                    I acknowledge that I have received ICV’s Student Information
                    Sheet, which contains information about my rights and
                    obligations under a training program. Further, I acknowledge
                    that enrolment under the Skills First Program will impact
                    future Skills First Entitlements.
                  </Typography>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "25px", mt: "20px", fontSize: "18px" }}
                  >
                    I have read, understood, and agree to Terms of Agreement
                    mentioned above. I will keep a copy of this enrolment
                    agreement and receipts of any payments of tuition or
                    non-tuition fees.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Container>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit" component="div">
                    Applicant’s Declaration
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
                    sx={{ ml: "40px", mt: "8px", mb: "20px", fontSize: "18px" }}
                  >
                    I have read, understood and agree to Terms of Agreement
                    mentioned above. I will keep a copy of this enrolment
                    agreement and receipts of any payments of tuition or
                    non-tuition fees
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ ml: "100px", fontSize: "18px" }}
                  >
                    Applicant’s Name
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    {data?.student_declaration?.name
                      ? data?.student_declaration?.name
                      : fullName(data)}
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
                    {formatDate(data?.agreement_date)}
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
                    Applicant’s Signature
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  {data?.agreement_signature?.includes("data") ? (
                    <Box>
                      <img
                        src={data?.agreement_signature}
                        width={"200px"}
                        sx={{ borderBottom: "1px solid black" }}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="h6" color="inherit" component="div">
                        {data?.agreement_signature}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Container>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit" component="div">
                    ICV’s Acceptance of Agreement
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
                    Representative’s Name
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    Gopal Pokharel
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
                    Designation :
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    CEO
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
                    Representative’s Signature
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="p"
                    color="inherit"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    G.P.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Download;
