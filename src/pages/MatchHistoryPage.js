import { useState, useEffect } from "react";
import { Container, Row, Col, FormControl, Card } from "react-bootstrap";
import { getMatches, deleteMatch, getTotalGoals, getTotalPoints } from "../api";
import MatchList from "../components/MatchList";
import NavBar from "../components/NavBar";
import { FaSearch } from "react-icons/fa";
// import Footer from "../components/Footer";

function MatchHistory() {
  // store all of the users matches
  const [matches, setMatches] = useState([]);
  // filtered matches state based on the users search query
  const [filteredMatches, setFilteredMatches] = useState([]);
  // state for user's search query
  const [query, setQuery] = useState("");
  // selected filter by result
  const [selectedResult, setSelectedResult] = useState("");

  // get all matches to be displayed
  useEffect(() => {
    getMatches()
      .then((response) => {
        setMatches(response.matches);
        setFilteredMatches(response.matches);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // if there's a query set filtered matches to ones which include the query - if no query set fm as matches
  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const filteredMatchArray = matches.filter((match) =>
        match.teams.oppositionTeam.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredMatches(filteredMatchArray);
    } else {
      setFilteredMatches(matches);
    }
  }, [query, matches]);

  const handleFilterByResult = (result) => {
    if (result === "all") {
      setFilteredMatches(matches);
    } else {
      const filteredMatchArray = matches.filter(
        (match) => calculateResult(match) === result
      );
      setFilteredMatches(filteredMatchArray);
    }
  };

  const calculateResult = async (match) => {
    const goalScored = await getTotalGoals(match._id);
    const pointScored = await getTotalPoints(match._id);
    const totalScore = goalScored.totalGoals * 3 + pointScored.totalPoints;
    const oppositionScore = match.goalAgainst * 3 + match.pointAgainst;
    if (totalScore > oppositionScore) {
      console.log("Win");
      return "win";
    } else if (totalScore === oppositionScore) {
      console.log("draw");
      return "draw";
    } else {
      console.log("loss");
      return "loss";
    }
  };

  // when delete button is clicked this method handles that action and makes call to delete match by id
  const handleDeleteMatch = (id) => {
    deleteMatch(id)
      .then(() => {
        const updatedMatches = matches.filter((match) => match._id !== id);
        setMatches(updatedMatches);
        setFilteredMatches(updatedMatches);
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div>
      <NavBar />

      <Container fluid className="mt-4">
        <Col
          sm={{ span: 8, offset: 2 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 2 }}
        >
          <Card className="styled-card mx-4 my-4">
            <Card.Body>
              <Card.Title>Match History</Card.Title>
              <Card.Text>
                Click on the view icon to access match overview. Click delete if
                you need to remove a match
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Row>
          <Row>
            <Col className="d-flex justify-content-end"
              sm={{ span: 1 }}
              md={{ span: 1, offset: 2 }}
              lg={{ span: 1, offset: 2 }}
            >
              <FaSearch className="mt-2" />
            </Col>
            <Col  sm={{ span: 7 }}
              md={{ span: 7 }}
              lg={{ span: 7}}>
              <FormControl
                type="text"
                placeholder="Search by opponent"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Col>
          </Row>
          <Col sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }}>
            <select
              defaultValue={""}
              onChange={(e) => handleFilterByResult(e.target.value)}
            >
              <option value="all">All</option>
              <option value="win">Win</option>
              <option value="loss">Loss</option>
              <option value="draw">Draw</option>
            </select>
          </Col>
        </Row>
      </Container>
      <MatchList matches={filteredMatches} onDelete={handleDeleteMatch} />
      {/* <Footer /> */}
    </div>
  );
}

export default MatchHistory;
