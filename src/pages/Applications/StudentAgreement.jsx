import { Box, Button, Typography, Container } from "@mui/material";
import { useParams, Link } from "react-router-dom";
const StudentAgreement = () => {
  const { id } = useParams();
  return (
    <>
      <Container>
        <Box
          sx={{
            border: "1px solid #E5EAF2",
            borderRadius: "12px 12px 0 0",
            mt: "60px",
          }}
        >
          <div style={{ width: "90%", margin: "auto", margin: "40px" }}>
            <Box
              component="section"
              sx={{
                p: 2,
                border: "1px solid grey",
                width: "60%",
                height: "300px",
                p: "20px",
                background: "#f2f1f1",
                boxShadow: "1px 2px 5px 2px #ccc",
                margin: "auto",
                mt: "20px",
              }}
            >
              <Typography
                variant="p"
                color="#5C5C5C"
                component="div"
                mt={12}
                fontSize={20}
              >
                Thank you for signing your Enrolment Agreement Form. You can
                download Enrollment Agreement by clicking on below button
              </Typography>
            </Box>
          </div>
        </Box>
        <Box
          component="section"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to={`/user-applications/download/${id}`}>
            <Button variant="contained" color="primary" sx={{ m: "25px 0px" }}>
              View and Download Copy of agreement
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default StudentAgreement;
