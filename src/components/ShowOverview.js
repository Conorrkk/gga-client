import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { getTeamById } from "../api";
import { Col, Container } from "react-bootstrap";
import PlayerOverview from "./PlayerOverview";

function ShowOverview({ match, loadedPlayers }) {
  const [teamName, setTeamName] = useState("");
  console.log(match);
  const oppositionName = match.teams.oppositionTeam;
  const scoreFor = match.goalFor + ":" + match.pointFor;
  const scoreAgainst = match.goalAgainst + ":" + match.pointAgainst;
  //   const totalPoints = match.teams.players.map((player)=>( key={player.playerId}
  //     player.stats.point_from_play
  //   ));

  const playerStatsCards = loadedPlayers?.map((player) => (
    <Col key={player._id} sm={4} md={4} lg={4}>
      <PlayerOverview player={player} match={match} />
    </Col>
  ));

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
              Total Points Scored:<br></br> 
              Total Goals Scored: <br></br>
              Total Wides:<br></br>
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
