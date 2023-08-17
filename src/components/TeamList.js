import TeamShow from "./TeamShow";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function TeamList({ teams, onDelete }) {
  const navigate = useNavigate();

  const loadedTeams = teams?.map((team) => {
    return <TeamShow onDelete={onDelete} key={team._id} team={team} />;
  });

  const handleNewTeam = () => {
    navigate("/createTeam")
  };

  const handleNewMatch = () => {
    navigate("/createMatch")
  }
  return (
    <div>
      <Row>
        <Col xs={2} sm ={3} md={4} lg={4}>
          <Card className="mx-4 my-4">
            <Card.Body>
              <Card.Title>Teams Info</Card.Title>
              <Card.Text>
                Create new teams, browse teams, create and manage panels, and record stats for teams by creating a new match!
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mx-4 my-4">
            <Card.Body>
              <Card.Title>New Team</Card.Title>
              <Card.Text>
                Create a new team and add players to its panel
              </Card.Text>
              <Button variant="outline-success" onClick={handleNewTeam}>New Team</Button>
            </Card.Body>
          </Card>
          <Card className="mx-4 my-4">
            <Card.Body>
              <Card.Title>New Match</Card.Title>
              <Card.Text>
                Create a new match and start recording stats
              </Card.Text>
              <Button variant="outline-success" onClick={handleNewMatch}>New Match</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col >{loadedTeams}</Col>
      </Row>
    </div>
  );
}

export default TeamList;
