import TeamShow from "./TeamShow";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";

function TeamList({ teams, onDelete }) {
  // for nav
  const navigate = useNavigate();

  // mapping through teams array and rendering a teamshow component to display the team
  const loadedTeams = teams?.map((team) => {
    return <TeamShow onDelete={onDelete} key={team._id} team={team} />;
  });

  // when a user clicks on new team navigate to createTeam
  const handleNewTeam = () => {
    navigate("/createTeam");
  };

  // when a user clicks on new match navigate to createMatch
  const handleNewMatch = () => {
    navigate("/createMatch");
  };
  return (
    <div>
      <Row>
        <Col
          sm={{ span: 8, offset: 1 }}
          md={{ span: 8, offset: 1 }}
          lg={{ span: 8, offset: 1 }}
        >
          <Card className="styled-card mx-4 my-4">
            <Card.Body>
              <Card.Title>Teams Info</Card.Title>
              <Card.Text>
                Create new teams, browse teams, create and manage panels, and
                record stats for teams by creating a new match!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col
          sm={{ span: 4, offset: 1 }}
          md={{ span: 4, offset: 1 }}
          lg={{ span: 4, offset: 1 }}
        >
          <Card className="styled-card mx-4 my-4">
            <Card.Body>
              <Row>
                <Col
                  sm={{ span: 8 }}
                  md={{ span: 8 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                >
                  <Card.Title>New Team</Card.Title>
                  <Card.Text>
                    Create one team for senior, minor and u20s.
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
                    className="styled-icon-button"
                    variant="outline-primary"
                    onClick={handleNewTeam}
                  >
                    <FaRegPlusSquare />
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="styled-card mx-4 my-4">
            <Card.Body>
              <Row>
                <Col
                  sm={{ span: 8 }}
                  md={{ span: 8 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                >
                  <Card.Title>New Match</Card.Title>
                  <Card.Text>
                    Create a new match to start tracking stats.
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
                    className="styled-icon-button"
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
        <Col>{loadedTeams}</Col>
      </Row>
    </div>
  );
}

export default TeamList;
