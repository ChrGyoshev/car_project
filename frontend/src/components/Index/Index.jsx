import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Logo from "../../assets/Logo.png";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FetchLoggedUser } from "../../services/api";

const Index = ({ username, isLogged }) => {
  return (
    <Container className={styles.containerMain}>
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
              <h1>{username && username}</h1>
              <h2 className="mb-2">Welcome to MyGarage Hub</h2>

              <p className="lead mb-0">
                Your go-to app for managing and maintaining your car’s service
                records, repairs, and more. MyGarage Hub makes car care easy and
                organized!
              </p>
            </Card.Body>
            <Card.Footer className={styles.footer}>
              {username ? (
                <Link className={styles.LinkTo} to="/cars">
                  My Cars
                </Link>
              ) : (
                <Link className={styles.LinkTo} to="/login">
                  Get Started
                </Link>
              )}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
