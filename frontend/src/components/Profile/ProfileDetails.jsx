import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Logo from "../../assets/Logo.png";
import styles from "./profiledetais.module.css";

import { Link } from "react-router-dom";

const ProfileDetails = () => {
  return (
    <Container className="container-main">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={7}>
          <Card className="text-center p-4 p-md-5 shadow-lg">
            <Card.Body>
              <img
                src={Logo}
                alt="MyGarage Hub Logo"
                className="img-fluid mb-3"
                style={{ maxWidth: "200px" }} // Adjust logo size
              />
              <h2 className="mb-2">User Profile</h2>
              <p className="lead mb-0">ASD</p>
            </Card.Body>
            <Card.Footer>
              <Link className={styles.LinkTo} to="/login">
                Get Started
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileDetails;
