import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { getTeamById } from "../api";

function MatchShow({ match, onDelete }) {
  const [teamName, setTeamName] = useState("");
  const oppositionName = match.teams.oppositionTeam;
  const date = new Date(match.matchDate);

  const options = { day: "numeric", month: "numeric", year: "numeric" };

  const configuredDate = date.toLocaleDateString(undefined, options);

  // deletes a match
  const handleDelete = () => {
    onDelete(match._id);
  };

  // loads user's team name
  useEffect(() => {
    const getTeamName = async () => {
      try {
        const teamId = match.teams.teamId;
        const response = await getTeamById(teamId);
        setTeamName(response);
      } catch (error) {
        console.error("Error getting team name:", error);
      }
    };
    getTeamName();
  }, [match]);

  return (
    <div>
      <div>
        <Card className="mx-4 my-4">
          <Card.Header>{configuredDate}</Card.Header>
          <Card.Body>
            <Card.Title>
              {teamName} vs {oppositionName}
            </Card.Title>
            <Card.Text>Score</Card.Text>
            <Button variant="outline-success" onClick={handleDelete}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default MatchShow;
