import { useContext, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { addGoal, addPoint, addWide } from "../api";
import CurrentMatchContext from "../context/CurrentMatchProvider";
import "../styles.css";
import { useDrop } from "react-dnd";

function RecordPlayerShow({ player }) {
  // get the global match context and use it as currentMatch
  const [currentMatch] = useContext(CurrentMatchContext);

  const [goals, setGoals] = useState(0);
  const [points, setPoints] = useState(0);
  const [wides, setWides] = useState(0);

  var currentGoals = 0;
  var currentPoints = 0;
  var currentWides = 0;

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

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "button",
    drop: (item) => addStatToPlayer(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addStatToPlayer = (item) => {
    // post to backend and add stat
    switch(item.id) {
      case 1:
        currentGoals = currentGoals+1;
        setGoals(currentGoals);
        handleGoal();
        break;
      case 2:
        currentPoints = currentPoints+1;
        setPoints(currentPoints);
        handlePoint()
        break;
      case 3: 
        currentWides = currentWides+1;
        setWides(currentWides);
        handleWide();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={drop}>
      <Card style={{ width: "18rem" }} className="player-card mb-4">
        <Card.Body>
          <Card.Text>{player.playerPosition}</Card.Text>
          <Card.Title>{player.playerName}</Card.Title>
          {goals} : {points} (Wides: {wides})
          {/* <Button className="me-2" variant="success" onClick={handleGoal}>
            {goals} Goal
          </Button>
          <Button className="me-2" variant="success" onClick={handlePoint}>
            Point
          </Button>
          <Button variant="success" onClick={handleWide}>
            Wide
          </Button> */}
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecordPlayerShow;
