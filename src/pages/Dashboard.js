import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
// import Footer from "../components/Footer";

function Dashboard() {
  // for nav
  const navigate = useNavigate();

  // on clicking new match nav to createMatch page
  const handleCreateMatch = () => {
    navigate("/createMatch");
  };

  // on clicking teams nav to teams page
  const handleTeams = () => {
    navigate("/teams");
  };

  // on clicking history nav to matchHistory page
  const handleHistory = () => {
    navigate("/matchHistory");
  };
  return (
    <div>
      <NavBar />
      <Container className="mt-4" fluid>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Create Matches</Card.Title>
                <Card.Text>
                  Create matches and record stats. We will then generate visual
                  representations in the form of graphs.
                </Card.Text>
                <Button variant="outline-primary" onClick={handleCreateMatch}>
                  New Match
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>Teams</Card.Title>
                <Card.Text>
                  Create new teams, browse teams, create and manage panels, and
                  analyse individual an players performances
                </Card.Text>
                <Button variant="outline-primary" onClick={handleTeams}>
                  Teams
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>Match History</Card.Title>
                <Card.Text>
                  Search through your match history to see the overview of past
                  matches and to see your match analytics breakdown, including
                  stat totals and player performances.
                </Card.Text>
                <Button variant="outline-primary" onClick={handleHistory}>
                  History
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}
    </div>
  );
}

export default Dashboard;
