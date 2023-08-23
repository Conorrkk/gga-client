import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

function PlayerOverview({ player, match }) {
  // returns player where playerId from match in match collection and _id in player collection are equal
  const matchPlayer = match.teams.players.filter((p) => {
    return p.playerId === player._id;
  });

  // for nav
  const navigate = useNavigate();

  // accesses the stats for this player
  const playerStats = matchPlayer[0].stats;

  // const for playerId to use for navigation
  const playerId = player._id;

  // when users clicks on player analytics button bring them to this page
  const handleClick = () => {
    navigate(`/player/analytics/${playerId}`);
  };

  return (
    <div>
      <Card className="styled-card mx-2 my-2">
        <Card.Body>
          <Card.Title>{player.playerName}</Card.Title>
          <Card.Text>
            Position: {player.playerPosition}
            <br></br>
            Goals scored: {playerStats.goal_from_play}
            <br></br>
            Points scored: {playerStats.point_from_play}
            <br></br>
            Wides: {playerStats.wide}
            <br></br>
            <Button
              className="styled-button"
              variant="outline-primary"
              onClick={handleClick}
            >
             <FaChartLine />
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PlayerOverview;
