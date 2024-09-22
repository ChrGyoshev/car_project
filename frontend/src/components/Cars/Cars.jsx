import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import styles from "./cars.module.css";
import { useNavigate } from "react-router-dom";

const Cars = ({ user }) => {
  const navigate = useNavigate();
  return (
    <>
      <Container className={`height mt-1`}>
        <Row className="d-flex flex-column justify-content-center align-items-center  mb-3">
          <Button className="w-25 mb-3" onClick={() => navigate("/test")}>
            Add Car
          </Button>

          <Col md={8} lg={6} xs={12}>
            <Card className={`shadow mx-auto ${styles.responsiveCard}`}>
              <Card.Img
                variant="top"
                src="https://images.pistonheads.com/nimg/22306/M9.jpg"
              />

              <Card.Body>
                <Card.Title className="fst-italic">Mercedes S-class</Card.Title>

                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <span className="fw-bold">Year: </span>2006
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="fw-bold">Mileage: </span>245 000
                  </ListGroup.Item>
                </ListGroup>

                <div className="text-center">
                  <Button variant="primary" className="">
                    Maintenances
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Cars;
