import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import styles from "./navBar.module.css";
// import Logo from "../../assets/Logo.png";
import Logo from "../../assets/main.png";

function NavBar() {
  return (
    <>
      <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <img
              src={Logo}
              width="40"
              height="30"
              className="d-inline-block align-top"
              alt="MyGarageHub logo"
            />
            MyGarageHub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className={styles.navbarCenteringItems}>
              <NavLink className={styles.navLink} href="#">
                Home
              </NavLink>
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
