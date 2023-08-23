import { useState, useEffect } from "react";
import { getTeamById, getTotalPoints, getTotalGoals } from "../api";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import PlayerOverview from "./PlayerOverview";
import { useNavigate } from "react-router-dom";
import { FaChartBar } from "react-icons/fa";

function ShowOverview({ match, loadedPlayers }) {
  // state to hold match team
  const [team, setTeam] = useState("");
  // state for totals and users scoreline
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalGoals, setTotalGoals] = useState(0);
  const [totalWides, setTotalWides] = useState(0);
  const [userGoals, setUserGoals] = useState(0);
  const [userPoints, setUserPoints] = useState(0);

  // opposing team name
  const oppositionName = match.teams.oppositionTeam;

  // matchId for nav
  const matchId = match._id;

  // for nav
  const navigate = useNavigate();

  // mapping through all players in the array and generating a playerOverview card for each one
  const playerStatsCards = loadedPlayers?.map((player) => (
    <Col key={player._id} sm={3} md={3} lg={3}>
      <PlayerOverview player={player} match={match} />
    </Col>
  ));

  // adds up the different stats stored in db to generate totals
  useEffect(() => {
    const calculateTotals = () => {
      let totalPoints = 0;
      let totalGoals = 0;
      let totalWides = 0;
      match.teams.players.forEach((player) => {
        totalPoints += player.stats.point_from_play;
        totalGoals += player.stats.goal_from_play;
        totalWides += player.stats.wide;
      });
      // setting the totals as state
      setTotalPoints(totalPoints);
      setTotalGoals(totalGoals);
      setTotalWides(totalWides);
    };
    calculateTotals();
  }, [match]);

  // loads the user's team
  useEffect(() => {
    const getTeam = async () => {
      try {
        const teamId = match.teams.teamId;
        const response = await getTeamById(teamId);
        // sets the user's team as state
        setTeam(response);
      } catch (error) {
        console.error("Error getting team name:", error);
      }
    };
    getTeam();
  }, [match]);

  // gets the total scores for the user's team
  useEffect(() => {
    const fetchUserScores = async () => {
      const goalScored = await getTotalGoals(matchId);
      const pointScored = await getTotalPoints(matchId);
      // sets the user's score
      setUserGoals(goalScored.totalGoals);
      setUserPoints(pointScored.totalPoints);
    };
    fetchUserScores();
  }, [matchId]);

  // when user clicks on analytics bring them to matchAnalytics page for the current matchId
  const handleClick = () => {
    navigate(`/match/analytics/${matchId}`);
  };

  return (
    <div>
      <Container fluid>
        <Card className="styled-card mx-4 mt-4">
          <Card.Header>Match Overview</Card.Header>
          <Card.Body>
            <Card.Title>
              {team.teamName} {team.teamLevel} vs {oppositionName}
            </Card.Title>
            <Card.Text>
              Final Score:<br></br> {userGoals}-{userPoints} :{" "}
              {match.goalAgainst}-{match.pointAgainst}
              <br></br>
              Total Points Scored: {totalPoints}
              <br></br>
              Total Goals Scored: {totalGoals}
              <br></br>
              Total Wides: {totalWides}
              <br></br>
            </Card.Text>
            <Button
              className="styled-button"
              variant="outline-primary"
              onClick={handleClick}
            >
              <FaChartBar />
            </Button>
          </Card.Body>
        </Card>
        <Card className=" styled-card mx-4 my-4">
          <Card.Header>Player Overview</Card.Header>
          <Row>{playerStatsCards}</Row>
        </Card>
      </Container>
    </div>
  );
}

export default ShowOverview;
