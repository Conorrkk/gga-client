import { useEffect, useState } from "react";
import { getPlayers } from "../api";
import { useParams } from "react-router-dom";
import { Col, Card, Row, Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
import PlayerCard from "../components/PlayerCard";
// import Footer from "../components/Footer";

function ViewPlayers() {
  // state to store an array of players
  const [players, setPlayers] = useState([]);
  // get the team id from url params
  const { teamId } = useParams();

  // gets the players on this team and sets them as state
  useEffect(() => {
    const getPanel = async () => {
      try {
        const response = await getPlayers(teamId);
        setPlayers(response);
      } catch (error) {
        console.error("Error getting players:", error);
      }
    };
    getPanel();
  }, [teamId]);

  return (
    <div>
      <NavBar></NavBar>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
      >
        <Col
          sm={{ span: 8 }}
          md={{ span: 8 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
        >
          <Card className="styled-card mx-4 my-4">
            <Card.Body>
              <Card.Title>Your Panel</Card.Title>
              <Card.Text>
                Click on analytics to view that player performance indicators
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Container>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
      >
        <Row className="justify-content-center">
          {players.map((player) => (
            <Col
              className="mx-1 my-2 "
              key={player._id}
              sm={{ span: 3 }}
              md={{ span: 3 }}
              lg={{ span: 3 }}
              xl={{ span: 3 }}
            >
              <PlayerCard player={player} />
            </Col>
          ))}
        </Row>
      </Container>
      {/* <Footer /> */}
    </div>
  );
}

export default ViewPlayers;
