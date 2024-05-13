import { Container } from "@mui/material";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Container fixed sx={{ mt: "20px", mb: "20px" }}>
      <Box
        component="section"
        sx={{
          p: 3,
          border: "1px solid rgb(229, 234, 242)",
          textAlign: "center",
        }}
        className="footerContainer"
      >
        <p>
          <span>Address:</span> Level 4, 310 King Street, Melbourne, VIC 3000{" "}
          <span>Phone:</span> +61 3 9942 1836
        </p>
        <p>
          <span>Website:</span>{" "}
          <a href="http://www.icv.edu.au">http://www.icv.edu.au </a>{" "}
          <span>Email:</span> <a href="info@icv.edu.au"> info@icv.edu.au </a>
          &nbsp;&nbsp;<span>RTO No. 22581 CRICOS Code: 03649A</span>&nbsp;&nbsp;
          <span>Version: V3.1 17/03/2024</span>
        </p>
      </Box>
    </Container>
  );
};

export default Footer;

// Address: Level 4, 310 King Street, Melbourne, VIC 3000 Phone: +61 3 9942 1836

// Website: http://www.icv.edu.au Email: info@icv.edu.au   RTO No. 22581 CRICOS Code: 03649A  Version: V3.1 17/03/2024
