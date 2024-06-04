import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../Fetures/userSlice";
import {  toast } from 'react-toastify';
import "../Css/Login.css"; // Import your custom CSS file

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    if ( user) {
      navigate("/home");
    }
  }, [ user, navigate]);

  const schema = yup.object().shape({
    phoneNumber: yup.string().required("Phone Number Required"),
    password: yup.string().required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      phoneNumber: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(login(values));
      toast("Login Successful")
      // <ToastContainer/>
      navigate("/home");
    },
  });

  return (
    <>
      <Container className="card bg-secondary">
        <Row className="align-items-center justify-content-center">
          <Col lg={4} md={6} className="login-right">
          <div className="login-header">
         <h5>
           Login 
         </h5>
       </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3 form-focus">
               
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Mobile Number"
                  onChange={formik.handleChange("phoneNumber")}
                  value={formik.values.phoneNumber}
                  className={`form-control floating ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <div className="text-danger err-text">
                  {formik.touched.phoneNumber && formik.errors.phoneNumber}
                </div>
              </div>

              <div className="mb-3 form-focus">
            
                <input
                  name="password"
                  type="Password"
                  placeholder="Password"
                  onChange={formik.handleChange("password")}
                  value={formik.values.password}
                  className={`form-control floating ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <div className="text-danger err-text">
                  {formik.touched.password && formik.errors.password}
                </div>
              </div>

              <Button
                variant="success"
                className="btn btn-lg register-btn mb-3"
                type="submit"
              >
                Login
              </Button>

              <div className="dont-have">
                Don’t have an account? <Link to="/register">Register</Link>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
