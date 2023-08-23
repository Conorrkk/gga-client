import React, { useState } from "react";
import {Button, Card, Row} from "react-bootstrap";

function ScoreCounter({ onUpdateGoalAgainst, onUpdatePointAgainst }) {
  // state to score goals
  const [goals, setGoals] = useState(0);
  // state to score points
  const [points, setPoints] = useState(0);

  const maxGoals = 20;
  const maxPoints = 50;
  const minGoals = 0;
  const minPoints = 0;

  // inc goals value while under max
  const incrementGoals = () => {
    if (goals < maxGoals) {
      setGoals(goals + 1);
      onUpdateGoalAgainst(goals + 1);
    }
  };

  // dec goals value while above min
  const decrementGoals = () => {
    if (goals > minGoals) {
      setGoals(goals - 1);
      onUpdateGoalAgainst(goals - 1);
    }
  };

  // inc points value while under max
  const incrementPoints = () => {
    if (points < maxPoints) {
      setPoints(points + 1);
      onUpdatePointAgainst(points + 1);
    }
  };

  // dec points value while above min
  const decrementPoints = () => {
    if (points > minPoints) {
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
              <Button
                className="scoreline-button"
                variant="outline-dark me-1"
                onClick={incrementGoals}
              >
                {goals}
              </Button>
              <Button
                className="scoreline-button"
                variant="outline-dark"
                onClick={incrementPoints}
              >
                {points}
              </Button>
            </div>
          </div>
        </Row>
        <Row>
          <div className="score-section">
            <div className="score-actions">
              <Button
                className="scoreline-button"
                variant="outline-danger me-2"
                onClick={decrementGoals}
              >
                -
              </Button>
              <Button
                className="scoreline-button"
                variant="outline-danger"
                onClick={decrementPoints}
              >
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
