import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import hurlingPlayerImage from "../images/hurlingplayer.jpg";
import "../styles.css";

function LandingPage() {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/register");
  };

  return (
    <div
      className="landing"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${hurlingPlayerImage})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="landing-container">
        <Card.Title className="landing-name">GGAnalytics</Card.Title>
        <Card.Header className="landing-slogan">
          WHERE PASSION MEETS PERFORMANCE
        </Card.Header>
        <Card.Text className="landing-description">
          Create teams and record matches - we'll do the rest. Offering a range
          of features, such as a smooth match recording interface and in-depth
          analytics, this is the perfect companion for any team looking to take
          themselves to the next level
        </Card.Text>
        <Button onClick={handleJoin}>Join free</Button>
      </div>
    </div>
  );
}

export default LandingPage;
