import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

function PlayerCard({ player }) {
  // for nav
  const navigate = useNavigate();

  // gets playerId for later use in navigation
  const playerId = player._id;

  // nav to player analytics page
  const handleAnalytics = () => {
    navigate(`/player/analytics/${playerId}`);
  };

  return (
    <Card className="styled-card item-hover">
      <Card.Body>
        <Row>
          <Col
            sm={{ span: 8 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <Card.Title>{player.playerName}</Card.Title>

            <Card.Text>{player.playerPosition}</Card.Text>
          </Col>
          <Col className="mt-2" md={1}>
            <Button
              className="styled-button"
              variant="outline-primary"
              onClick={handleAnalytics}
            >
              <FaChartLine />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default PlayerCard;
