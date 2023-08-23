import React, { useRef, useEffect, useState } from "react";
import { Form, Button, Col, Card, Container } from "react-bootstrap";
import { getUserClub, postTeam } from "../api";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
// import Footer from "../components/Footer";

function CreateTeam() {
  const errRef = useRef();
  // stores users club name
  const [userClub, setUserClub] = useState(null);
  // stores the level the users team plays at - default is "Senior"
  const [teamLevel, setTeamLevel] = useState("Senior");
  // state for the current error message
  const [errMsg, setErrMsg] = useState("");
  // for nav
  const navigate = useNavigate();

  // get and set the users club
  useEffect(() => {
    getUserClub()
      .then((club) => setUserClub(club))
      .catch((error) => {
        console.error("Error fetching user club:", error);
      });
  }, []);

  // set the error message
  useEffect(() => {
    setErrMsg("");
  }, [userClub, teamLevel]);

  // going to use this to populate the team level selection
  const teamLevels = [
    {
      label: "Senior",
      value: "Senior",
    },
    {
      label: "u20s",
      value: "u20s",
    },
    {
      label: "Minor",
      value: "Minor",
    },
  ];

  // letting user choose which level the team will play at (senior, minor, u20)
  const handleLevelChange = (event) => {
    setTeamLevel(event.target.value);
  };

  // create a new team
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const teamData = {
        club: userClub,
        teamLevel: teamLevel,
      };
      await postTeam(teamData);
      setTeamLevel("Senior");
      navigate("/teams");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("You already have a team at this level. Delete it to create a new one");
      } else {
        setErrMsg("Unauthorised");
      }
    }
  };

  // buffer
  if (userClub === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <NavBar />
      {/* <Footer /> */}
      <Container fluid>
   
        <Card.Title ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </Card.Title>

        <Col
          sm={{ span: 6, offset: 3 }}
          md={{ span: 6, offset: 3 }}
          lg={{ span: 6, offset: 3 }}
          xl={{ span: 6, offset: 3 }}
        >
          <Card className="styled-card" style={{ marginTop: "10vh" }}>
            <Card.Body>
              <Card.Title>Create Team</Card.Title>
              <Card.Text>
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    className="mb-3"
                    controlId="createTeamForm.ControlInput1"
                  >
                    <Form.Label>Club</Form.Label>
                    <Form.Control
                      type="text"
                      value={userClub}
                      autoComplete=""
                      disabled
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="createTeamForm.ControlSelect1"
                  >
                    <Form.Label>Level</Form.Label>
                    <Form.Select value={teamLevel} onChange={handleLevelChange}>
                      {teamLevels.map((teamLevel) => (
                        <option key={teamLevel.value} value={teamLevel.value}>
                          {teamLevel.label}
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
                        Create
                      </Button>
                    </Col>
                  </div>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </div>
  );
}

export default CreateTeam;
