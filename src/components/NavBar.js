import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api";

function NavBar() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div>
      <Navbar bg="dark" className="custom-navbar" variant={"dark"} expand="lg">
        <Navbar.Brand className="ms-2" href="#">
          GGAnalytics
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/teams">
              Teams
            </Nav.Link>
            <Nav.Link as={Link} to="/createMatch">
              Create Match
            </Nav.Link>
            <Nav.Link as={Link} to="/matchHistory">
              Match History
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
