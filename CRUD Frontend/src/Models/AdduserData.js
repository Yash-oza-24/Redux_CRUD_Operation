import React, { useState } from "react";
import { Modal, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { register, getuser } from "../Fetures/userSlice";

const AddUserModal = ({ showModal, handleCloseModal }) => {
  const initialFormData = {
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "user",
    accessRights: {
      isAdminFunctionality1: false,
      isAdminFunctionality2: false, 
      isAdminFunctionality3: false,
      isAdminFunctionality4: false,
      isAdminFunctionality5: false,
      isAdminFunctionality6: false,
      isAdminFunctionality7: false,
      isAdminFunctionality8: false,
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    if (name.startsWith("accessRights")) {
      // Update additionalFunctionalities object
      const fieldName = name.split(".")[1]; // Extract the field name
      setFormData({
        ...formData,
        accessRights: {
          ...formData.accessRights,
          [fieldName]: inputValue,
        },
      });
    } else {
      // Update other form fields
      setFormData({ ...formData, [name]: inputValue });
    }
  };

  const handleSaveUser = () => {
    const { accessRights, ...userData } = formData;

    const selectedFunctionalities = Object.keys(accessRights)
      .filter((key) => accessRights[key])
      .map((key) => key.replace("isAdminFunctionality", ""));
    dispatch(
      register({ ...userData, functionalities: selectedFunctionalities })
    );

    setFormData(initialFormData);
    dispatch(getuser());
    handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicRole">
            <Form.Label>User Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          {formData.role === "admin" && (
            <>
            <Form.Group as={Col}>
                <Form.Label>Additional Functionalities</Form.Label>
                {Object.entries(formData.accessRights).map(
                  ([key, value]) => (
                    <Form.Check
                      key={key}
                      type="checkbox"
                      label={`Admin Functionality ${key.split("isAdminFunctionality")[1]}`}
                      name={`accessRights.${key}`}
                      checked={value}
                      onChange={handleChange}
                    />
                  )
                )}
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveUser}>
          Save User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;