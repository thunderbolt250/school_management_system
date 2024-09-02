import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Eye, Pencil, Trash } from 'react-bootstrap-icons';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState({
    No: '',
    Names: '',
    Username: '',
    Email: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
  };

  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };

  const handleEditShow = (user) => {
    setEditUser(user);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${editUser.No}`, editUser);
      fetchUsers(); // Refresh the list
      setShowEdit(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight || typeof text !== 'string') {
      return text;
    }
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} style={{ backgroundColor: '#ffc107' }}> {part}</mark>
      ) : ( part)
    );
  };

  const filteredUsers = users.filter(user =>
    Object.values(user).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="container mt-4">
      <h3>List of Users in our school</h3>
      <Form className="mt-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search Users here"
            value={search}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Form>

      <Table striped bordered hover variant="dark" className="mt-4">
        <thead>
          <tr>
            <th>No</th>
            <th>Names</th>
            <th>Username</th>
            <th>Email</th>            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{highlightText(user.No, search)}</td>
              <td>{highlightText(user.Names, search)}</td>
              <td>{highlightText(user.Username, search)}</td>
              <td>{highlightText(user.Email, search)}</td>              
              <td>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>View</Tooltip>}>
                  <Button variant="primary" size="sm" className="mr-2" onClick={() => handleShow(user)}>
                    <Eye />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                  <Button variant="warning" size="sm" className="mr-2" onClick={() => handleEditShow(user)}>
                    <Pencil />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(user.No)}>
                    <Trash />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* View Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>No:</strong> {selectedUser.No}</p>
              <p><strong>Names:</strong> {selectedUser.Names}</p>
              <p><strong>Username:</strong> {selectedUser.Username}</p>
              <p><strong>Email:</strong> {selectedUser.Email}</p>             
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Names</Form.Label>
              <Form.Control
                type="text"
                name="Names"
                value={editUser.Names}
                onChange={handleEditChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="Username"
                value={editUser.Username}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={editUser.Email}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Users;
