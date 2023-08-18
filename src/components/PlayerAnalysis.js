import { useEffect, useState, useRef } from "react";
import { getPlayerById, getTeamById, getPlayersMatches } from "../api";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PlayerAnalysis({ id }) {
  // object to store the player
  const [player, setPlayer] = useState({});
  // object to store the players team
  const [team, setTeam] = useState({});
  // array to store players matches
  const [matches, setMatches] = useState([]);
  // boolean to check whether all state is loaded
  const [isLoaded, setIsLoaded] = useState(false);
  // boolean to check whether if stats have been calculated
  const [statsCalculated, setStatsCalculated] = useState(false);
  //the following stat related stats are to bypass the issue of .current properties not rendering at the right time
  // accuracy
  const [accuracy, setAccuracy] = useState(null);
  // average points
  const [averagePoints, setAveragePoints] = useState(null);
  // average goals
  const [averageGoals, setAverageGoals] = useState(null);
  // average wides
  const [averageWides, setAverageWides] = useState(null);

  // declare vars to hold calculated stats
  const totalGoalsFromPlayRef = useRef(0);
  const totalPointsFromPlayRef = useRef(0);
  const totalWidesRef = useRef(0);

  // loads the player information and sets in in the player state
  useEffect(() => {
    const findPlayer = async () => {
      try {
        const playerData = await getPlayerById(id);
        setPlayer(playerData);
      } catch (error) {
        console.error("Error getting player:", error);
      }
    };
    findPlayer();
  }, [id]);

  // get players team and the matches they were involved in
  useEffect(() => {
    if (player._id) {
      const findTeam = async () => {
        try {
          const teamData = await getTeamById(player.teamId);
          setTeam(teamData);
        } catch (error) {
          console.error("Error finding team:", error);
        }
      };
      findTeam();

      const playersMatches = async () => {
        try {
          const matchData = await getPlayersMatches(player._id);
          setMatches(matchData.matches);
        } catch (error) {
          console.error("Error getting matches:", error);
        }
      };
      playersMatches();
    }
  }, [player]);

  useEffect(() => {
    const checkIsLoaded = () => {
      if (player && team && matches) {
        setIsLoaded(true);
      } else {
        console.error("something went wrong");
      }
    };
    checkIsLoaded();
  }, [player, team, matches]);

  // calculates player's stats based on the matches they've played
  useEffect(() => {
    // store the mutable stat value in the .current property
    totalGoalsFromPlayRef.current = 0;
    totalPointsFromPlayRef.current = 0;
    totalWidesRef.current = 0;
    if (isLoaded) {
      const calculateStats = () => {
        let matchesPlayed = 0;
        matches.forEach((match) => {
          const playerCheck = match.teams.players.find(
            (p) => p.playerId === player._id
          );
          // if player check returns through then add on the stats to the total
          if (playerCheck) {
            totalGoalsFromPlayRef.current += playerCheck.stats.goal_from_play;
            totalPointsFromPlayRef.current += playerCheck.stats.point_from_play;
            totalWidesRef.current += playerCheck.stats.wide;
            // of player played in the match then inc matchesPlayed
            matchesPlayed++;
          }
        });

        if (matchesPlayed > 0) {
          const calculatedAccuracy = (
            ((totalGoalsFromPlayRef.current + totalPointsFromPlayRef.current) /
              (totalGoalsFromPlayRef.current +
                totalPointsFromPlayRef.current +
                totalWidesRef.current)) *
            100
          ).toFixed(2);
          const calculatedAveragePoints = (
            totalPointsFromPlayRef.current / matchesPlayed
          ).toFixed(2);
          const calculatedAverageGoals = (
            totalGoalsFromPlayRef.current / matchesPlayed
          ).toFixed(2);
          const calculatedAverageWides = (
            totalWidesRef.current / matchesPlayed
          ).toFixed(2);

          setAccuracy(calculatedAccuracy);
          setAveragePoints(calculatedAveragePoints);
          setAverageGoals(calculatedAverageGoals);
          setAverageWides(calculatedAverageWides);
        }
        setStatsCalculated(true);
      };
      calculateStats();
    }
  }, [isLoaded, matches, player]);

  // placeholder to allow player and to be fetched from api and set as state
  if (!player || !team || !statsCalculated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Row>
        <Col className="mx-1 my-1">
          <Card className="player-analytics-card">
            <Card.Body>
              <Card.Title>{player.playerName}</Card.Title>
              <Card.Text>{player.playerPosition}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mx-1 my-1">
          <Card className="player-analytics-card">
            <Card.Body>
              <Card.Title>{team.teamName}</Card.Title>
              <Card.Text>{team.teamLevel}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="mx-1 my-1">
          <Card className="player-analytics-card">
            <Card.Body>
              <Card.Title>Overall stats</Card.Title>
              <Card.Text>
                {/* statsCalculated boolean ensure we wait until stats have been calculated is true to show these values */}
                Total goals: {statsCalculated && totalGoalsFromPlayRef.current}
                <br></br>
                Total points:{" "}
                {statsCalculated && totalPointsFromPlayRef.current}
                <br></br>
                Total wides: {statsCalculated && totalWidesRef.current}
                <br></br>
                Average points: {statsCalculated && averagePoints}
                <br></br>
                Average goals: {statsCalculated && averageGoals}
                <br></br>
                Average wides: {statsCalculated && averageWides}
                <br></br>
                Accuracy: {statsCalculated && accuracy}%<br></br>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlayerAnalysis;
