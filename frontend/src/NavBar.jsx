import { Navbar, Nav, Container, NavLink } from "react-bootstrap";

function NavBar() {
  return (
    <>
      <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <NavLink href="#">Home</NavLink>
              <NavLink href="#">Profile</NavLink>
              <NavLink href="#">Cars</NavLink>
              <NavLink href="#">About</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
