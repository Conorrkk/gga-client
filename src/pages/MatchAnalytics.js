import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  getMatchById,
  getTeamById,
  getTotalGoals,
  getTotalPoints,
} from "../api";
import { Card, Col } from "react-bootstrap";
import MatchTotals from "../components/MatchTotalsChart";

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
  // boolean to check whether all state is loaded
  const [isLoaded, setIsLoaded] = useState(false);
  const { matchId } = useParams();

  // vars to hold calculated stats
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

  // gets the total goals for the user's team
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

  // give time for the data to load
  if (!match || !team) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <Col
        sm={{ span: 6 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 8, offset: 2 }}
      >
        <Card className="mx-4 my-4">
          {/* <Card.Header>{configuredDate}</Card.Header> */}
          <Card.Body>
            <Card.Title>
              {team.teamName} {team.teamLevel} vs {match.teams.oppositionTeam}
            </Card.Title>
            <Card.Text>
              {userGoals}-{userPoints} : {match.goalAgainst}-
              {match.pointAgainst}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <MatchTotals data={totalsChart} />
    </div>
  );
}

export default MatchAnalytics;
