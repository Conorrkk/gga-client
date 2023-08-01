import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles.css";
import { registerUser } from "../api";

function RegisterUser({ onRegister }) {
  const [username, setUsername] = useState("");
  const [club, setClub] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleClubChange = (event) => {
    setClub(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      username: username,
      club: club,
      email: email,
      password: password,
    };

    onRegister(userData);

    registerUser(userData)
      .then((response) => {
        setUsername("");
        setClub("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  return (
    <div className="registration template d-flex justify-content-center align-items-center vh-100">
      <div className="form_container p-5 rounded bg-white border-black border border-dark border-2">
        <Form onSubmit={handleSubmit}>
          <h3 className="text-center">Register</h3>
          <Form.Group className="mb-2" controlId="Username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={handleUsernameChange}
              type="text"
              autoComplete="off"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="Club">
            <Form.Label>Club</Form.Label>
            <Form.Control
              value={club}
              onChange={handleClubChange}
              type="text"
              autoComplete="off"
              placeholder="Club"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={handleEmailChange}
              type="email"
              autoComplete="off"
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="Enter Password"
            />
          </Form.Group>
          <div className="d-grid mb-2">
            <Button variant="success" type="submit">
              Register
            </Button>
          </div>
          <p className="text-right">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default RegisterUser;
