import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { handleLogout } from "../Fetures/userSlice";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

function NavScrollExample() {
  const location = useLocation();
  const dispatch = useDispatch();
  if (location.pathname === "/otp-verification") {
    return null; // Return null to render nothing
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-secondary  ">
      <Container fluid>
        <Navbar.Brand href="#" className="">
          {" "}
          <span
            className="text-white rounded-circle border p-1 fw-bold 
          "
          >
            YO
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2  fw-bold my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link}
                to="/usersdata">About</Nav.Link>
            <Nav.Link  as={Link}
                to="/inquiry">Services</Nav.Link>
            <Nav.Link as={Link}
                to="/blog">Contact</Nav.Link>
          </Nav>
          {location.pathname === "/home"  ? (
            <Button
              variant="success"
              onClick={() => {
                dispatch(handleLogout());
              }}
              className="p-1 m-1"
              as={Link}
              to="/login"
            >
              Logout
            </Button>
          ) : (
            <div className="d-flex ">
              <Button
                variant="success"
                className="p-1 m-1"
                as={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="success"
                className="p-1 m-1"
                as={Link}
                to="/register"
              >
                Register
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
