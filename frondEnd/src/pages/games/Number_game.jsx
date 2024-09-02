import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';

const Game = () => {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleGuess = (e) => {
    e.preventDefault();
    const numGuess = parseInt(guess, 10);
    setAttempts(attempts + 1);
    if (numGuess === targetNumber) {
      setMessage(`Congratulations! You guessed the number in ${attempts + 1} attempts.`);
    } else if (numGuess < targetNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
  };

  const handleRestart = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setAttempts(0);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="text-center">Number Guessing Game</h1>
          <Form onSubmit={handleGuess}>
            <Form.Group>
              <Form.Label>Enter your guess (1-100):</Form.Label>
              <Form.Control
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Guess
            </Button>
          </Form>
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
