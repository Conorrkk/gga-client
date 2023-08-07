import { Form, Card, Button } from "react-bootstrap";
import { updatePanel } from "../api";

function PlayerShow({ player, matchId }) {
  console.log(player);
  const handleSubmit = (event) => {
    event.preventDefault();
    const playerId = player._id;
    console.log(playerId);
    updatePanel(matchId, playerId);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{player.playerName}</Card.Title>
            <Card.Text>{player.playerPosition}</Card.Text>
            <Button variant="success" type="submit">
              Add player
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
}

export default PlayerShow;
