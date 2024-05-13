import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Box,
  CircularProgress,
  Backdrop,
} from "@mui/material";

import {
  FirstStep,
  SecondStep,
  ThirdStep,
  FourthStep,
  FifthStep,
  SixthStep,
  SeventhStep,
  EightStep,
  NineStep,
  TenStep,
  LastStep,
  FinalStep,
  FormStep,
} from "../components/BaseComponents";

const StepsContainer = () => {
  const currentStep = Number(localStorage.getItem("currentAciveStep"));
  const data = JSON.parse(localStorage?.getItem("data"));
  const [activeStep, setActiveStep] = useState(currentStep ? currentStep : 0);
  console.log("current_step", currentStep);
  console.log("active_step", activeStep);
  const [loader, setLoader] = useState(false);

  const handleLoader = (val) => {
    setLoader(val);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => Number(prevActiveStep) + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Number(prevActiveStep) - 1);
    localStorage.setItem("currentAciveStep", Number(activeStep) - 1);
  };

  const steps = [
    {
      name: "Step 1",
      component: (
        <FirstStep
          data={data}
          activeStep={activeStep}
          handleNext={handleNext}
          handleLoader={handleLoader}
          steps={11}
        />
      ),
    },
    {
      name: "Step 2",
      component: (
        <SecondStep
          data={data}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleLoader={handleLoader}
          steps={11}
        />
      ),
    },
    {
      name: "Step 3",
      component: (
        <ThirdStep
          data={data}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleLoader={handleLoader}
          steps={11}
        />
      ),
    },
    {
      name: "Step 4",
      component: (
        <FourthStep
          data={data}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleLoader={handleLoader}
          steps={11}
        />
      ),
    },
    {
      name: "Step 5",
      component: (
        <FifthStep
          data={data}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleLoader={handleLoader}
          steps={11}
        />
      ),
    },
    {
      name: "Step 6",
      component: (
        <SixthStep
          data={data}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleLoader={handleLoader}
          steps={11}
        />
      ),
    },
    {
      name: "Step 7",
      component: (
        <SeventhStep
          data={data}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleLoader={handleLoader}
          steps={11}
        />
      ),
    },
    {
      name: "Step 8",
      component: (
        <EightStep
          data={data}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleLoader={handleLoader}
          steps={11}
        />
      ),
    },
    {
      name: "Step 9",
      component: (
        <NineStep
          data={data}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleLoader={handleLoader}
          steps={11}
        />
      ),
    },
    {
      name: "Step 10",
      component: (
        <TenStep
          data={data}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleLoader={handleLoader}
          steps={11}
        />
      ),
    },
    {
      name: "Step 11",
      component: (
        <LastStep
          data={data}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleLoader={handleLoader}
          steps={11}
        />
      ),
    },
  ];

  const handleReset = () => {
    localStorage.removeItem("currentAciveStep")
    setActiveStep(0);
  };
  let step = localStorage.getItem("currentAciveStep");
  

  return (
    <Container fixed>
      <Box sx={{ width: "100%", mt: "50px" }}>
        <FormStep activeStep={activeStep} steps={steps} />
        {activeStep === steps.length ? (
          <React.Fragment>
            <Box
              sx={{
                border: "1px solid #E5EAF2",
                borderRadius: "12px 12px 0 0",
                mt: "60px",
              }}
            >
              <div style={{ width: "90%", margin: "auto", margin: "40px" }}>
                <FinalStep />
              </div>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
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
            {steps[activeStep].component}
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
};

export default StepsContainer;
