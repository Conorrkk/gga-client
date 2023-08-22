import {Card, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PlayerCard({ player }) {
  // for nav
  const navigate = useNavigate();

  // gets playerId for later use in navigation
  const playerId = player._id;

  // nav to player analytics page
  const handleAnalytics = () => {
    navigate(`/player/analytics/${playerId}`);
  };

  return (
    <Card className="player-card">
      <Card.Body>
        <Card.Title>{player.playerName}</Card.Title>
        <Card.Text>{player.playerPosition}</Card.Text>
        <Button variant="outline-success" onClick={handleAnalytics}>
          Analytics
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PlayerCard;
