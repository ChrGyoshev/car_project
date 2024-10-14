import styles from "./maintenances.module.css";
import { Container, Row, Table, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FetchAllMaintenances } from "../../services/api";
export default function Maintenaces() {
  const { id } = useParams();

  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    async function FetchMaintenances() {
      try {
        const data = await FetchAllMaintenances(id);
        setMaintenances(data.data);
        console.log(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    FetchMaintenances();
  }, [id]);

  return (
    <div>
      <Container className="mt-4">
        <h2 className="text-center my-4">Maintenance Records</h2>
        <Row className="justify-content-center">
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
                    Value : {maintenance.id}
                  </h5>
                  <hr />
                  <Row className="mt-2">
                    <Col>
                      <strong>Description:</strong> {maintenance.description}
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
        </Row>
      </Container>
    </div>
  );
}
