import { useState, useEffect } from "react";
import { Button, Col, Card, Row } from "react-bootstrap";
import { getTeamById, getTotalGoals, getTotalPoints } from "../api";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEye } from "react-icons/fa";
import "../styles.css";

function MatchShow({ match, onDelete }) {
  // the team in this match
  const [team, setTeam] = useState("");
  // users team scores in this match
  const [userGoals, setUserGoals] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  // opposing team's name
  const oppositionName = match.teams.oppositionTeam;

  // creating a new date using the date from db and reformatting it from iso
  const date = new Date(match.matchDate);
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  const configuredDate = date.toLocaleDateString(undefined, options);

  // for page nav
  const navigate = useNavigate();

  // gets the total goals for the user's team
  useEffect(() => {
    const getGoals = async () => {
      const goalScored = await getTotalGoals(match._id);
      setUserGoals(goalScored.totalGoals);
    };
    getGoals();
  }, [match._id]);

  // gets the total points for the user's team
  useEffect(() => {
    const getPoints = async () => {
      const pointScored = await getTotalPoints(match._id);
      setUserPoints(pointScored.totalPoints);
    };
    getPoints();
  }, [match]);

  // deletes a match
  const handleDelete = () => {
    onDelete(match._id);
  };

  // when user clicks on a match card go to match overview
  const handleClick = () => {
    const matchId = match._id;
    navigate(`/matchOverview/${matchId}`);
  };

  // loads user's team name
  useEffect(() => {
    const getTeam = async () => {
      try {
        const teamId = match.teams.teamId;
        const response = await getTeamById(teamId);
        setTeam(response);
      } catch (error) {
        console.error("Error getting team name:", error);
      }
    };
    getTeam();
  }, [match]);

  return (
    <Col
      sm={{ span: 8 }}
      md={{ span: 8, offset: 2 }}
      lg={{ span: 8, offset: 2 }}
    >
      <Card className="styled-card mx-4 my-4 item-hover">
        <Card.Header>{configuredDate}</Card.Header>
        <Card.Body >
          <Card.Title>
            {team && team.teamName} {team && team.teamLevel} vs {oppositionName}
          </Card.Title>
          <Card.Text>
            {userGoals}-{userPoints} : {match.goalAgainst}-{match.pointAgainst}
          </Card.Text>
          <Row>
            <Col className="d-flex justify-content-start">
              <Button
                variant="outline-dark"
                onClick={handleClick}
                className="styled-icon-button mx-1"
              >
                <FaEye />
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                variant="outline-danger"
                onClick={handleDelete}
                className="styled-icon-button mx-1"
              >
                <FaTrashAlt style={{ color: "red" }}></FaTrashAlt>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MatchShow;
