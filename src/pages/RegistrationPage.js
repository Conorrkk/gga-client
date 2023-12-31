import React, { useState } from "react";
import { Form, Button, Card, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";
import { registerUser } from "../api";
import "../styles.css";

function Registration() {
  // states to store registration information and array for the details
  const [userDetails, setUserDetails] = useState([]);
  const [username, setUsername] = useState("");
  const [club, setClub] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // boolean which will return true if registration is successful
  const [success, setSuccess] = useState(false);

  // for nav
  const navigate = useNavigate();

  // update userDetails state based on the data the user enters
  const handleRegistration = (userData) => {
    const newUserDetails = [...userDetails, { userData }];
    setUserDetails(newUserDetails);
  };

  // when user enters a name set as state
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // when user enters club set as state
  const handleClubChange = (event) => {
    setClub(event.target.value);
  };

  // when user enters email set as state
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // when user enters password set as state
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // when user clicks register send data to backend
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username,
      club,
      email,
      password,
    };
    handleRegistration(userData);
    registerUser(userData)
      .then((response) => {
        // reset state
        setUsername("");
        setClub("");
        setEmail("");
        setPassword("");
        setSuccess(true);
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  // navigate to login page when clicked
  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      {success ? (
        <Col
          className="my-4"
          sm={{ span: 6 }}
          md={{ span: 6, offset: 2 }}
          lg={{ span: 6, offset: 2 }}
        >
          <Card className="styled-card">
            <Card.Body>
              <Card.Title>Successfully registered</Card.Title>
              <Button className="styled-button" variant="outline-primary" onClick={handleClick}>
                Login
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ) : (
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
                  pattern="[a-zA-Z\s]+"
                  title="Only accept letters(max 50 chars)"
                  maxLength="50"
                  autoComplete="off"
                  placeholder="Username"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="Club">
                <Form.Label>Club</Form.Label>
                <Form.Control
                  value={club}
                  onChange={handleClubChange}
                  type="text"
                  autoComplete="off"
                  pattern="[a-zA-Z0-9\s]+"
                  maxLength="60"
                  title="Only accepts letter and numbers (max 60 chars)"
                  placeholder="Club"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  autoComplete="off"
                  maxLength="60"
                  placeholder="Enter Email"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  maxLength="50"
                  title="Max length 50 characters"
                  placeholder="Enter Password"
                  required
                />
              </Form.Group>
              <div className="d-grid mb-2">
                <Button className="styled-button" variant="outline-primary" type="submit">
                  Register
                </Button>
              </div>
              <p className="text-right">
                Already registered? <Link to="/login">Login</Link>
              </p>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default Registration;
