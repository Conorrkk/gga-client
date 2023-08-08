import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";

function PlayerOverview({ player, match }) {
    // const [playerStats, setPlayerStats] = useState([]);
    console.log(player)

    const matchPlayer = match.teams.players.filter((p) => {
        return p.playerId === player._id;
    });

    console.log(matchPlayer)

    const playerStats = matchPlayer[0].stats;
    console.log(playerStats);

    

    return <div>
        <Card style={{ width: "18rem" }} className="mx-2 my-2">
        <Card.Body>
          <Card.Title>{player.playerName}</Card.Title>
          <Card.Text>Position: {player.playerPosition}<br></br>
          Points scored: {playerStats.point_from_play}<br></br>
          Goals scored: {playerStats.goals_from_play}<br></br>
          Wides: {playerStats.wide}<br></br>
          </Card.Text>
          
        </Card.Body>
      </Card>
    </div>
}

export default PlayerOverview