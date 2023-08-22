import { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import MatchTotals from "../components/MatchTotalsChart";
import { getMatches, getTeamById } from "../api";
// import Footer from "../components/Footer";

function Dashboard() {
  // all user matches
  const [matches, setMatches] = useState();
  // state to store prev match
  const [match, setMatch] = useState();
  // state to store team of prev match
  const [team, setTeam] = useState();
  // boolean to check whether match is loaded
  const [isLoaded, setIsLoaded] = useState(false);
  // array for prev match chart stat totals
  const [prevMatchChart, setPrevMatchChart] = useState([]);
  // for nav
  const navigate = useNavigate();

  // const for stats from prev match
  const totalGoalsPlayRef = useRef(0);
  const totalPointsPlayRef = useRef(0);
  const totalWidesRef = useRef(0);
  const totalGoalsDeadRef = useRef(0);
  const totalPointsDeadRef = useRef(0);
  const totalBlocksRef = useRef(0);
  const totalCatchesRef = useRef(0);
  const totalDropsRef = useRef(0);

  // gets all the users previous matches
  useEffect(() => {
    const getPreviousMatches = async () => {
      try {
        const response = await getMatches();
        setMatches(response.matches);
      } catch (error) {
        console.error("error getting previous match:", error);
      }
    };
    getPreviousMatches();
  }, []);

  // sets the last match the user record as match state (to be displayed)
  useEffect(() => {
    const getPreviousMatch = async () => {
      try {
        if (matches && matches.length > 0) {
          const prevMatch = matches[matches.length - 1];
          setMatch(prevMatch);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Error getting previous match:", error);
      }
    };
    getPreviousMatch();
  }, [matches]);

  // loads team associated with prev match
  useEffect(() => {
    const getTeam = async () => {
      if (isLoaded) {
        try {
          const teamId = match.teams.teamId;
          const response = await getTeamById(teamId);
          setTeam(response);
        } catch (error) {
          console.error("Error getting team name:", error);
        }
      }
    };
    getTeam();
  }, [isLoaded, match]);

  // calculates match stats and sets the data to be sent to the stat total chart comp
  useEffect(() => {
    totalGoalsPlayRef.current = 0;
    totalPointsPlayRef.current = 0;
    totalWidesRef.current = 0;
    totalGoalsDeadRef.current = 0;
    totalPointsDeadRef.current = 0;
    totalBlocksRef.current = 0;
    totalCatchesRef.current = 0;
    totalDropsRef.current = 0;

    const calcMatchStats = () => {
      match.teams.players.forEach((player) => {
        totalGoalsPlayRef.current += player.stats.goal_from_play;
        totalGoalsDeadRef.current += player.stats.goal_from_dead;
        totalPointsPlayRef.current += player.stats.point_from_play;
        totalPointsDeadRef.current += player.stats.point_from_dead;
        totalWidesRef.current += player.stats.wide;
        totalBlocksRef.current += player.stats.block_hook;
        totalCatchesRef.current += player.stats.catch_made;
        totalDropsRef.current += player.stats.catch_missed;
      });
    };
    // setting data for stat total chart comp
    if (isLoaded) {
      calcMatchStats();
      const data = [
        { name: "Goals(play)", amount: totalGoalsPlayRef.current },
        { name: "Goals(dead)", amount: totalGoalsDeadRef.current },
        { name: "Points(play)", amount: totalPointsPlayRef.current },
        { name: "Points(dead)", amount: totalPointsDeadRef.current },
        { name: "Wides", amount: totalWidesRef.current },
        { name: "Blocks", amount: totalBlocksRef.current },
        { name: "Catches", amount: totalCatchesRef.current },
        { name: "Drops", amount: totalDropsRef.current },
      ];
      setPrevMatchChart(data);
    }
  }, [isLoaded, match]);

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
    <div className="dashboard">
      <NavBar />
      <Container className="mt-5" fluid>
        <Row className="my-5">
          <Col  sm={{ span: 4, offset: 1 }}
            md={{ span: 4, offset: 1 }}
            lg={{ span: 4, offset: 1 }}
            xl={{ span: 4, offset: 1 }}>
            <Card.Title className="styled-title d-flex justify-content-left">Welcome back!</Card.Title>
            <Card.Header className="styled-header d-flex justify-content-left">
              Pick up where you left off - create a match by clicking below or scroll
              down and view your last recorded match
            </Card.Header>
          </Col>
        </Row>
        <Row>
          <Col
            sm={{ span: 5, offset: 1 }}
            md={{ span: 5, offset: 1 }}
            lg={{ span: 5, offset: 1 }}
            xl={{ span: 5, offset: 1 }}
          >
            <Card className="styled-card">
              <Card.Body>
                <Card.Title>Create Matches</Card.Title>
                <Card.Text>
                  Create matches and record stats. We'll generate graphical analytics based on these.
                </Card.Text>
                <Button
                  className="styled-button"
                  variant="outline-primary"
                  onClick={handleCreateMatch}
                >
                  New Match
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col
            sm={{ span: 5 }}
            md={{ span: 5 }}
            lg={{ span: 5 }}
            xl={{ span: 5 }}
          >
            <Card className="styled-card">
              <Card.Body>
                <Card.Title>Teams</Card.Title>
                <Card.Text>
                  Create new teams, browse teams, manage panels, and analyse
                  individual an players performances
                </Card.Text>
                <Button
                  className="styled-button"
                  variant="outline-primary"
                  onClick={handleTeams}
                >
                  Teams
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col
            className="my-5"
            sm={{ span: 7, offset: 1 }}
            md={{ span: 7, offset: 1 }}
            lg={{ span: 7, offset: 1 }}
            xl={{ span: 7, offset: 1 }}
          >
            <Card className="styled-card">
              <Card.Title className="d-flex justify-content-center mx-1 my-1">
                Previous Match
              </Card.Title>
              <Card.Header
                className="d-flex justify-content-center mx-1 my-1"
                style={{ background: "white" }}
              >
                {team && team.teamName} {team && team.teamLevel} vs.{" "}
                {match && match.teams.oppositionTeam}
              </Card.Header>
              <MatchTotals data={prevMatchChart} />
            </Card>
          </Col>

          <Col
            className="mt-5"
            sm={{ span: 3 }}
            md={{ span: 3 }}
            lg={{ span: 3 }}
            xl={{ span: 3 }}
          >
            <Card className="styled-card">
              <Card.Body>
                <Card.Title>Match History</Card.Title>
                <Card.Text>
                  Search through your match history to see the overview of past
                  matches and to see your match analytics breakdown, including
                  stat totals and player performances.
                </Card.Text>
                <Button
                  className="styled-button"
                  variant="outline-primary"
                  onClick={handleHistory}
                >
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
