import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import Students from './Students';
import Users from './Users';

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchTotalStudents();
    fetchTotalUsers();
  }, []);

  const fetchTotalStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/total-students');
      console.log('Total Students Response:', response.data);
      setTotalStudents(response.data.total);
    } catch (error) {
      console.error('Error fetching total students:', error);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/total-users');
      console.log('Total Users Response:', response.data);
      setTotalUsers(response.data.total);
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };

  return (
    <div className="container mt-4">
      <Row>
        <Col>
          <Card bg="primary" text="white" className="mb-4">
            <Card.Body>
              <Card.Title>Total Students</Card.Title>
              <Card.Text>{totalStudents}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="success" text="white" className="mb-4">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="warning" text="white" className="mb-4">
            <Card.Body>
              <Card.Title>Total Classes</Card.Title>
              <Card.Text>6</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="danger" text="white" className="mb-4">
            <Card.Body>
              <Card.Title>Total Subjects</Card.Title>
              <Card.Text>12</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="scrollable-container">
        <Students />
      </div>
      <div className="scrollable-container">
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
