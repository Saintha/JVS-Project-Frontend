import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import TextField from "../TextField";
import "../../styles/component.css";
import CommonButton from "../CommonButton";
import welcome from "../../assets/images/welcome.png";
import Image from "next/image";
import finish from "../../assets/images/finish.png";
import { Districts, Gender } from "@/src/data/datas";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function SignUpModal(props) {
  const { show, onHide } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Array(4).fill(false));

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    const updatedCompletedSteps = [...completedSteps];
    updatedCompletedSteps[activeStep] = true;
    setCompletedSteps(updatedCompletedSteps);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const steps = [
    {
      title: "Welcome",
      content: (
        <div className="container-fluid SignUp-Welcome-Container">
          <h1>Welcome</h1>
          <p
            className="d-flex justify-content-center align-items-center"
            // style={{ backgroundColor: "green" }}
          >
            Join Us at JVS - Where Your Journey Begins!
          </p>
          <div className="welcomeimage d-flex align-items-center justify-content-center p-4 pt-4 pb-5">
            <Image src={welcome} alt="Centered Image" />
          </div>
          <div className="d-flex justify-content-end pe-2">
            <CommonButton text={"Next"} width={100} onClick={handleNext} />
          </div>
        </div>
      ),
    },
    {
      title: "Create Account",
      content: (
        <div className="container-fluid SignUp-Welcome-Container">
          <h1>Create Account</h1>
          <p className="d-flex">
            Enter your personal details to create account.
          </p>
          <div class="row pb-2">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <TextField
                label={"First Name"}
                placeholder={"Enter Your First Name"}
                // value={email}
                type={"text"}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <TextField
                label={"Last Name"}
                placeholder={"Enter the Last name"}
                // value={password}
                type={"text"}
              />
            </div>
          </div>

          <div class="row pb-2">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <TextField
                label={"Date Of Birth"}
                placeholder={"DD-MM-YYYY"}
                // value={email}
                type={"date"}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label htmlFor="input-field" className="Text-input-label">
                  Gender
                </label>
                <select
                  className="form-control"
                  // value={selectedCity}
                  // onChange={HandleSelectCity}
                >
                  <option value="">Select the Gender</option>
                  {Gender.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div class="row pb-2">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <TextField
                label={"Email"}
                placeholder={"Enter Your Email"}
                // value={email}
                // onChange={handleEmailChange}
                type={"text"}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <TextField
                label={"Password"}
                placeholder={"Enter the Password"}
                // value={password}
                // onChange={handlePasswordChange}
                type={"password"}
              />
            </div>
          </div>

          <div class="row pb-2">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <TextField
                label={"Phone number"}
                placeholder={"Enter Your Phone Number"}
                // value={email}
                type={"text"}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <TextField
                label={"NIC"}
                placeholder={"Enter the NIC Number"}
                // value={password}
                type={"number"}
              />
            </div>
          </div>

          <div class="row pb-4">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <TextField
                label={"Address"}
                placeholder={"Enter Your Address"}
                // value={email}
                type={"text"}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label htmlFor="input-field" className="Text-input-label">
                  City
                </label>
                <select
                  className="form-control"
                  // value={selectedCity}
                  // onChange={HandleSelectCity}
                >
                  <option value="">Select the City</option>
                  {Districts.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div className="d-flex gap-3 align-items-end justify-content-end">
              <CommonButton text={"Back"} width={100} onClick={handleBack} />
              <CommonButton text={"Next"} width={100} onClick={handleNext} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Create Account Cont",
      content: (
        <div className="container-fluid">
          <div className="row pb-3">
            <div className="form-group">
              <label htmlFor="input-field" className="Text-input-label">
                About me
              </label>
              <textarea
                className="form-control"
                placeholder={"Small description about your self"}
                rows={5}
              />
            </div>
          </div>
          <div className="row pb-4">
            <TextField
              label={"Upload Your Photo"}
              placeholder={
                "Upload a file or rag and drop PNG,JPG,GIF upto 10mb"
              }
              // value={password}
              // onChange={handlePasswordChange}
              type={"file"}
            />
          </div>

          <div className="row">
            <div className="d-flex gap-2 align-items-end justify-content-end">
              <CommonButton text={"Back"} width={100} onClick={handleBack} />
              <CommonButton text={"Finish"} width={100} onClick={handleNext} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Finish",
      content: (
        <div className="container-fluid p-5">
          <div className="d-flex align-items-center justify-content-center ">
            <Image src={finish} alt="" />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center Account-created pt-3">
            <h1>Your Account has been Successfully created!...</h1>
            <h3>Now you can start exploring !</h3>
          </div>
          <div className="d-flex flex-column justify-content-center gap-2 ps-5 pe-5">
            <CommonButton text={"Start exploring"} width={"100%"} />
            <Button variant="secondary" width={"100%"}>
              Go to Profile
            </Button>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
        <Modal.Body>
          <div
            className="d-flex align-items-center justify-content-center gap-5"
          >
            {completedSteps.map((completed, index) => (
              completed ? <CheckCircleIcon key={index} sx={{color:'green'}}/> : <RadioButtonCheckedIcon key={index} sx={{color:'#a1a1a1'}}/>
            ))}
          </div>
          {steps[activeStep].content}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignUpModal;