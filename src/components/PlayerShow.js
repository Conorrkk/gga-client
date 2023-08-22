import { Form, Card, Button } from "react-bootstrap";
import { updatePanel } from "../api";

function PlayerShow({ player, matchId, onSelect }) {
  // when user clicks add player update match panel and pass id to onSelect to remove player from selection pool
  const handleSubmit = (event) => {
    event.preventDefault();
    const playerId = player._id;
    updatePanel(matchId, playerId);
    onSelect(playerId);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="player-card">
        <Card.Body>
          <Card.Title>{player.playerName}</Card.Title>
          <Card.Text>{player.playerPosition}</Card.Text>
          <Button variant="success" type="submit">
            Add player
          </Button>
        </Card.Body>
      </Card>
    </Form>
  );
}

export default PlayerShow;
