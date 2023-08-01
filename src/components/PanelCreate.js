import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { postPlayer } from "../api";

function PanelCreate({ teamId }) {
  const errRef = useRef();

  const [name, setName] = useState("");
  const [position, setPosition] = useState("Goalkeeper");
  const [errMsg, setErrMsg] = useState("");

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const playerData = {
        playerName: name,
        playerPosition: position,
        teamId: teamId
      }
      await postPlayer(playerData)
      setPosition("Goalkeeper")
      setName("")
    } catch (err){
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
  }

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
    <div className="login d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="form_container p-5 rounded bg-white border border-dark border-2">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>
        <Form onSubmit={handleSubmit}>
          <h3 className="text-center">Add Players</h3>
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
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="createPanelForm.ControlSelect1"
          >
            <Form.Label>Position</Form.Label>
            <Form.Select value={position} onChange={handlePositionChange}>
              {positions.map((position) => (
                <option key={position.value} value={position.value}>
                  {position.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-grid mb-3">
            <Button variant="success" type="submit">
              Add player
            </Button>
          </div>
        </Form>
        <Link to="/teams">
          <Button variant="primary">Finished</Button>
        </Link>
      </div>
    </div>
  );
}

export default PanelCreate;
