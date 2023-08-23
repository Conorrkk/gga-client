import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import PlayerShow from "./PlayerShow";
import { getPlayers } from "../api";

function PlayerList({ teamId, matchId }) {
  // state to store all loaded players
  const [loadedPlayers, setLoadedPlayers] = useState(null);
  // state to keep track of how many players are in the match already
  const [matchPanelCount, setMatchPanelCount] = useState(0);
  // const for max players in one match
  const maxPanelSize = 15;
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
    setMatchPanelCount(matchPanelCount + 1);
  };

  // give time to set loaded players state
  if (loadedPlayers === null) {
    return <div> Buffer to load players... </div>;
  }

  return (
    <div>
      <Row>
        <Col
          className="mx-4 my-4"
          sm={{ span: 6 }}
          md={{ span: 6 }}
          lg={{ span: 6 }}
          xl={{ span: 6 }}
        >
          <Card className="styled-card">
            <Card.Header as="h5">Create your match panel</Card.Header>
            <Card.Body>
              <Card.Title>Add players...</Card.Title>
              <Card.Text>
                Add up to 15 players to make up your match day team
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mx-2">
        {loadedPlayers.map((player) => (
          <Col
            className="mx-2 my-2"
            sm={{ span: 2 }}
            md={{ span: 2 }}
            lg={{ span: 2 }}
            xl={{ span: 2 }}
            key={player._id}
          >
            <PlayerShow
              player={player}
              matchId={matchId}
              onSelect={handleSelect}
              matchPanelCount={matchPanelCount}
              maxPanelSize={maxPanelSize}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PlayerList;
