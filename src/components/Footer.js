import React from "react";
import { Row, Col, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="main-footer bg-dark text-white">
      <Container className="mt-2">
        <Row>
          <Col>
            <p>&copy; {new Date().getFullYear()} GGAnalytics</p>
          </Col>
          <Col>
            <Stack gap={2}>
              <h3>Quick Links</h3>
              <Link to="/dashboard">
                <div className="p-2">Dashboard</div>
              </Link>
              <Link to="/teams">
                <div className="p-2">Teams</div>
              </Link>
              <Link to="/matchHistory">
                <div className="p-2">Match History</div>
              </Link>
            </Stack>
          </Col>
          <Col>
            <Stack gap={2}>
              <h3>Contact</h3>
              <div className="p-2">+353863032593</div>
              <div className="p-2">gganalytics@gga.project</div>
              <div className="p-2">
                Computer Science Building, Belfast, United Kingdom, BT9 5AF
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
