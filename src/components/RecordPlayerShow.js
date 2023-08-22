import { useContext, useState } from "react";
import { Accordion } from "react-bootstrap";
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
import { useDrop } from "react-dnd";
import "../styles.css";
import CurrentMatchContext from "../context/CurrentMatchProvider";

function RecordPlayerShow({ player, onGoalScored, onPointScored }) {
  // get the global match context and use it as currentMatch
  const [currentMatch] = useContext(CurrentMatchContext);
  // state for displaying all player stats
  const [goalsPlay, setGoalsPlay] = useState(0);
  const [goalsDead, setGoalsDead] = useState(0);
  const [pointsPlay, setPointsPlay] = useState(0);
  const [pointsDead, setPointsDead] = useState(0);
  const [wides, setWides] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [catches, setCatches] = useState(0);
  const [ballDrops, setBallDrops] = useState(0);

  // initialising current stat vars
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

  // adds a goal from play to db
  const handleGoalPlay = () => {
    addGoalPlay(playerId, matchId)
      .then(() => {
        // update scoreline
        onGoalScored();
      })
      .catch((error) => {
        console.error("Error adding goal:", error);
      });
  };

  // adds a point from play to db
  const handlePointPlay = () => {
    addPointPlay(playerId, matchId)
      .then(() => {
        // update scoreline
        onPointScored();
      })
      .catch((error) => {
        console.error("Error adding point:", error);
      });
  };

  // adds a goal from dead to db
  const handleGoalDead = () => {
    addGoalDead(playerId, matchId)
      .then(() => {
        // update scoreline
        onGoalScored();
      })
      .catch((error) => {
        console.error("Error adding goal:", error);
      });
  };

  // adds a point from dead to db
  const handlePointDead = () => {
    addPointDead(playerId, matchId)
      .then(() => {
        // update scoreline
        onPointScored();
      })
      .catch((error) => {
        console.error("Error adding point:", error);
      });
  };

  // add wide to db
  const handleWide = () => {
    addWide(playerId, matchId);
  };

  // add block to db
  const handleBlock = () => {
    addBlock(playerId, matchId);
  };

  // add catch to db
  const handleCatches = () => {
    addCatch(playerId, matchId);
  };

  // add catch drop to db
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

  // we can use a swtich tocheck which stat(item) is going to be recorded
  const addStatToPlayer = (item) => {
    // call function to post stat to backend and add stat to current value
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
      <Accordion ref={drop} className="player-accordion mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {player.playerName}
            <br></br>
            {player.playerPosition}
          </Accordion.Header>
          <Accordion.Body>
            Play: {goalsPlay} : {pointsPlay}
            <br></br>
            Dead: {goalsDead} : {pointsDead}
            <br></br>
            Wides: {wides}
            <br></br>
            catch/drop: {catches}-{ballDrops}
            <br></br>
            blocks: {blocks}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default RecordPlayerShow;
