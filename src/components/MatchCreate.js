import React, { useState, useRef, useEffect } from "react";
import { postMatch } from "../api";
import { Form, Button } from "react-bootstrap";

function MatchCreate({}) {
  const errRef = useRef();

  // want to have a team object here but unsure, maybe an array would allow this?
  const [team, setTeam] = useState([]);
  // thinking about getting and setting an array of players for the panel based on the id of the team object above
  const [panel, setPanel] = useState([]);
  // string of opponent name to go in db
  const [opponent, setOpponent] = useState("");

  const handleChangeTeam = (event) => {
    setTeam(event.target.value);
  };

  const handleChangePanel = (event) => {
    setPanel(event.target.value)
  };

  const handleChangeOpponent = (event) => {
    setOpponent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // might have to change this as in the database the players are an array stored within the team object
    // the same goes for opponent
    const match = {
      team,
      panel,
      opponent,
    };

    postMatch(match)
      .then((response) => {
        setOpponent("");
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  return (
    
    <Form onSubmit={handleSubmit}>
      <div className="mx-2 my-2">
        <Form.Group controlId="opponentName">
          <Form.Label>
            <h2>Opponent name</h2>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Team Name"
            value={opponent}
            onChange={handleChangeOpponent}
          />
        </Form.Group>
      </div>
      <div className="mx-2 my-2">
        <Button variant="outline-success" type="submit">Create Match</Button>
      </div>
    </Form>
  );
}

export default MatchCreate;
