import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

const NavProfileDropdown = ({ onClick, buttonHandler }) => {
  return (
    <>
      <>
        <NavDropdown.Item as={Link} to="/user/details" onClick={buttonHandler}>
          My Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/user/settings" onClick={buttonHandler}>
          Settings
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onClick}>Logout</NavDropdown.Item>
      </>
    </>
  );
};

export default NavProfileDropdown;
