import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <div>
      <NavBar />
      <section id="Dashboard" className="Dashboard Dashboard-block">
        <Container className="mt-4" fluid>
          <Row>
            <Col></Col>
            <Col sm={4}>
              {" "}
              <Card>
                <Card.Body>
                  <Card.Title>Create Matches</Card.Title>
                  <Card.Text>
                    Create matches and record stats. We will then generate
                    visual representations in the form of graphs.
                  </Card.Text>
                  <Link to="/createMatch">
                    <Button variant="outline-primary">
                      New Match <i className="fas fa-chevron-right"></i>
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
}

export default Dashboard;
