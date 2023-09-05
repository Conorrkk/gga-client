import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

function TeamShow({ team, onDelete }) {
  // for nav
  const navigate = useNavigate();

  // go to add panel page
  const handleAddPlayers = () => {
    navigate(`/addPanel/${team._id}`);
  };

  // deletes a team and matches associated
  const handleDelete = () => {
    onDelete(team._id);
  };

  // go to view players page
  const handleViewPlayers = () => {
    navigate(`/viewPlayers/${team._id}`);
  };

  return (
    <div>
      {/* <Card className="mx-4 my-4 item-hover" onClick={handleClick}> */}
      <Col sm={{ span: 7 }} md={{ span: 7 }} lg={{ span: 7 }}>
        <Card className="styled-card mx-4 my-4 item-hover">
          <Card.Body>
            <Card.Title>{team.teamName}</Card.Title>
            <Card.Text>{team.teamLevel}</Card.Text>
            <Row>
            <Col className="d-flex justify-content-start">
              <Button
                className="styled-button mx-1"
                variant="outline-primary"
                onClick={handleAddPlayers}
              >
                Add players
              </Button>
              <Button
                className="styled-button mx-1"
                variant="outline-primary"
                onClick={handleViewPlayers}
              >
                View Players
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                className="styled-icon-button mx-1"
                variant="outline-danger"
                aria-label="Delete"
                onClick={handleDelete}
              >
                <FaTrashAlt style={{color: 'red'}}></FaTrashAlt>
             
              </Button>
            </Col></Row>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}
export default TeamShow;
