import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function TeamShow({ team, onDelete }) {
  const navigate = useNavigate();

  const handleAddPlayers = () => {
    navigate(`/addPanel/${team._id}`);
  };

  // deletes a team
  const handleDelete = () => {
    onDelete(team._id);
  };

  return (
    <div>
      {/* <Card className="mx-4 my-4 item-hover" onClick={handleClick}> */}
      <Card className="mx-4 my-4 item-hover">
        <Card.Body>
          <Card.Title>{team.teamName}</Card.Title>
          <Card.Text>{team.teamLevel}</Card.Text>
          <Button variant="outline-success" onClick={handleAddPlayers}>
            Add players
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
export default TeamShow;
