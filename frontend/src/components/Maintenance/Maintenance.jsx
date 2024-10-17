import styles from "./maintenances.module.css";
import { Container, Row, Table, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FetchAllMaintenances } from "../../services/api";

import SpinnerBorder from "../../services/spinner";

export default function Maintenaces() {
  const { id } = useParams();

  const [maintenances, setMaintenances] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function FetchMaintenances() {
      try {
        const data = await FetchAllMaintenances(id);
        setMaintenances(data.data);
        setTotalValue(
          data.data.reduce((sum, maintenance) => sum + maintenance.value, 0)
        );
        console.log(totalValue);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    FetchMaintenances();
  }, [id]);

  return (
    <div>
      <Container className="mt-4">
        <Row className="justify-content-center">
          {loading ? (
            <div className="mt-3 p-5">
              <SpinnerBorder />
            </div>
          ) : (
            <>
              <div className="text-center mt-5 pt-3">
                <Button className="m-3">Add service</Button>
                <h5>
                  Total spend:{" "}
                  <span className="text-danger">{totalValue.toFixed(2)}$</span>
                </h5>
              </div>

              <Col xs={12} md={10} lg={8}>
                {maintenances.map((maintenance) => (
                  <Card
                    key={maintenance.id}
                    className={`${styles.maintenanceCard} shadow-sm p-3 mb-4`}
                  >
                    <Card.Img
                      variant="top"
                      src="https://i.pinimg.com/originals/f5/69/89/f5698960d39b14cfd20f25930794af54.jpg" // Use the maintenance picture or the default one
                      className={styles.maintenanceImage}
                      alt="Maintenance"
                    />

                    <Card.Body>
                      <h5 className="card-title text-center">
                        Value :{" "}
                        <span className="text-danger">
                          {maintenance.value.toFixed(2)}$
                        </span>
                      </h5>
                      <hr />
                      <Row className="mt-2">
                        <Col>
                          <strong>Description:</strong>{" "}
                          {maintenance.description}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <strong>Date:</strong> {maintenance.date}
                        </Col>
                      </Row>
                      <hr />
                      <Row className="mt-2">
                        <Col>
                          <strong>Mileage:</strong> {maintenance.mileage} km
                        </Col>
                      </Row>
                      <hr />
                      <Row className="mt-2">
                        <Col>
                          <strong>Next Maintenance Mileage:</strong>{" "}
                          {maintenance.next_mileage} km
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <div className={styles.ButtonDiv}>
                        <Button>Edit</Button>
                        <Button variant="danger">Delete</Button>
                      </div>
                    </Card.Footer>
                  </Card>
                ))}
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
}
