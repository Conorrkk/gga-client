import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";

function PlayerOverview({ player, match }) {
  // returns player where playerId from match in match collection and _id in player collection are equal
    const matchPlayer = match.teams.players.filter((p) => {
        return p.playerId === player._id;
    });

    // accesses the stats for this player
    const playerStats = matchPlayer[0].stats;

    return <div>
        <Card style={{ width: "18rem" }} className="mx-2 my-2">
        <Card.Body>
          <Card.Title>{player.playerName}</Card.Title>
          <Card.Text>Position: {player.playerPosition}<br></br>
          Points scored: {playerStats.point_from_play}<br></br>
          Goals scored: {playerStats.goal_from_play}<br></br>
          Wides: {playerStats.wide}<br></br>
          </Card.Text>
          
        </Card.Body>
      </Card>
    </div>
}

export default PlayerOverview