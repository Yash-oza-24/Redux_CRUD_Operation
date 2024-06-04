import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import "../Css/otp.css";
import { verifyOTP } from "../Fetures/userSlice";

const OTP = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const phoneNumber = searchParams.get("phoneNumber") || "";
  console.log(phoneNumber);
  
  // Define validation schema
  let schema = yup.object().shape({
    otpinput: yup.string().required("OTP is Required").min(6, "Enter 6 digit Code"),
  });

  // Initialize useFormik hook
  const formik = useFormik({
    initialValues: {
      otpinput: "", 
      phoneNumber: phoneNumber, 
    },
    validationSchema: schema, 
    onSubmit: (values) => { 
      console.log(values); 
      dispatch(verifyOTP(values.otpinput, phoneNumber)); // Dispatch verifyOTP action with otpinput and phoneNumber
    },
  });

  return (
    <Container className="otp-card bg-secondary">
      <Row className="align-items-center justify-content-center">
        <Col className="">
          <div className="login-header">
            <h5>OTP-Verification</h5>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <h6>A One-Time Password has been sent to +91-{phoneNumber}</h6>
            </div>
            <div>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                className="form-control-otp mb-3"
                style={{ maxWidth: "400px" }}
                readOnly // Make phoneNumber input readOnly
              />
              <input
                type="text"
                name="otpinput"
                value={formik.values.otpinput}
                placeholder="Enter OTP"
                onChange={formik.handleChange}
                maxLength={6}
                className="form-control-otp"
                style={{ maxWidth: "400px" }}
              />
              <div className="text-danger err-text">
                {formik.touched.otpinput && formik.errors.otpinput}
              </div>
            </div>
            <Button
              variant="success"
              className="btn fw-bold otp-btn mt-3"
              type="submit"
            >
              Verify OTP
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default OTP;
