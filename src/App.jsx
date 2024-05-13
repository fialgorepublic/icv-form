import * as React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Index";
import UserApplications from "./pages/Applications/Index";
import ApplicationDetail from "./pages/Applications/Show";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Steps from "./steps/index";
import EditSteps from "./pages/editSteps";
import DownloadApplication from "./pages/Applications/Download";
import EnrollmentAgreement from "./pages/Applications/EnrollmentAgreement";
import StudentAgreement from "./pages/Applications/StudentAgreement";
import { useState } from "react";
export default function App() {
  const [loader, setLoader] = React.useState(false);
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Header />
      <Routes>
        <Route path="/" exact element={<Steps />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-applications/:id"
          element={<ApplicationDetail loader={loader} setLoader={setLoader} />}
        />
        <Route path="/user-applications/edit/:id/" element={<EditSteps />} />
        <Route
          path="/user-applications/download/:id/"
          element={
            <DownloadApplication loader={loader} setLoader={setLoader} />
          }
        />
        <Route
          path="/user-applications/enrollment_agreement/:id/"
          element={
            <EnrollmentAgreement loader={loader} setLoader={setLoader} />
          }
        />
        <Route
          path="/user-applications/student_agreement/:id/"
          element={<StudentAgreement loader={loader} setLoader={setLoader} />}
        />
        <Route
          path="/user-applications"
          element={<UserApplications loader={loader} setLoader={setLoader} />}
        />
      </Routes>
      <Footer />
    </>
  );
}
