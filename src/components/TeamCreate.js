import React, { useRef, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { getUserClub, postTeam } from "../api";
import { useNavigate } from "react-router-dom";

function TeamCreate() {
  const errRef = useRef();
  const [userClub, setUserClub] = useState(null);
  const [teamLevel, setTeamLevel] = useState("Senior");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUserClub()
      .then((club) => setUserClub(club))
      .catch((error) => {
        console.error("Error fetching user club:", error);
      });
  }, []);

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
      postTeam(teamData);
      setTeamLevel("Senior");
      navigate("/teams");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Issue with data");
      } else {
        setErrMsg("Unauthorised");
      }
    }
  };

  if (userClub === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="form_container p-5 rounded bg-white border border-dark border-2">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>
        <Form onSubmit={handleSubmit}>
          <h3 className="text-center">Create Team</h3>
          <Form.Group className="mb-3" controlId="createTeamForm.ControlInput1">
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
          <div className="d-grid">
            <Button variant="outline-success" type="submit">
              Create Team
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default TeamCreate;
