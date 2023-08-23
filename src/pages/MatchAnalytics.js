import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Form, Row, Container } from "react-bootstrap";
import {
  getMatchById,
  getPlayerById,
  getTeamById,
  getTotalGoals,
  getTotalPoints,
} from "../api";
import NavBar from "../components/NavBar";
import MatchTotals from "../components/MatchTotalsChart";
import PerformanceChart from "../components/PerformanceChart";
import Footer from "../components/Footer";

function MatchAnalytics() {
  // the current match
  const [match, setMatch] = useState();
  // team associated with current match
  const [team, setTeam] = useState();
  // for displaying the users scoreline
  const [userGoals, setUserGoals] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  // array for stat totals chart data
  const [totalsChart, setTotalsChart] = useState([]);
  // array for performance chart
  const [performanceData, setPerformanceData] = useState([]);
  // boolean to check whether all state is loaded
  const [isLoaded, setIsLoaded] = useState(false);
  // string of which total user wants displayed
  const [userSelect, setUserSelect] = useState("");
  const { matchId } = useParams();

  // const to hold calculated stats
  const totalGoalsPlayRef = useRef(0);
  const totalPointsPlayRef = useRef(0);
  const totalWidesRef = useRef(0);
  const totalGoalsDeadRef = useRef(0);
  const totalPointsDeadRef = useRef(0);
  const totalBlocksRef = useRef(0);
  const totalCatchesRef = useRef(0);
  const totalDropsRef = useRef(0);

  // fetches the match from db
  useEffect(() => {
    const getMatch = async () => {
      const response = await getMatchById(matchId);
      setMatch(response);
    };
    getMatch();
  }, [matchId]);

  // gets the total scores for the user's team
  useEffect(() => {
    const fetchUserScores = async () => {
      const goalScored = await getTotalGoals(matchId);
      const pointScored = await getTotalPoints(matchId);
      setUserGoals(goalScored.totalGoals);
      setUserPoints(pointScored.totalPoints);
    };
    fetchUserScores();
  }, [matchId]);

  // loads user's team name
  useEffect(() => {
    const getTeam = async () => {
      if (match) {
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
  }, [match]);

  // check if state is loaded
  useEffect(() => {
    const checkIsLoaded = () => {
      if (match && team) {
        setIsLoaded(true);
      } else {
        console.log("not loaded yet");
      }
    };
    checkIsLoaded();
  }, [team, match]);

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
      setTotalsChart(data);
    }
  }, [isLoaded, match]);

  // options for performance chart
  const options = [
    {
      id: 1,
      stat: "goals(play)",
    },
    {
      id: 2,
      stat: "points(play)",
    },
    {
      id: 3,
      stat: "goals(dead)",
    },
    {
      id: 4,
      stat: "points(dead)",
    },
    {
      id: 5,
      stat: "wides",
    },
    {
      id: 6,
      stat: "blocks",
    },
    {
      id: 7,
      stat: "catches",
    },
    {
      id: 8,
      stat: "drops",
    },
  ];

  const onUserSelect = (event) => {
    const selection = event.target.value;
    setUserSelect(selection);
  };

  // creates a chart based on the users selected total
  useEffect(() => {
    const createPerformanceChartData = async () => {
      const performanceChartData = await Promise.all(
        match.teams.players.map(async (player) => {
          let statTotal;
          let statName;
          switch (userSelect) {
            case "1":
              statTotal = player.stats.goal_from_play;
              statName = "Goals from play";
              if (isNaN(statTotal)) {
                statTotal = 0;
              }
              break;
            case "2":
              statTotal = player.stats.point_from_play;
              statName = "Points from play";
              if (isNaN(statTotal)) {
                statTotal = 0;
              }
              break;
            case "3":
              statTotal = player.stats.goal_from_dead;
              statName = "Goals from dead ball";
              if (isNaN(statTotal)) {
                statTotal = 0;
              }
              break;
            case "4":
              statTotal = player.stats.point_from_dead;
              statName = "Points from dead ball";
              if (isNaN(statTotal)) {
                statTotal = 0;
              }
              break;
            case "5":
              statTotal = player.stats.wide;
              statName = "Wides";
              if (isNaN(statTotal)) {
                statTotal = 0;
              }
              break;
            case "6":
              statTotal = player.stats.block_hook;
              statName = "Blocks";
              if (isNaN(statTotal)) {
                statTotal = 0;
              }
              break;
            case "7":
              statTotal = player.stats.catch_made;
              statName = "Catches";
              if (isNaN(statTotal)) {
                statTotal = 0;
              }
              break;
            case "8":
              statTotal = player.stats.catch_missed;
              statName = "Drops";
              if (isNaN(statTotal)) {
                statTotal = 0;
              }
              break;
            default:
              statTotal = null;
              statName = "";
              break;
          }

          let playerName = "";
          try {
            const response = await getPlayerById(player.playerId);
            playerName = response.playerName;
          } catch (error) {
            console.error("Error getting player name:", error);
          }

          // returns data used in performance chart
          return { name: playerName, amount: statTotal, statName };
        })
      );
      setPerformanceData(performanceChartData);
    };
    if (match && userSelect) {
      createPerformanceChartData();
    }
  }, [match, userSelect]);

  // give time for the data to load
  if (!match || !team) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <Container fluid style={{ height: "100vh" }}>
        <Col
          sm={{ span: 6 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 2 }}
        >
          <Card className="styled-card mx-4 my-4">
            <Card.Body>
              <Card.Title className="d-flex justify-content-center">
                {team.teamName} {team.teamLevel} vs {match.teams.oppositionTeam}
              </Card.Title>
              <Card.Text className="d-flex justify-content-center">
                {userGoals}-{userPoints} : {match.goalAgainst}-
                {match.pointAgainst}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col
          className="my-2"
          sm={{ span: 6 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 2 }}
        >
          <Card className="styled-card ">
            <Card.Body>
              <Card.Title className="d-flex justify-content-center">
                Overall Team Stats
              </Card.Title>
              <MatchTotals data={totalsChart} />
            </Card.Body>
          </Card>
        </Col>

        <Col
          className="my-4"
          sm={{ span: 6 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 2 }}
        >
          <Card className="styled-card ">
            <Card.Body>
              <Row>
                <Card.Title className="d-flex justify-content-center">
                  Player Performance
                </Card.Title>
                <Col className="d-flex justify-content-center">
                  <Form>
                    <Form.Select onChange={onUserSelect} value={userSelect}>
                      <option value="">Select stat</option>
                      {options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.stat}
                        </option>
                      ))}
                    </Form.Select>
                  </Form>
                </Col>
              </Row>
              <PerformanceChart data={performanceData} />
            </Card.Body>
          </Card>
        </Col>
      </Container>
      <Footer />
    </div>
  );
}

export default MatchAnalytics;
