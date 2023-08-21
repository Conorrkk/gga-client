import { useState, useEffect } from "react";
import { Button, Col, Card } from "react-bootstrap";
import { getTeamById, getTotalGoals, getTotalPoints } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function MatchShow({ match, onDelete }) {
  const [team, setTeam] = useState("");
  const [userGoals, setUserGoals] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const oppositionName = match.teams.oppositionTeam;
  const date = new Date(match.matchDate);

  const options = { day: "numeric", month: "numeric", year: "numeric" };

  const configuredDate = date.toLocaleDateString(undefined, options);

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
        console.log(response);
      } catch (error) {
        console.error("Error getting team name:", error);
      }
    };
    getTeam();
  }, [match]);
  console.log(match);
  return (
    <Col
      sm={{ span: 6 }}
      md={{ span: 8, offset: 2 }}
      lg={{ span: 8, offset: 2 }}
    >
      <Card className="mx-4 my-4 item-hover">
        <Card.Header onClick={handleClick}>{configuredDate}</Card.Header>
        <Card.Body>
          <Card.Title onClick={handleClick}>
            {team.teamName} {team.teamLevel} vs {oppositionName}
          </Card.Title>
          <Card.Text>
            {userGoals}-{userPoints} : {match.goalAgainst}-{match.pointAgainst}
          </Card.Text>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MatchShow;
