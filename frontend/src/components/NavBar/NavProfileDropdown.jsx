import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

const NavProfileDropdown = ({ onClick }) => {
  return (
    <>
      <>
        <NavDropdown.Item as={Link} to="/profile" onClick={onClick}>
          My Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/settings" onClick={onClick}>
          Settings
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onClick}>Logout</NavDropdown.Item>
      </>
    </>
  );
};

export default NavProfileDropdown;
