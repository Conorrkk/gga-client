import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Row from "react-bootstrap/Row";

function ScoreCounter({ onUpdateGoalAgainst, onUpdatePointAgainst }) {
  // state to score goals
  const [goals, setGoals] = useState(0);
  // state to score points
  const [points, setPoints] = useState(0);

  // if goals are
  const incrementGoals = () => {
    if (goals < 50) {
      setGoals(goals + 1);
      onUpdateGoalAgainst(goals + 1);
    }
  };

  const decrementGoals = () => {
    if (goals > 0) {
      setGoals(goals - 1);
      onUpdateGoalAgainst(goals - 1);
    }
  };

  const incrementPoints = () => {
    if (points < 50) {
      setPoints(points + 1);
      onUpdatePointAgainst(points + 1);
    }
  };

  const decrementPoints = () => {
    if (points > 0) {
      setPoints(points - 1);
      onUpdatePointAgainst(points - 1);
    }
  };

  return (
    <Card className="scoreline-against">
      <Card.Body>
        <Row className="mb-2">
          <div className="score-section">
            <div className="score-actions">
              <Button className="scoreline-button" variant="outline-dark me-1" onClick={incrementGoals}>
                {goals}
              </Button>

              <Button className="scoreline-button" variant="outline-dark" onClick={incrementPoints}>
                {points}
              </Button>
            </div>
          </div>
        </Row>
        <Row>
          <div className="score-section">
            <div className="score-actions">
              <Button className="scoreline-button" variant="outline-warning me-2" onClick={decrementGoals}>
                -
              </Button>
              <Button className="scoreline-button" variant="outline-warning" onClick={decrementPoints}>
                -
              </Button>
            </div>
          </div>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ScoreCounter;
