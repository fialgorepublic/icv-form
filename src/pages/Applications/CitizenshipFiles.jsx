import { Grid, Typography } from "@mui/material";
const CitizenshipFiles = ({ name, file }) => {
  return (
    <Grid container m={2}>
      <Grid item md={6}>
        <Typography
          variant="p"
          color="inherit"
          component="div"
          sx={{ ml: "100px", fontSize: "18px" }}
        >
          {name}
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
            href={`${process.env.REACT_APP_BASE_URL}${file?.url}`}
            target="_blank"
          >
            {file?.filename}
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CitizenshipFiles;
