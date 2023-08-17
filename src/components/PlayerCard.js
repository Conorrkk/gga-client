import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function PlayerCard({ player }) {
  const navigate = useNavigate();
    const playerId = player._id
  // go to player analytics page
  const handleAnalytics = () => {
    navigate(`/player/analytics/${playerId}`);
  };

  return (
    <Card className="player-card">
      <Card.Body>
        <Card.Title>{player.playerName}</Card.Title>
        <Card.Text>{player.playerPosition}</Card.Text>
        <Button variant="success" onClick={handleAnalytics}>
          Analytics
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PlayerCard;
