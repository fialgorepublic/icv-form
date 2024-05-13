import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  TableCell,
  TableBody,
  Table,
  Box,
  TableContainer,
  Typography,
  TableHead,
  Button,
  CircularProgress,
  Backdrop,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
function TablePaginationActions(props) {
  const theme = useTheme();

  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    console.log("Event", event);
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function DataTable({ loader, setLoader }) {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
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
        `${process.env.REACT_APP_BASE_URL}/api/v1/apply_details?page=${page}&per_page=${rowsPerPage}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(function (res) {
        setLoader(false);
        setApplications(res.data.data);
        setTotalCount(res.data.total);
      })
      .catch(function (error) {
        toast.error(error.response.data);
        localStorage.removeItem("token");
        navigate("/");
        console.log("error asdfds", error);
      })
      .finally(function () {});
  }, [page, rowsPerPage]);
  console.log("Applications", applications);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - applications.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

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
        <Typography
          variant="h4"
          color="inherit"
          component="div"
          sx={{ ml: "40px", mt: "40px" }}
        >
          LIST OF APPLIED STUDENT
        </Typography>

        <div style={{ margin: "40px" }}>
          <div style={{ height: "auto", overflow: "scroll" }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ width: "100%" }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell align="center">Given Name</TableCell>
                    <TableCell align="center">Mobile No</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row?.course?.title}
                      </TableCell>
                      <TableCell style={{ width: 50 }} align="right">
                        {row.given_name}
                      </TableCell>
                      <TableCell style={{ width: 50 }} align="right">
                        {row?.contacts_detail?.mobile_no}
                      </TableCell>
                      <TableCell style={{ width: 50 }} align="right">
                        {row?.contacts_detail?.email}
                      </TableCell>
                      <TableCell style={{ width: 490 }} align="right">
                        <Link to={`/user-applications/${row.id}`}>
                          <Button
                            variant="contained"
                            color="success"
                            sx={{
                              ml: "5px",
                              fontSize: "16px",
                              color: "#fff",
                              textTransform: "capitalize",
                            }}
                          >
                            Show
                          </Button>
                        </Link>
                        <Link to={`/user-applications/edit/${row.id}`}>
                          <Button
                            variant="contained"
                            sx={{
                              ml: "5px",
                              fontSize: "16px",
                              color: "#fff",
                              textTransform: "capitalize",
                            }}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{
                            ml: "5px",
                            fontSize: "16px",
                            color: "#fff",
                            textTransform: "capitalize",
                          }}
                          onClick={() => handleDelete(row.id)}
                        >
                          Destroy
                        </Button>
                        <Link to={`/user-applications/download/${row.id}`}>
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{
                              ml: "5px",
                              fontSize: "16px",
                              color: "#fff",
                              textTransform: "capitalize",
                            }}
                          >
                            Download PDF
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 1253 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: totalCount },
                      ]}
                      colSpan={7}
                      count={totalCount}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Box>
    </Container>
  );
}
