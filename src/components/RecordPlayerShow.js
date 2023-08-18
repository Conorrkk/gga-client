import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import {
  addGoalPlay,
  addPointPlay,
  addGoalDead,
  addPointDead,
  addWide,
  addBlock,
  addCatch,
  addDrop,
} from "../api";
import CurrentMatchContext from "../context/CurrentMatchProvider";
import "../styles.css";
import { useDrop } from "react-dnd";

function RecordPlayerShow({ player, onGoalScored, onPointScored }) {
  // get the global match context and use it as currentMatch
  const [currentMatch] = useContext(CurrentMatchContext);

  const [goalsPlay, setGoalsPlay] = useState(0);
  const [goalsDead, setGoalsDead] = useState(0);
  const [pointsPlay, setPointsPlay] = useState(0);
  const [pointsDead, setPointsDead] = useState(0);
  const [wides, setWides] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [catches, setCatches] = useState(0);
  const [ballDrops, setBallDrops] = useState(0);

  var currentGoalsPlay = 0;
  var currentPointsPlay = 0;
  var currentWides = 0;
  var currentGoalsDead = 0;
  var currentPointsDead = 0;
  var currentBlocks = 0;
  var currentCatches = 0;
  var currentBallDrops = 0;

  // getting players id from player object
  const playerId = player._id;

  //getting match id from context
  const matchId = currentMatch._id;

  const handleGoalPlay = () => {
    addGoalPlay(playerId, matchId)
      .then(() => {
        onGoalScored();
      })
      .catch((error) => {
        console.error("Error adding goal:", error);
      });
  };

  const handlePointPlay = () => {
    addPointPlay(playerId, matchId)
      .then(() => {
        onPointScored();
      })
      .catch((error) => {
        console.error("Error adding point:", error);
      });
  };

  const handleGoalDead = () => {
    addGoalDead(playerId, matchId)
      .then(() => {
        onGoalScored();
      })
      .catch((error) => {
        console.error("Error adding goal:", error);
      });
  };

  const handlePointDead = () => {
    addPointDead(playerId, matchId)
      .then(() => {
        onPointScored();
      })
      .catch((error) => {
        console.error("Error adding point:", error);
      });
  };

  const handleWide = () => {
    addWide(playerId, matchId);
  };

  const handleBlock = () => {
    addBlock(playerId, matchId);
  };

  const handleCatches = () => {
    addCatch(playerId, matchId);
  };

  const handleBallDrops = () => {
    addDrop(playerId, matchId);
  };

  // allows items to be dropped (these items are the stats we wish to record)
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "button",
    drop: (item) => addStatToPlayer(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // switch to check which stat(item) is going to be recorded
  const addStatToPlayer = (item) => {
    // post to backend and add stat
    switch (item.id) {
      case 1:
        currentGoalsPlay = currentGoalsPlay + 1;
        setGoalsPlay(currentGoalsPlay);
        handleGoalPlay();
        break;
      case 2:
        currentPointsPlay = currentPointsPlay + 1;
        setPointsPlay(currentPointsPlay);
        handlePointPlay();
        break;
      case 3:
        currentWides = currentWides + 1;
        setWides(currentWides);
        handleWide();
        break;
      case 4:
        currentGoalsDead = currentGoalsDead + 1;
        setGoalsDead(currentGoalsDead);
        handleGoalDead();
        break;
      case 5:
        currentPointsDead = currentPointsDead + 1;
        setPointsDead(currentPointsDead);
        handlePointDead();
        break;
      case 6:
        currentBlocks = currentBlocks + 1;
        setBlocks(currentBlocks);
        handleBlock();
        break;
      case 7:
        currentCatches = currentCatches + 1;
        setCatches(currentCatches);
        handleCatches();
        break;
      case 8:
        currentBallDrops = currentBallDrops + 1;
        setBallDrops(currentBallDrops);
        handleBallDrops();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Card ref={drop} style={{ width: "18rem" }} className="player-card mb-4">
        <Card.Body>
          <Card.Text>{player.playerPosition}</Card.Text>
          <Card.Title>{player.playerName}</Card.Title>
          Play: {goalsPlay} : {pointsPlay} <br></br>
          Dead: {goalsDead} : {pointsDead}
          <br></br>
          Wides: {wides}<br></br>
          catch/drop: {catches}-{ballDrops}
          <br></br>
          blocks: {blocks}
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecordPlayerShow;
