import { useEffect, useState, useRef } from "react";
import { getPlayerById, getTeamById, getPlayersMatches } from "../api";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
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
  // string of which total user wants displayed
  const [userSelect, setUserSelect] = useState("");
  // array for accuracy chart
  const [accChartData, setAccChartData] = useState([]);
  // array for total chart
  const [totalsChartData, setTotalsChartData] = useState([]);
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

  // vars to hold calculated stats
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

  // options for totals chart
  const options = [
    {
      id: 1,
      stat: "goal(play)",
    },
    {
      id: 2,
      stat: "point(play)",
    },
    {
      id: 3,
      stat: "goal(dead)",
    },
    {
      id: 4,
      stat: "point(dead)",
    },
    {
      id: 5,
      stat: "wide",
    },
    {
      id: 6,
      stat: "block",
    },
    {
      id: 7,
      stat: "catch",
    },
    {
      id: 8,
      stat: "drop",
    },
  ];

  const onUserSelect = (event) => {
    const selection = event.target.value;
    setUserSelect(selection);
  };

  // creates a chart based on the users selected total
  useEffect(() => {
    const createTotalsChartData = () => {
      if (matches.length > 0) {
        const chartData = matches.map((match) => {
          const playerCheck = match.teams.players.find(
            (p) => p.playerId === player._id
          );
          let date;
          let readableDate;
          let statTotal;
          let statName;
          if (playerCheck) {
            switch (userSelect) {
              case "1":
                statTotal = playerCheck.stats.goal_from_play;
                statName = "Goals from play";
                if (isNaN(statTotal)) {
                  statTotal = 0;
                }
                break;
              case "2":
                statTotal = playerCheck.stats.point_from_play;
                statName = "Points from play";
                if (isNaN(statTotal)) {
                  statTotal = 0;
                }
                break;
              case "3":
                statTotal = playerCheck.stats.goal_from_dead;
                statName = "Goals from dead ball";
                if (isNaN(statTotal)) {
                  statTotal = 0;
                }
                break;
              case "4":
                statTotal = playerCheck.stats.point_from_dead;
                statName = "Points from dead ball";
                if (isNaN(statTotal)) {
                  statTotal = 0;
                }
                break;
              case "5":
                statTotal = playerCheck.stats.wides;
                statName = "Wides";
                if (isNaN(statTotal)) {
                  statTotal = 0;
                }
                break;
              case "6":
                statTotal = playerCheck.stats.block_hook;
                statName = "Blocks";
                if (isNaN(statTotal)) {
                  statTotal = 0;
                }
                break;
              case "7":
                statTotal = playerCheck.stats.catch_made;
                statName = "Catches";
                if (isNaN(statTotal)) {
                  statTotal = 0;
                }
                break;
              case "8":
                statTotal = playerCheck.stats.catch_missed;
                statName = "Drops";
                if (isNaN(statTotal)) {
                  statTotal = 0;
                }
                break;
              default:
                statTotal = null;
                break;
            }
          }
          // get the matchdate
          date = new Date(match.matchDate);
          readableDate = date.toLocaleDateString();

          // returns the matchdate and string to be used in the chart
          return { date: readableDate, stat: statTotal, name: statName };
        });
        setTotalsChartData(chartData);
      }
    };
    createTotalsChartData();
  }, [matches, player, userSelect]);

  // allow time for async functions to set state
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
        {/* <Col className="mx-1 my-1">
          <Card className="player-analytics-card">
            <Card.Body>
              <Card.Title>Overall stats</Card.Title>
              <Card.Text>
                statsCalculated boolean ensure we wait until stats have been calculated is true to show these values
                Total goals(play):{" "}
                {statsCalculated && totalGoalsPlayRef.current}
                Total points(play):{" "}
                {statsCalculated && totalPointsPlayRef.current}
                Total wides: {statsCalculated && totalWidesRef.current}
                Average goals play: {statsCalculated && averageGoalsPlay}
                Average points play: {statsCalculated && averagePointsPlay}
                Average goals dead: {statsCalculated && averageGoalsDead}
                Average points dead: {statsCalculated && averagePointsDead}
                Average wides: {statsCalculated && averageWides}
                Average blocks: {statsCalculated && averageBlocks}
                Average catches: {statsCalculated && averageCatches}
                Average drops: {statsCalculated && averageDrops}
                Accuracy: {statsCalculated && accuracy}%
                Total blocks: {statsCalculated && totalBlocksRef.current}
                Total catches: {statsCalculated && totalCatchesRef.current}
                Total catches dropped: {statsCalculated && totalDropRef.current}
                Total goals (dead):{" "}
                {statsCalculated && totalGoalsDeadRef.current}
                Total points (dead):{" "}
                {statsCalculated && totalPointsDeadRef.current}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
      <Row>
        <Col className="mx-1 my-1">
          <Card>
            <Card.Body>
              <Card.Title>Shot Accuracy</Card.Title>
              <Card.Text>Average: {statsCalculated && accuracy}%</Card.Text>
              <AccuracyChart data={accChartData}></AccuracyChart>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mx-1 my-1">
          <Card>
            <Card.Body>
              <Row>
                <Col sm={1} md={1} lg={1} className="d-flex align-items-center justify-content-end">
                  <Card.Title>Total</Card.Title>
                </Col>
                <Col sm={4} md={4} lg={4} className="d-flex justify-content-start">
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
              <StatTotalsChart data={totalsChartData}></StatTotalsChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row></Row>
    </div>
  );
}

export default PlayerAnalysis;
