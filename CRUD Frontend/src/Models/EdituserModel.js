import React, { useState, useEffect } from "react";
import { Modal, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateUser, getuser } from "../Fetures/userSlice";

const EditUserModal = ({ showModal, handleCloseModal, userData }) => {
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    role: "",
    additionalFunctionalities: {
      isAdminFunctionality1: false,
      isAdminFunctionality2: false,
      isAdminFunctionality3: false,
      isAdminFunctionality4: false,
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      const { username, phoneNumber, email, role, additionalFunctionalities } = userData;
      setFormData({
        username,
        phoneNumber,
        email,
        role,
        additionalFunctionalities: additionalFunctionalities || {},
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    if (name.startsWith("additionalFunctionalities")) {
      const fieldName = name.split(".")[1];
      setFormData({
        ...formData,
        additionalFunctionalities: {
          ...formData.additionalFunctionalities,
          [fieldName]: inputValue,
        },
      });
    } else {
      setFormData({ ...formData, [name]: inputValue });
    }
  };

  const handleSaveChanges = () => {
    const { additionalFunctionalities, ...updatedUserData } = formData;
    dispatch(updateUser({ userId: userData._id, updatedUserData }));
    alert("User Updated Successfully");
    dispatch(getuser());
    handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
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
            <Form.Group as={Col}>
              <Form.Label>Additional Functionalities</Form.Label>
              {Object.entries(formData.additionalFunctionalities).map(([key, value]) => (
                <Form.Check
                  key={key}
                  type="checkbox"
                  label={`Admin Functionality ${key.split("isAdminFunctionality")[1]}`}
                  name={`additionalFunctionalities.${key}`}
                  checked={value}
                  onChange={handleChange}
                />
              ))}
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
