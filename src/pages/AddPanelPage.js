import React, { useState, useRef } from "react";
import { Form, Button, Card, Container, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postPlayer } from "../api";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function AddPanel() {
  // get the team id from URL parameter
  const { teamId } = useParams();

  // for errors
  const errRef = useRef();

  // set player name as state once entered
  const [name, setName] = useState("");

  // set player position as state which user selects - default "Goalkeeper"
  const [position, setPosition] = useState("Goalkeeper");

  // set the current error as state
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  // when users enters a name set it as the name state
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // when use changes the player position set it as position state
  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  // success and failure pop up notifications
  const notifySuccess = () => toast("Player added successfully!");
  const notifyFailure = () => toast("Could not add player");

  // on submission of the form, create this player in the db
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const playerData = {
        playerName: name,
        playerPosition: position,
        teamId: teamId,
      };
      await postPlayer(playerData);
      notifySuccess();
      // reset the state
      setPosition("Goalkeeper");
      setName("");
    } catch (err) {
      notifyFailure();
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Issue with data");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorised");
      } else {
        setErrMsg("Login failed");
      }
    }
  };

  // when done clicked nav to teams page
  const handleDone = () => {
    navigate("/teams");
  };

  // array of all the positions that a user can choose from
  const positions = [
    {
      label: "Goalkeeper",
      value: "Goalkeeper",
    },
    {
      label: "Defender",
      value: "Defender",
    },
    {
      label: "Midfielder",
      value: "Midfielder",
    },
    {
      label: "Forward",
      value: "Forward",
    },
  ];

  return (
    <div>
      <NavBar />
      <Container fluid className="main-container">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>
        <Col
          sm={{ span: 6, offset: 3 }}
          md={{ span: 6, offset: 3 }}
          lg={{ span: 6, offset: 3 }}
          xl={{ span: 6, offset: 3 }}
        >
          <Card className="styled-card" style={{ marginTop: "10vh" }}>
            <Card.Header as="h5">Create players for your team</Card.Header>
            <Card.Body>
              <Card.Title>Create Player</Card.Title>
              <Card.Text>
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    className="mb-3"
                    controlId="createPanelForm.ControlInput1"
                  >
                    <Form.Label>Player Name</Form.Label>
                    <Form.Control
                      value={name}
                      onChange={handleNameChange}
                      type="text"
                      placeholder="Player name"
                      pattern="[a-zA-Z\s]+"
                      maxLength="60"
                      title="Only accept letters(max 60 chars)"
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="createPanelForm.ControlSelect1"
                  >
                    <Form.Label>Position</Form.Label>
                    <Form.Select
                      value={position}
                      onChange={handlePositionChange}
                    >
                      {positions.map((position) => (
                        <option key={position.value} value={position.value}>
                          {position.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <div className="d-grid mb-3">
                    <Col
                      sm={{ span: 2, offset: 10 }}
                      md={{ span: 2, offset: 10 }}
                      lg={{ span: 2, offset: 10 }}
                      xl={{ span: 2, offset: 10 }}
                    >
                      <Button
                        className="styled-button"
                        variant="outline-primary"
                        type="submit"
                      >
                        Add player
                      </Button>
                    </Col>
                  </div>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col
          className="my-2"
          sm={{ span: 1, offset: 8 }}
          md={{ span: 1, offset: 8 }}
          lg={{ span: 1, offset: 8 }}
          xl={{ span: 1, offset: 8 }}
        >
          <Card style={{ marginBottom: "10vh" }}>
            <Button
              className="styled-button"
              variant="outline-primary"
              onClick={handleDone}
            >
              Done
            </Button>
          </Card>
        </Col>
      </Container>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default AddPanel;
