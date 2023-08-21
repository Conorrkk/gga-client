import { useState, useEffect } from "react";
import { getTeamById, getTotalPoints, getTotalGoals } from "../api";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import PlayerOverview from "./PlayerOverview";
import { useNavigate } from "react-router-dom";

function ShowOverview({ match, loadedPlayers }) {
  const [team, setTeam] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalGoals, setTotalGoals] = useState(0);
  const [totalWides, setTotalWides] = useState(0);
  const [userGoals, setUserGoals] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const oppositionName = match.teams.oppositionTeam;

  const matchId = match._id;

  const navigate = useNavigate();

  const playerStatsCards = loadedPlayers?.map((player) => (
    <Col key={player._id} sm={3} md={3} lg={3}>
      <PlayerOverview player={player} match={match} />
    </Col>
  ));

  // adds up the different stats stored in db to display their totals
  useEffect(() => {
    const calculateTotals = () => {
      let totalPoints = 0;
      let totalGoals = 0;
      let totalWides = 0;
      match.teams.players.forEach((player) => {
        totalPoints += player.stats.point_from_play;
        totalGoals += player.stats.goal_from_play;
        totalWides += player.stats.wide;
      });
      setTotalPoints(totalPoints);
      setTotalGoals(totalGoals);
      setTotalWides(totalWides);
    };
    calculateTotals();
  }, [match]);

  // loads the user's team 
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

  // gets the total goals for the user's team
  useEffect(() => {
    const getGoals = async () => {
      const goalScored = await getTotalGoals(matchId);
      setUserGoals(goalScored.totalGoals);
    };
    getGoals();
  }, [matchId]);

  // gets the total points for the user's team
  useEffect(() => {
    const getPoints = async () => {
      const pointScored = await getTotalPoints(matchId);
      setUserPoints(pointScored.totalPoints);
    };
    getPoints();
  }, [matchId]);

  const handleClick = () => {
    navigate(`/match/analytics/${matchId}`)
  }

  return (
    <div>
      <Container fluid>
        <Card className="mx-4 mt-4">
          <Card.Header>Match Overview</Card.Header>
          <Card.Body>
            <Card.Title>
              {team.teamName} {team.teamLevel} vs {oppositionName}
            </Card.Title>
            <Card.Text>
              Final Score:<br></br> {userGoals}-{userPoints} :{" "}
              {match.goalAgainst}-{match.pointAgainst}
              <br></br>
              Total Points Scored: {totalPoints}
              <br></br>
              Total Goals Scored: {totalGoals}
              <br></br>
              Total Wides: {totalWides}
              <br></br>
            </Card.Text>
            <Button onClick={handleClick}>
              Analytics
            </Button>
          </Card.Body>
        </Card>
        <Card className="mx-4 my-4">
          <Card.Header>Player Overview</Card.Header>
          <Row>{playerStatsCards}</Row>
        </Card>
      </Container>
    </div>
  );
}

export default ShowOverview;
