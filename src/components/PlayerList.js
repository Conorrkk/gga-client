import PlayerShow from "./PlayerShow";
import { getPlayers } from "../api";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";

function PlayerList({ teamId, matchId }) {
  // state to store all loaded players
  const [loadedPlayers, setLoadedPlayers] = useState(null);

  useEffect(() => {
    const getAvailablePlayers = async () => {
      try {
        const response = await getPlayers(teamId);
        setLoadedPlayers(response);
      } catch (error) {
        console.error("Error getting available players:", error);
      }
    };

    getAvailablePlayers();
  }, [teamId]);

  const handleSelect = (playerId) => {
    const updatedPlayers = loadedPlayers.filter((item) => item._id !== playerId)
    setLoadedPlayers(updatedPlayers);
  }

  if (loadedPlayers === null) {
    return <div> trying to load players</div>;
  }

  return (
    <div>
      <Row>
        {loadedPlayers.map((player) => (
          <Col key={player._id} sm={4} md={4} lg={4}>
            <PlayerShow player={player} matchId={matchId} onSelect={handleSelect}/>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PlayerList;
