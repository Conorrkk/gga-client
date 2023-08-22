import { useState, useEffect } from "react";
import { Container, Row, Col, FormControl } from "react-bootstrap";
import { getMatches, deleteMatch } from "../api";
import MatchList from "../components/MatchList";
import NavBar from "../components/NavBar";
// import Footer from "../components/Footer";

function MatchHistory() {
  // store all of the users matches
  const [matches, setMatches] = useState([]);
  // filtered matches state based on the users search query
  const [filteredMatches, setFilteredMatches] = useState([]);
  // state for user's search query
  const [query, setQuery] = useState("");

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
      const filteredMatchArray = matches.filter((match) =>
        match.teams.oppositionTeam.includes(query)
      );
      setFilteredMatches(filteredMatchArray);
    } else {
      setFilteredMatches(matches);
    }
  }, [query, matches]);

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
        <Row>
          <Col
            sm={{ span: 6 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 6, offset: 3 }}
          >
            <FormControl
              type="text"
              placeholder="Search opponent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
        </Row>
      </Container>
      <MatchList matches={filteredMatches} onDelete={handleDeleteMatch} />
      {/* <Footer /> */}
    </div>
  );
}

export default MatchHistory;
