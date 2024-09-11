import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import Logo from "../../assets/main.png";
import NavProfileDropdown from "./NavProfileDropdown";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef]);

  return (
    <>
      <Navbar
        ref={navbarRef}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        collapseOnSelect
        fixed="top"
        expand="sm"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={Logo}
              width="40"
              height="30"
              className="d-inline-block align-top"
              alt="MyGarageHub logo"
            />
            MyGarageHub
          </Navbar.Brand>
          <NavDropdown
            title="Profile"
            id="profile-dropdown"
            className="d-block d-sm-none"
            align="end" // Aligns dropdown menu to the right
          >
            <NavProfileDropdown onClick={() => setExpanded(false)} />
          </NavDropdown>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {" "}
              {/* Left side items */}
              <Nav.Link
                as={Link}
                to="/"
                className={styles.navElement}
                onClick={() => setExpanded(false)}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/cars"
                className={styles.navElement}
                onClick={() => setExpanded(false)}
              >
                Cars
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className={styles.navElement}
                onClick={() => setExpanded(false)}
              >
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <NavDropdown
            title="Profile"
            id="profile-dropdown"
            className="ml-auto d-none d-md-block"
            align="end" // Aligns dropdown menu to the right
          >
            <NavProfileDropdown onClick={() => setExpanded(false)} />
          </NavDropdown>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
