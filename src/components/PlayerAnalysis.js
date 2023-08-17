import { useEffect, useState } from "react";
import { getPlayerById, getTeamById, getPlayersMatches } from "../api";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PlayerAnalysis({ id }) {
  // object to store the player
  const [player, setPlayer] = useState({});
  // object to store the players team
  const [team, setTeam] = useState({});
  // array to store players matches
  const [matches, setMatches] = useState([]);

  // loads the player information and sets in in the player state
  useEffect(() => {
    const findPlayer = async () => {
      try {
        const playerData = await getPlayerById(id);
        setPlayer(playerData);
      } catch (error) {
        console.error("Error getting player:", error);
      }
    };
    findPlayer();
  }, [id]);

  // get players team
  useEffect(() => {
    const findTeam = async () => {
      try {
        const teamData = await getTeamById(player.teamId);
        setTeam(teamData);
      } catch (error) {
        console.error("Error finding team:", error);
      }
    };
    findTeam();
  }, [player]);

  useEffect(() => {
    const playersMatches = async () => {
      try {
        const matchData = await getPlayersMatches(player._id);
        console.log("matchData:", matchData);
        setMatches(matchData);
      } catch (error) {
        console.error("Error getting matches:", error);
      }
    };
    playersMatches();
  }, [player._id]);

//   const totalGoals = 0;
//   const goalCalc = matches.map((match) => {
//     key={match._id} 
//   })

  // allow player to be fetched from api and set as state
  if (!player || !team) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Row>
        <Col className="mx-1 my-1">
          <Card className="player-analytics-card">
            <Card.Body>
              <Card.Title>{player.playerName}</Card.Title>
              <Card.Text>{player.playerPosition}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mx-1 my-1">
          <Card className="player-analytics-card">
            <Card.Body>
              <Card.Title>{team.teamName}</Card.Title>
              <Card.Text>{team.teamLevel}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>Total Goals: </Row>
    </div>
  );
}

export default PlayerAnalysis;
