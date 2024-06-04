import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../Css/Cardregi.css"
const Cardregi = () => {
  return (
    <div className="card-container">
      <div className="">
      <Button
            variant="outline-success"
            className="custom-btn btn-block py-3 mb-3"
            as={Link}
            to="/user-register"
          >
            Register as User
          </Button>
      
        <div className="or"></div>
        <Button
            variant="outline-success"
            className="custom-btn btn-block py-3 mb-3"
            as={Link}
            to="/admin-register"
          >
            Register as Admin
          </Button>

      </div>
    </div>
  );
};

export default Cardregi;
