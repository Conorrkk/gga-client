import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Col } from "react-bootstrap";
import { checkLogin } from "../api";
import "../styles.css";
// import Footer from "../components/Footer";

function Login() {
  // email the user enters
  const [email, setEmail] = useState("");
  // password the users enters
  const [password, setPassword] = useState("");
  // show user this error message if login fails
  const [errMsg, setErrMsg] = useState("");
  // is true if email and password are a match
  const [success, setSucces] = useState(false);

  const errRef = useRef();

  const navigate = useNavigate();

  // setting the error message whenever email/ password state updates
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  // when user enters email set email state to this value
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // when user enters password set paddword state to this value
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // checks if email and password match those in the db when user clicks login
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await checkLogin({
        email,
        password,
      });
      setEmail("");
      setPassword("");
      setSucces(true);
    } catch (err) {
      console.log(err);
      if (err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Issue with email or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorised");
      } else {
        setErrMsg("Login failed");
      }
    }
  };

  // navigates user to dashboard
  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      {success ? (
        <Col
          className="my-4"
          sm={{ span: 6 }}
          md={{ span: 6, offset: 3 }}
          lg={{ span: 6, offset: 3 }}
        >
          <Card>
            <Card.Body >
              <Card.Title className="d-flex justify-content-center">Successfully logged in</Card.Title>
              <Card.Text className="d-flex justify-content-center"> <Button variant="success" onClick={handleClick}>
                Dashboard
              </Button></Card.Text>
             
            </Card.Body>
          </Card>
        </Col>
      ) : (
        <div className="login d-flex justify-content-center align-items-center vh-100 bg-white">
          <div className="form_container p-5 rounded bg-white border border-dark border-2">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
              {errMsg}
            </p>
            <Form onSubmit={handleSubmit}>
              <h3 className="text-center">Login</h3>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Enter Email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Enter Password"
                />
              </Form.Group>
              <div className="d-grid mb-3">
                <Button variant="success" type="submit">
                  Login
                </Button>
              </div>
              <p className="text-right">
                Not registered yet? <Link to="/register">Register</Link> now
              </p>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
