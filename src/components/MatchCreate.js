import React, { useState, useRef, useEffect } from "react";
import { postMatch } from "../api";
import { Form, Button } from "react-bootstrap";
import { getTeams } from "../api";

function MatchCreate() {
  const errRef = useRef();

  const [usersTeams, setUsersTeams] = useState([]);
  // want to have a team object here but unsure, maybe an array would allow this?
  const [team, setTeam] = useState("");
  // thinking about getting and setting an array of players for the panel based on the id of the team object above
  const [panel, setPanel] = useState([]);
  // string of opponent name to go in db
  const [opponent, setOpponent] = useState("");
  // provides error message state
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getTeams()
      .then((response) => {
        console.log(response);
        if (response && Array.isArray(response.teams)) {
          setUsersTeams(response.teams);
        } else {
          console.log("Issue with getTeams() response", response);
        }
      })
      .catch((error) => {
        console.error("Error getting users teams:", error);
      });
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [usersTeams, team, panel, opponent]);

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };

  // const handleChangePanel = (event) => {
  //   setPanel(event.target.value);
  // };

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
    <div>
      <div className="login d-flex justify-content-center align-items-center vh-100 bg-white">
        <div className="form_container p-5 rounded bg-white border border-dark border-2">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Select value={team} onChange={handleTeamChange}>
              {usersTeams.map((team) => (
                <option key={team._id} value={team.team_id}>
                  {team.teamName} {team.teamLevel} Team
                </option>
              ))}
            </Form.Select>

            <div className="mx-2 my-2">
              <Form.Group className="mb-2" controlId="opponentName">
                <Form.Label>Opposing team</Form.Label>
                <Form.Control
                  value={opponent}
                  onChange={handleChangeOpponent}
                  type="text"
                  autoComplete="off"
                  placeholder="Team Name"
                />
              </Form.Group>
            </div>
            <div className="mx-2 my-2">
              <Button variant="outline-success" type="submit">
                Create Match
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default MatchCreate;
