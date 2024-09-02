import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import data from '../Location_data.json';
import { Eye, Pencil, Trash } from 'react-bootstrap-icons';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editStudent, setEditStudent] = useState({
    No: '',
    Names: '',
    Grade: '',
    Gender: '',
    Age: '',
    Email: '',
    Province: '',
    District: '',
    Sector: '',
    Cell: '',
    Village: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
  };

  const handleShow = (student) => {
    setSelectedStudent(student);
    setShow(true);
  };

  const handleEditShow = (student) => {
    setEditStudent(student);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudent((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/students/${editStudent.No}`, editStudent);
      fetchStudents(); // Refresh the list
      setShowEdit(false);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents(); // Refresh the list
    } catch (error) {
      console.error('Error deleting student:', error);
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

  const filteredStudents = students.filter(student =>
    Object.values(student).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  // Location data state management
  const [selectedProvince, setSelectedProvince] = useState(editStudent.Province);
  const [selectedDistrict, setSelectedDistrict] = useState(editStudent.District);
  const [selectedSector, setSelectedSector] = useState(editStudent.Sector);
  const [selectedCell, setSelectedCell] = useState(editStudent.Cell);
  const [selectedVillage, setSelectedVillage] = useState(editStudent.Village);

  const provinces = Object.keys(data);
  const districts = selectedProvince ? Object.keys(data[selectedProvince]) : [];
  const sectors = selectedDistrict ? Object.keys(data[selectedProvince][selectedDistrict]) : [];
  const cells = selectedSector ? Object.keys(data[selectedProvince][selectedDistrict][selectedSector]) : [];
  const villages = selectedCell ? data[selectedProvince][selectedDistrict][selectedSector][selectedCell] : [];

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict('');
    setSelectedSector('');
    setSelectedCell('');
    setSelectedVillage('');
    setEditStudent(prev => ({ ...prev, Province: e.target.value }));
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedSector('');
    setSelectedCell('');
    setSelectedVillage('');
    setEditStudent(prev => ({ ...prev, District: e.target.value }));
  };

  const handleSectorChange = (e) => {
    setSelectedSector(e.target.value);
    setSelectedCell('');
    setSelectedVillage('');
    setEditStudent(prev => ({ ...prev, Sector: e.target.value }));
  };

  const handleCellChange = (e) => {
    setSelectedCell(e.target.value);
    setSelectedVillage('');
    setEditStudent(prev => ({ ...prev, Cell: e.target.value }));
  };

  const handleVillageChange = (e) => {
    setSelectedVillage(e.target.value);
    setEditStudent(prev => ({ ...prev, Village: e.target.value }));
  };

  return (
    <div className="container mt-4">
      <h3>List of Students in our school</h3>
      <Form className="mt-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search Students here"
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
            <th>Grade</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Email</th>
            <th>Province</th>
            <th>District</th>
            <th>Sector</th>
            <th>Cell</th>
            <th>Village</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>{highlightText(student.No, search)}</td>
              <td>{highlightText(student.Names, search)}</td>
              <td>{highlightText(student.Grade, search)}</td>
              <td>{highlightText(student.Gender, search)}</td>
              <td>{highlightText(student.Age, search)}</td>
              <td>{highlightText(student.Email, search)}</td>
              <td>{highlightText(student.Province, search)}</td>
              <td>{highlightText(student.District, search)}</td>
              <td>{highlightText(student.Sector, search)}</td>
              <td>{highlightText(student.Cell, search)}</td>
              <td>{highlightText(student.Village, search)}</td>
              <td>
                <OverlayTrigger placement='top' overlay={<Tooltip>View</Tooltip>}>
                <Button variant="primary" size="sm" className="mr-2" onClick={() => handleShow(student)}><Eye /></Button>
                </OverlayTrigger>
                <OverlayTrigger placement='top' overlay={<Tooltip>Edit</Tooltip>}>
                <Button variant="warning" size="sm" className="mr-2" onClick={() => handleEditShow(student)}><Pencil /></Button>
                </OverlayTrigger>
                <OverlayTrigger placement='top' overlay={<Tooltip>Delete</Tooltip>}>
                <Button variant="danger" size="sm" onClick={() => handleDelete(student.No)}><Trash /></Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* View Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <div>
              <p><strong>No:</strong> {selectedStudent.No}</p>
              <p><strong>Names:</strong> {selectedStudent.Names}</p>
              <p><strong>Grade:</strong> {selectedStudent.Grade}</p>
              <p><strong>Gender:</strong> {selectedStudent.Gender}</p>
              <p><strong>Age:</strong> {selectedStudent.Age}</p>
              <p><strong>Email:</strong> {selectedStudent.Email}</p>
              <p><strong>Province:</strong> {selectedStudent.Province}</p>
              <p><strong>District:</strong> {selectedStudent.District}</p>
              <p><strong>Sector:</strong> {selectedStudent.Sector}</p>
              <p><strong>Cell:</strong> {selectedStudent.Cell}</p>
              <p><strong>Village:</strong> {selectedStudent.Village}</p>
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
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Names</Form.Label>
              <Form.Control
                type="text"
                name="Names"
                value={editStudent.Names}
                onChange={handleEditChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                as="select"
                name="Grade"
                value={editStudent.Grade}
                onChange={handleEditChange}
                required
              >
                {[...Array(6)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="Gender"
                value={editStudent.Gender}
                onChange={handleEditChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="Age"
                value={editStudent.Age}
                onChange={handleEditChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={editStudent.Email}
                onChange={handleEditChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Province</Form.Label>
              <Form.Control
                as="select"
                name="Province"
                value={editStudent.Province}
                onChange={handleProvinceChange}
                required
              >
                <option value="">Select Province</option>
                {provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>District</Form.Label>
              <Form.Control
                as="select"
                name="District"
                value={editStudent.District}
                onChange={handleDistrictChange}
                required
              >
                <option value="">Select District</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sector</Form.Label>
              <Form.Control
                as="select"
                name="Sector"
                value={editStudent.Sector}
                onChange={handleSectorChange}
                required
              >
                <option value="">Select Sector</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cell</Form.Label>
              <Form.Control
                as="select"
                name="Cell"
                value={editStudent.Cell}
                onChange={handleCellChange}
                required
              >
                <option value="">Select Cell</option>
                {cells.map(cell => (
                  <option key={cell} value={cell}>{cell}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Village</Form.Label>
              <Form.Control
                as="select"
                name="Village"
                value={editStudent.Village}
                onChange={handleVillageChange}
                required
              >
                <option value="">Select Village</option>
                {villages.map(village => (
                  <option key={village} value={village}>{village}</option>
                ))}
              </Form.Control>
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

export default Students;
