import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  CircularProgress,
  Backdrop,

} from "@mui/material";
import { styled } from "@mui/material";
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

export default function DataTable({loader, setLoader}) {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    setLoader(true);
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/api/v1/apply_details/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setLoader(false);
        toast.success("Application Deleted successfully");
        const all_applications = applications.filter((app) => app.id !== id);
        setApplications(all_applications);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  useEffect(() => {
    const localStorageItems = ["data", "id", "currentAciveStep"];
    localStorageItems.forEach((k) => localStorage.removeItem(k));
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Your are not authorized");
      navigate("/");
    }
    setLoader(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/apply_details`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(function (res) {
        setLoader(false);
        // debugger
        // debugger
        setApplications(res.data.data);
        // setTotalCount(res.data.total);
      })
      .catch(function (error) {
        // debugger
        toast.error(error.response.data);
        localStorage.removeItem("token");
        navigate("/");
        console.log("error asdfds", error);
      })
      .finally(function () {});
  }, []);
  const columns = [
    {name: "Course",
    options: {
      filter: true,
      sort: false,
      style: {width: '12px'}
     }
     } ,
    "Date",
    "Given Name",
    "Mobile Number",
    "Email",
    {
    label: "Actions",
    options: {
        customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
              
              <Link to={`/user-applications/${tableMeta.rowData[5]}`}>

                <VisibilityIcon sx={{ml: "10px"}}  variant="contained" color="success" />
              </Link>
                <Link to={`/user-applications/edit/${tableMeta.rowData[5]}`}>
                <EditIcon variant="contained" sx={{ml: "10px"}} />
                </Link>
                <DeleteIcon sx={{ml: "10px"}} onClick={() => handleDelete(tableMeta.rowData[5])} color="error" variant="contained" />
                <Link to={`/user-applications/download/${tableMeta.rowData[5]}`}>
                <DownloadIcon sx={{ml: "10px"}} variant="contained" color="secondary" />
                </Link>
          </>
            )
        }
    }
  }
  ];


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
    <Box
      sx={{
        border: "1px solid #E5EAF2",
        borderRadius: "12px 12px 0 0",
        mt: "60px",
      }}
    >
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={"LIST OF APPLIED STUDENT"}
          data={applications}
          columns={columns}
        />
      </ThemeProvider>
    </CacheProvider>
    </Box>
    </Container>
  );
}

