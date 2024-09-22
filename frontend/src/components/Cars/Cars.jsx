import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import styles from "./cars.module.css";
import { useNavigate } from "react-router-dom";
import { GetUserCars } from "../../services/api";
import { useEffect, useState } from "react";

const Cars = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const carsData = await GetUserCars();
        // Ensure carsData is valid and an array, otherwise set it to an empty array
        setData(carsData);
        console.log(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setData([]); // Set data to an empty array in case of error
      }
    }
    fetchCars();
  }, []);
  const navigate = useNavigate();

  return (
    <Container className="height mt-1">
      <Row className="d-flex flex-column justify-content-center align-items-center mb-3">
        <Button className="w-25 mb-3" onClick={() => navigate("/test")}>
          Add Car
        </Button>

        {/* Iterate over the data array and render car cards */}
        {data.map((car, index) => (
          <Col md={8} lg={6} xs={12} key={index} className="mb-3">
            <Card className={`shadow mx-auto ${styles.responsiveCard}`}>
              <Card.Img
                variant="top"
                src={
                  car.picture ||
                  "https://via.placeholder.com/400x300.png?text=No+Image"
                }
                alt={`${car.make} ${car.model}`}
              />

              <Card.Body>
                <Card.Title className="fst-italic">
                  {car.make} {car.model}
                </Card.Title>

                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <span className="fw-bold">Year: </span>
                    {car.year}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="fw-bold">Mileage: </span>
                    {car.mileage ? car.mileage : "N/A"}{" "}
                    {/* Handle null mileage */}
                  </ListGroup.Item>
                </ListGroup>

                <div className="text-center">
                  <Button variant="primary">Maintenances</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default Cars;
