import { Button } from "react-bootstrap";

function MatchShow({ match, onDelete }) {
  const handleClick = () => {
    onDelete(match._id);
  };

  return (
    <div>
      <div>
        {" "}
        {match.team_1.team_name}
        {match.team_2.team_name}
        <Button variant="outline-success" onClick={handleClick}>
          Delete
        </Button>

      </div>
    </div>
  );
}

export default MatchShow;
