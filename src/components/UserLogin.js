import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../styles.css";
import { useRef, useEffect, useState, useContext } from "react";
import { checkLogin } from "../api";
import AuthContext from "../context/AuthProvider";

function UserLogin({ onLogin }) {
  const { setAuth } = useContext(AuthContext);
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSucces] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = {
        email: email,
        password: password,
      };
      checkLogin(response)

      const accessToken = response?.data?.token;
      console.log({accessToken})
      setAuth({ email, password, accessToken });
      setEmail("");
      setPassword("");
      setSucces(true);
      console.log(response);
    //   onLogin(response);
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No server response');
        } else if (err.response?.status === 400){
            setErrMsg('Issue with email or password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorised');
        } else {
            setErrMsg('Login failed');
        }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Successfully logged in</h1>
          <Link to="/dashboard">
            <p>Go to dashboard</p>
          </Link>
        </section>
      ) : (
        <div className="login d-flex justify-content-center align-items-center vh-100 bg-white">
          <div className="form_container p-5 rounded bg-white border border-dark border-2">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
            >
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

export default UserLogin;
