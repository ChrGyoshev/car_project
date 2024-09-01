import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  return (
    <>
      <Container className="d-flex flex-column">
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            {/* Reduce spacing around the Navbar.Toggle and Navbar.Brand */}
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="me-2"
            />

            <Navbar.Brand href="#home" className="me-auto">
              Car Maintenance
            </Navbar.Brand>

            {/* Reduce spacing around Nav.Links */}
            <Nav.Link href="#features" className="text-dark p-2 me-2">
              Login
            </Nav.Link>
            <Nav.Link href="#features" className="text-dark p-0">
              Logout
            </Nav.Link>

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  Dank memes
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </>
  );
}

export default NavBar;
