import React, { useState } from "react";
import { postMatch } from "../api";
import { Form, Button } from "react-bootstrap";


function MatchCreate({ onCreate }) {
  const [opponent, setOpponent] = useState("");

  const handleChangeOpponent = (event) => {
    setOpponent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const match = {
      opponent: opponent,
    };

    onCreate(match);

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
