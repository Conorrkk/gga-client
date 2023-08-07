import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { addGoal, addPoint, addWide } from "../api";
import CurrentMatchContext from "../context/CurrentMatchProvider";

function RecordPlayerShow({ player }) {
  // get the global match context and use it as currentMatch
  const [currentMatch] = useContext(CurrentMatchContext);

  // getting players id from player object
  const playerId = player._id;

  //getting match id from context
  const matchId = currentMatch._id;

  const handleGoal = () => {
    addGoal(playerId, matchId);
  };

  const handlePoint = () => {
    addPoint(playerId, matchId);
  };

  const handleWide = () => {
    addWide(playerId, matchId);
  };

  return (
    <div>
      <Card style={{ width: "18rem" }} className="mb-4">
        <Card.Body>
          <Card.Title>{player.playerName}</Card.Title>
          <Card.Text>{player.playerPosition}</Card.Text>
          <Button className="me-2" variant="success" onClick={handleGoal}>
            Goal
          </Button>
          <Button className="me-2" variant="success" onClick={handlePoint}>
            Point
          </Button>
          <Button variant="success" onClick={handleWide}>
            Wide
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecordPlayerShow;
