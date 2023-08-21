import { useState, useEffect } from "react";
import { getMatches, deleteMatch } from "../api";
import MatchList from "../components/MatchList";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Container, Row, Col, FormControl } from "react-bootstrap";

function MatchHistory() {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
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
          <Col sm={{ span: 6,}} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3}}>
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
