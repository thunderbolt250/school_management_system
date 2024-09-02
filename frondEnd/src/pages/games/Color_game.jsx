import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

const colors = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Orange', hex: '#FFA500' },
];

const Game = () => {
  const [targetColor, setTargetColor] = useState(colors[Math.floor(Math.random() * colors.length)]);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleColorClick = (color) => {
    setAttempts(attempts + 1);
    if (color.name === targetColor.name) {
      setMessage(`Congratulations! You matched the color in ${attempts + 1} attempts.`);
    } else {
      setMessage(`Try again! ${color.name} is not the correct color.`);
    }
  };

  const handleRestart = () => {
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
    setMessage('');
    setAttempts(0);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="text-center">Color Matching Game</h1>
          <h3 className="text-center">Match the color: {targetColor.name}</h3>
          <Row>
            {colors.map((color) => (
              <Col key={color.name} xs="4" className="mb-3">
                <Button
                  style={{ backgroundColor: color.hex, borderColor: color.hex, width: '100%', height: '100px' }}
                  onClick={() => handleColorClick(color)}
                />
              </Col>
            ))}
          </Row>
          {message && <Alert className="mt-3" variant="info">{message}</Alert>}
          <Button variant="secondary" className="mt-3" onClick={handleRestart}>
            Restart Game
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Game;
