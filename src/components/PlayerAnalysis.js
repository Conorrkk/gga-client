import { useEffect, useState, useRef } from "react";
import { getPlayerById, getTeamById, getPlayersMatches } from "../api";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AccuracyChart from "./AccuracyChart";
import StatTotalsChart from "./StatTotalsChart";

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
  // array for accuracy chart
  const [accChartData, setAccChartData] = useState([]);
  // following stat related stats bypass issue of useRef.current properties not rendering at the right time
  const [accuracy, setAccuracy] = useState(null);
  const [averagePointsPlay, setAveragePointsPlay] = useState(null);
  const [averageGoalsPlay, setAverageGoalsPlay] = useState(null);
  const [averageGoalsDead, setAverageGoalsDead] = useState(null);
  const [averagePointsDead, setAveragePointsDead] = useState(null);
  const [averageWides, setAverageWides] = useState(null);
  const [averageBlocks, setAverageBlocks] = useState(null);
  const [averageCatches, setAverageCatches] = useState(null);
  const [averageDrops, setAverageDrops] = useState(null);

  // declare vars to hold calculated stats
  const totalGoalsPlayRef = useRef(0);
  const totalPointsPlayRef = useRef(0);
  const totalWidesRef = useRef(0);
  const totalGoalsDeadRef = useRef(0);
  const totalPointsDeadRef = useRef(0);
  const totalBlocksRef = useRef(0);
  const totalCatchesRef = useRef(0);
  const totalDropRef = useRef(0);

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
    totalGoalsPlayRef.current = 0;
    totalPointsPlayRef.current = 0;
    totalWidesRef.current = 0;
    totalGoalsDeadRef.current = 0;
    totalPointsDeadRef.current = 0;
    totalBlocksRef.current = 0;
    totalCatchesRef.current = 0;
    totalDropRef.current = 0;
    if (isLoaded) {
      const calculateStats = () => {
        let matchesPlayed = 0;
        matches.forEach((match) => {
          const playerCheck = match.teams.players.find(
            (p) => p.playerId === player._id
          );
          // if player check returns through then add on the stats to the total
          if (playerCheck) {
            totalGoalsPlayRef.current += playerCheck.stats.goal_from_play;
            totalPointsPlayRef.current += playerCheck.stats.point_from_play;
            totalWidesRef.current += playerCheck.stats.wide;
            totalGoalsDeadRef.current += playerCheck.stats.goal_from_dead;
            totalPointsDeadRef.current += playerCheck.stats.point_from_dead;
            totalBlocksRef.current += playerCheck.stats.block_hook;
            totalCatchesRef.current += playerCheck.stats.catch_made;
            totalDropRef.current += playerCheck.stats.catch_missed;
            // ff player in the match inc matchesPlayed
            matchesPlayed++;
          }
        });

        if (matchesPlayed > 0) {
          const calculatedAccuracy = (
            ((totalGoalsPlayRef.current + totalPointsPlayRef.current) /
              (totalGoalsPlayRef.current +
                totalPointsPlayRef.current +
                totalWidesRef.current)) *
            100
          ).toFixed(2);
          const calcAvrgPointsPlay = (
            totalPointsPlayRef.current / matchesPlayed
          ).toFixed(2);
          const calcAvrgGoalsPlay = (
            totalGoalsPlayRef.current / matchesPlayed
          ).toFixed(2);
          const calcAvrgPointsDead = (
            totalPointsDeadRef.current / matchesPlayed
          ).toFixed(2);
          const calcAvrgGoalsDead = (
            totalGoalsDeadRef.current / matchesPlayed
          ).toFixed(2);
          const calcAvrgWides = (totalWidesRef.current / matchesPlayed).toFixed(
            2
          );
          const calcAvrgBlocks = (
            totalBlocksRef.current / matchesPlayed
          ).toFixed(2);
          const calcAvrgCatches = (
            totalCatchesRef.current / matchesPlayed
          ).toFixed(2);
          const calcAvrgDrops = (totalDropRef.current / matchesPlayed).toFixed(
            2
          );

          setAccuracy(calculatedAccuracy);
          setAveragePointsPlay(calcAvrgPointsPlay);
          setAverageGoalsPlay(calcAvrgGoalsPlay);
          setAveragePointsDead(calcAvrgPointsDead);
          setAverageGoalsDead(calcAvrgGoalsDead);
          setAverageWides(calcAvrgWides);
          setAverageBlocks(calcAvrgBlocks);
          setAverageCatches(calcAvrgCatches);
          setAverageDrops(calcAvrgDrops);
        }
        setStatsCalculated(true);
      };
      calculateStats();
    }
  }, [isLoaded, matches, player]);

  // gets the data to be sent to the accuracy chart and sets it as in array object
  useEffect(() => {
    const createAccChartData = () => {
      matches.forEach((match) => {
        const playerCheck = match.teams.players.find(
          (p) => p.playerId === player._id
        );
        if (playerCheck) {
          let date = new Date(match.matchDate);
          let readableDate = date.toLocaleDateString();
          let accuracy =
            (playerCheck.stats.goal_from_play +
              playerCheck.stats.point_from_play) /
            (playerCheck.stats.goal_from_play +
              playerCheck.stats.point_from_play +
              playerCheck.stats.wide);

          // we set the accuracy to 0 if it is not a number with isNan()method
          if (isNaN(accuracy)) {
            accuracy = 0;
          }
          setAccChartData((prevArray) => [
            ...prevArray,
            { date: readableDate, accuracy },
          ]);
        }
      });
    };
    createAccChartData();
  }, [matches, player]);

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
                Total goals(play):{" "}
                {statsCalculated && totalGoalsPlayRef.current}
                <br></br>
                Total points(play):{" "}
                {statsCalculated && totalPointsPlayRef.current}
                <br></br>
                Total wides: {statsCalculated && totalWidesRef.current}
                <br></br>
                Average goals play: {statsCalculated && averageGoalsPlay}
                <br></br>
                Average points play: {statsCalculated && averagePointsPlay}
                <br></br>
                Average goals dead: {statsCalculated && averageGoalsDead}
                <br></br>
                Average points dead: {statsCalculated && averagePointsDead}
                <br></br>
                Average wides: {statsCalculated && averageWides}
                <br></br>
                Average blocks: {statsCalculated && averageBlocks}
                <br></br>
                Average catches: {statsCalculated && averageCatches}
                <br></br>
                Average drops: {statsCalculated && averageDrops}
                <br></br>
                Accuracy: {statsCalculated && accuracy}%<br></br>
                Total blocks: {statsCalculated && totalBlocksRef.current}
                <br></br>
                Total catches: {statsCalculated && totalCatchesRef.current}
                <br></br>
                Total catches dropped: {statsCalculated && totalDropRef.current}
                <br></br>
                Total goals (dead):{" "}
                {statsCalculated && totalGoalsDeadRef.current}
                <br></br>
                Total points (dead):{" "}
                {statsCalculated && totalPointsDeadRef.current}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mx-1 my-1">
          <Card>
            <Card.Body>
              <Card.Title>{player.playerName}: Shot Accuracy</Card.Title>
              <Card.Text>Average: {statsCalculated && accuracy}%</Card.Text>
              <AccuracyChart data={accChartData}></AccuracyChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Row>
        <Col className="mx-1 my-1">
          <Card>
            <Card.Body>
              <Card.Title>{player.playerName}: Stat Totals</Card.Title>
              <Card.Text></Card.Text>
              <StatTotalsChart data={statTotalsData}></StatTotalsChart>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </div>
  );
}

export default PlayerAnalysis;
