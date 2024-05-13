import { useState, useEffect } from "react";
import axios, { isCancel, AxiosError } from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
} from "@mui/material";
const Cources = ({ handleChange, formik, handleLoader }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    handleLoader(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/courses`)
      .then(function (res) {
        handleLoader(false);
        setCourses(res.data);
      })
      .catch(function (error) {
        console.log("error", error);
      })
      .finally(function () {});
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ background: "rgba(243, 246, 249, 0.6)" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Select</TableCell>
            <TableCell align="center">Course Code</TableCell>
            <TableCell align="center">Course Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <Radio
                  checked={formik.values?.course_id == row.id}
                  onChange={handleChange}
                  value={row.id}
                  name="course_id"
                />
              </TableCell>
              <TableCell align="center" htmlFor={row.id}>
                {row.course_code}
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Cources;
