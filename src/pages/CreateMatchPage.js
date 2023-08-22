import React, { useState, useEffect, useContext } from "react";
import { getTeams, postMatch } from "../api";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CurrentMatchContext from "../context/CurrentMatchProvider";
import NavBar from "../components/NavBar";
// import Footer from "../components/Footer";

function CreateMatchPage() {
  // array of users teams
  const [usersTeams, setUsersTeams] = useState([]);
  // current team
  const [team, setTeam] = useState("");
  // string of opponent name to go in db
  const [opponent, setOpponent] = useState("");
  // for setting the context to the match being created
  const [currentMatch, setCurrentMatch] = useContext(CurrentMatchContext);

  // for nav
  const navigate = useNavigate();

  // gets the users teams and sets them as state
  useEffect(() => {
    getTeams()
      .then((response) => {
        // if there is a response and its an array then we set the usersTeams array
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

  // when user selects a team set this team as the current team state
  const handleTeamChange = (event) => {
    const selTeamId = event.target.value;
    const teamToSelect = usersTeams.find((team) => team._id === selTeamId);
    setTeam(teamToSelect);
  };

  // when user changes the opposing teams name update the opponent state to this new value
  const handleChangeOpponent = (event) => {
    setOpponent(event.target.value);
  };

  // when user clicks select panel, create match in db & navigate to choose panel page
  const handleSubmit = (event) => {
    event.preventDefault();
    const match = {
      team,
      opponent,
    };
    postMatch(match)
      .then((response) => {
        // for setting current match so that stats can be recorded
        setCurrentMatch(response);
        navigate(`/match/${response._id}/team/${team._id}`);
      })
      .catch((error) => {
        console.error("Error creating match:", error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="login d-flex justify-content-center align-items-center vh-100 bg-white">
        <div className="form_container p-5 rounded bg-white border border-dark border-2">
          <Form onSubmit={handleSubmit}>
            <div className="mx-2 my-2">
              <Form.Group className="mb-2" controlId="team">
                <Form.Label>Choose your team</Form.Label>
                <Form.Select
                  value={team ? team._id : ""}
                  onChange={handleTeamChange}
                >
                  <option value="">Select team</option>
                  {usersTeams.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.teamName} {team.teamLevel} Team
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
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
              {/* <Link to={`/chooseMatchPanel/${team._id}`}>
                <Button variant="outline-success" type="submit">
                  Select panel
                </Button>
              </Link> */}
              <Button variant="outline-success" type="submit">
                Select panel
              </Button>
            </div>
          </Form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default CreateMatchPage;
