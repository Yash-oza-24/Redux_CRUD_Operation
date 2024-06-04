import React , { useEffect }from 'react'
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../Fetures/userSlice';
import "../Css/Login.css"
const AdminRegistration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth);
    const { isSuccess, registerUser } = user;
    useEffect(() => {
      if (isSuccess === true && registerUser) {
      }
    }, [isSuccess, registerUser, navigate]);
  
    let schema = yup.object().shape({
        email: yup
          .string()
          .email("Email should be valid")
          .required("Email is Required"),
        password: yup
          .string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    
        username: yup.string().required("Username is Required"),
        phoneNumber: yup.string().required("Mobile Number is Required"),
      });
      const formik = useFormik({
        initialValues: {
          username: "",
          email: "",
          password: "",
          phoneNumber: "",
          role: "admin"
        },
        validationSchema: schema,
        onSubmit: (values) => {
          console.log(values);
          dispatch(register(values));
          formik.resetForm();
          navigate(`/login`);
        },
      });
  return (
    <>
    <Container className="g-0 card bg-secondary ">
   <Row className="align-items-center justify-content-center ">
     <Col lg={4} md={6} className="login-right">
       <div className="login-header">
         <h5>
           Register 
         </h5>
       </div>

       <form onSubmit={formik.handleSubmit} className="mx-auto">
         <div className="mb-3">
           <input
             type="text"
             name="username"
             placeholder='Username'
             onChange={formik.handleChange("username")}
             value={formik.values.username}
             className="form-control floating"
           />
           <div className="text-danger err-text">
             {formik.touched.username && formik.errors.username}
           </div>
         </div>

         <div className="mb-3">
       
           <input
             type="text"
             name="phoneNumber"
             placeholder='Mobile Number'
             onChange={formik.handleChange("phoneNumber")}
             value={formik.values.phoneNumber}
             className="form-control floating"
           />
           <div className="text-danger err-text">
             {formik.touched.phoneNumber && formik.errors.phoneNumber}
           </div>
         </div>

         <div className="mb-3">
         
           <input
             type="email"
             name="email"
             placeholder='Email'
             onChange={formik.handleChange("email")}
             value={formik.values.email}
             className="form-control floating"
           />

           <div className="text-danger err-text">
             {formik.touched.email && formik.errors.email}
           </div>
         </div>
         <div className="mb-3">
        
           <input
             name="password"
             type="Password"
             placeholder='Password'
             onChange={formik.handleChange("password")}
             value={formik.values.password}
             className="form-control floating"
           />

           <div className="text-danger err-text">
             {formik.touched.password && formik.errors.password}
           </div>
         </div>

         <Button variant="success" className="btn btn-lg register-btn mb-3" type="submit">
           Register
         </Button>

         <div className="dont-have">
           Don’t have an account?{" "}
           <Link className="forgot-link" to="/login">
             Login
           </Link>{" "}
         </div>
       </form>
     </Col>
   </Row>
 </Container>
</>
  )
}

export default AdminRegistration
