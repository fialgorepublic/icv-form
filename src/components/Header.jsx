import icvLogo from "/icv-logo.png";
import { Box, Stack, Container } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Header = () => {
  const navigate = useNavigate();
  let isLoggedIn = localStorage.getItem("token") ? true : false;

  const handleLogout = () => {
    const localStorageItems = ["data", "id", "currentAciveStep", "token"];
    localStorageItems.forEach((k) => localStorage.removeItem(k));
    toast.success("You are Logged Out Successfully");
    navigate("/");
  };
  return (
    <Container sx={{ borderBottom: "1px solid rgb(229, 234, 242)" }}>
      <Stack
        sx={{
          height: "100px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        direction="row"
      >
        <Box component="section" sx={{ ml: "50px" }}>
          <Link to={"/"}>
            <img
              src={icvLogo}
              className="logo"
              alt="Vite logo"
              width={"130px"}
              height={"60px"}
            />
          </Link>
        </Box>
        <Box>
          {isLoggedIn ? (
            <>
              <Link to={"/user-applications"}>
                <Button variant="contained">Applications</Button>
              </Link>
              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{ ml: "10px" }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link to={"/login"}>
              <Button variant="contained" sx={{ ml: "10px" }}>
                Sign in
              </Button>
            </Link>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default Header;
