import React, { useState, useEffect } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getuser, deleteuser } from "../Fetures/userSlice";
import AddUserModal from "../Models/AdduserData";
import EditUserModal from "../Models/EdituserModel";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Usersdata = () => {
  const {  alluser } = useSelector((state) => state.auth);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteuser(userId));
    alert("User Deleted Successfully");
    dispatch(getuser());
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  return (
    <div className="bg-black">
      <Container>
        <Row className="justify-content-center">
          <div className="justify-content-center">
            
              <>
                <Button
                  className="btn btn-success mb-3 mt-3"
                  onClick={() => setShowAddUserModal(true)}
                >
                  + Add User
                </Button>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Username</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alluser.map((user, index) => (
                      <tr key={index}>  
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>

                        <td>
                          <div
                            style={{ color: "green", cursor: "pointer" }}
                            onClick={() => handleEditUser(user)}
                          >
                            <FaEdit size={25} />
                          </div>
                        </td>
                        <td>
                          <div
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            <MdDeleteForever size={25} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            
          </div>
        </Row>
      </Container>
      <AddUserModal
        showModal={showAddUserModal}
        handleCloseModal={() => setShowAddUserModal(false)}
      />
      <EditUserModal
        showModal={showEditUserModal}
        handleCloseModal={() => setShowEditUserModal(false)}
        userData={selectedUser}
      />
    </div>
  );
};

export default Usersdata;
