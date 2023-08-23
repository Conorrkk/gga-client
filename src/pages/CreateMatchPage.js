import React, { useState, useEffect, useContext } from "react";
import { getTeams, postMatch } from "../api";
import { Form, Button, Col, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CurrentMatchContext from "../context/CurrentMatchProvider";
import NavBar from "../components/NavBar";
import { FaCheckSquare } from "react-icons/fa";
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
      <Container fluid>
        <Col
          sm={{ span: 6, offset: 3 }}
          md={{ span: 6, offset: 3 }}
          lg={{ span: 6, offset: 3 }}
          xl={{ span: 6, offset: 3 }}
        >
          <Card className="styled-card" style={{ marginTop: "10vh" }}>
            <Card.Header as="h5">New Match</Card.Header>
            <Card.Body>
              <Card.Text>
                <Form onSubmit={handleSubmit}>
                  <div className="mx-2 my-2">
                    <Form.Group className="mb-2" controlId="team">
                      <Form.Label>Select match team</Form.Label>
                      <Form.Select
                        value={team ? team._id : ""}
                        onChange={handleTeamChange}
                        required
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
                        pattern="[a-zA-Z0-9\s]+"
                        maxLength="60"
                        title="Only letters and numbers(max 60 chars)"
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="mx-2 my-2">
                    <Button
                      className="styled-icon-button"
                      variant="outline-primary"
                      type="submit"
                    >
                    <FaCheckSquare />
                    </Button>
                  </div>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Container>
      {/* <Footer /> */}
    </div>
  );
}

export default CreateMatchPage;
