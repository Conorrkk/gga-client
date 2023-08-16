import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { getTeamById } from "../api";
import { Col, Container } from "react-bootstrap";
import PlayerOverview from "./PlayerOverview";

function ShowOverview({ match, loadedPlayers }) {
  const [teamName, setTeamName] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalGoals, setTotalGoals] = useState(0);
  const [totalWides, setTotalWides] = useState(0);
  const oppositionName = match.teams.oppositionTeam;
  const scoreFor = match.goalFor + ":" + match.pointFor;
  const scoreAgainst = match.goalAgainst + ":" + match.pointAgainst;

  const playerStatsCards = loadedPlayers?.map((player) => (
    <Col key={player._id} sm={4} md={4} lg={4}>
      <PlayerOverview player={player} match={match} />
    </Col>
  ));

  // loads the different stat totals
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

  // loads the user's team name
  useEffect(() => {
    const getTeamName = async () => {
      try {
        const teamId = match.teams.teamId;
        const response = await getTeamById(teamId);
        setTeamName(response);
      } catch (error) {
        console.error("Error getting team name:", error);
      }
    };
    getTeamName();
  }, [match]);

  return (
    <div>
      <Container fluid>
        <Card className="mx-4 mt-4">
          <Card.Header>Match Overview</Card.Header>
          <Card.Body>
            <Card.Title>
              {teamName} vs {oppositionName}
            </Card.Title>
            <Card.Text>
              {/* Score: {scoreFor} - {scoreAgainst}<br></br> */}
              Score: 3:4 - 1:6<br></br>
              Total Points Scored: {totalPoints}<br></br> 
              Total Goals Scored: {totalGoals}<br></br>
              Total Wides: {totalWides}<br></br>
              {/* Total goals: {totalPoints} */}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="mx-4 mt-4">
        <Card.Header>Players</Card.Header>
        {playerStatsCards}
        </Card>
      </Container>
    </div>
  );
}

export default ShowOverview;
