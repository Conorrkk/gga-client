import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import PlayerShow from "./PlayerShow";
import { getPlayers } from "../api";

function PlayerList({ teamId, matchId }) {
  // state to store all loaded players
  const [loadedPlayers, setLoadedPlayers] = useState(null);

  // gets all players based on team associated with this match & sets them as loaded players
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

  // when a player is selected remove them from list of players displayed for selection
  const handleSelect = (playerId) => {
    const updatedPlayers = loadedPlayers.filter(
      (item) => item._id !== playerId
    );
    setLoadedPlayers(updatedPlayers);
  };

  // give time to set loaded players state
  if (loadedPlayers === null) {
    return <div> Buffer to load players... </div>;
  }

  return (
    <div>
      <Row>
        {loadedPlayers.map((player) => (
          <Col className="mx-2 my-2" key={player._id} sm={3} md={3} lg={3}>
            <PlayerShow
              player={player}
              matchId={matchId}
              onSelect={handleSelect}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PlayerList;
