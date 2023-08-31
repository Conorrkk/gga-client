import { useEffect, useState } from "react";
import { getPlayers } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Card, Row, Container, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import PlayerCard from "../components/PlayerCard";
import { FaRegPlusSquare } from "react-icons/fa";

import Footer from "../components/Footer";

function ViewPlayers() {
  // state to store an array of players
  const [players, setPlayers] = useState([]);
  // get the team id from url params
  const { teamId } = useParams();

  // for nav
  const navigate = useNavigate();

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

  // brings to create match page when clicked
  const handleNewMatch = () => {
    navigate("/createMatch");
  };

  return (
    <div>
      <NavBar></NavBar>
      <Container fluid className="main-container">
        <Row>
          <Col
            sm={{ span: 4, offset: 2 }}
            md={{ span: 4, offset: 2 }}
            lg={{ span: 4, offset: 2 }}
            xl={{ span: 4, offset: 2 }}
            className="mx-4 my-4"
          >
            <Card className="styled-card">
              <Card.Body>
                <Card.Title>Your panel</Card.Title>
                <Card.Text>
                  Click on the analysis to view each player's analytics
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col
            sm={{ span: 4 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 4 }}
            className="mx-4 my-4"
          >
            <Card className="styled-card">
              <Card.Body>
                <Row>
                  <Col
                    sm={{ span: 8 }}
                    md={{ span: 8 }}
                    lg={{ span: 8 }}
                    xl={{ span: 8 }}
                  >
                    <Card.Title>New match</Card.Title>
                    <Card.Text>
                      Create a new match and start recording stats
                    </Card.Text>
                  </Col>
                  <Col
                    className="mt-2"
                    sm={{ span: 2, offset: 2 }}
                    md={{ span: 2, offset: 2 }}
                    lg={{ span: 2, offset: 2 }}
                    xl={{ span: 2, offset: 2 }}
                  >
                    <Button
                      className="styled-button"
                      variant="outline-primary"
                      onClick={handleNewMatch}
                    >
                      <FaRegPlusSquare />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {players.map((player) => (
            <Col
              className="mx-4 my-4"
              key={player._id}
              sm={{ span: 2 }}
              md={{ span: 2 }}
              lg={{ span: 2 }}
              xl={{ span: 2 }}
            >
              <PlayerCard player={player} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default ViewPlayers;
