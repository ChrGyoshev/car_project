import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Logo from "../../assets/Logo.png";
import styles from "./index.module.css";

const Index = () => {
  return (
    <Container className={styles.containerMain}>
      <Row className="justify-content-center">
        
        <Col xs={12} sm={10} md={8} lg={7}>
          <Card className="text-center p-4 p-md-5 shadow-lg">
            <Card.Body>
              <img
                src={Logo}
                alt="MyGarage Hub Logo"
                className="img-fluid mb-4"
                style={{ maxWidth: "200px" }} // Adjust logo size
              />
              <h1 className="mb-4">Welcome to MyGarage Hub</h1>
              <p className="lead mb-0">
                Your go-to app for managing and maintaining your car’s service
                records, repairs, and more. MyGarage Hub makes car care easy and
                organized!
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
