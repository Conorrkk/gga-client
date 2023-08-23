import { Form, Card, Button } from "react-bootstrap";
import { updatePanel } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlayerShow({
  player,
  matchId,
  onSelect,
  matchPanelCount,
  maxPanelSize,
}) {
  // success and failure pop up notifications
  const notifySuccess = () => toast(`${player.playerName} added successfully!`);
  const notifyFailure = () =>
    toast(
      `Couldn't add ${player.playerName}. You can have up to 15 players in a match`
    );

  // when user clicks add player update match panel and pass id to onSelect to remove player from selection pool
  const handleSubmit = (event) => {
    event.preventDefault();
    const playerId = player._id;
    try {
      updatePanel(matchId, playerId);
      notifySuccess();
      onSelect(playerId);
    } catch (error) {
      notifyFailure();
      console.log(error);
    }
  };
  // for checking if add players should be disabled
  const isButtonDisabled = (matchPanelCount >= maxPanelSize);

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="player-card">
        <Card.Body>
          <Card.Title>{player.playerName}</Card.Title>
          <Card.Text>{player.playerPosition}</Card.Text>
          <Button variant="success" type="submit" disabled={isButtonDisabled}>
            Add player
          </Button>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Form>
  );
}

export default PlayerShow;
