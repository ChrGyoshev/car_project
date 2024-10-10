import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import styles from "./cars.module.css";
import { useNavigate } from "react-router-dom";
import { GetUserCars } from "../../services/api";
import { useEffect, useState } from "react";
import SpinnerBorder from "../../services/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CarEdit from "./CarEdit";

import DeleteCar from "./CarDelete";

const Cars = ({ user }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [showEditCar, setShowEditCar] = useState(false);
  const [showDeleteCar, setShowDeleteCar] = useState(false);
  const [currentSelectedCar, setCurrentSelectedCar] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({}); // Track image load status

  useEffect(() => {
    setLoading(true);
    async function fetchCars() {
      try {
        const carsData = await GetUserCars();
        setData(carsData);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setData([]); // Set data to an empty array in case of error
      }
      setLoading(false);
    }
    fetchCars();
  }, []);

  const EditHandler = (car) => {
    setShowEditCar(true);
    setCurrentSelectedCar(car);
  };

  const DeleteHandler = (car) => {
    setShowDeleteCar(true);
    setCurrentSelectedCar(car);
  };

  const updateCars = (updatedCar, isDeleted = false) => {
    if (isDeleted) {
      setData((prevData) => prevData.filter((car) => car.id !== updatedCar.id));
    } else {
      setData((prevData) =>
        prevData.map((car) =>
          car.id === updatedCar.id ? { ...car, ...updatedCar } : car
        )
      );
    }
  };

  const handleImageLoad = (carId) => {
    setImageLoaded((prevState) => ({ ...prevState, [carId]: true }));
  };

  return (
    <Container className="height mt-1">
      <Row className="d-flex flex-column justify-content-center align-items-center mb-3">
        {loading ? (
          <SpinnerBorder />
        ) : (
          <>
            {showEditCar ? (
              <CarEdit
                car={currentSelectedCar}
                hide={() => setShowEditCar(false)}
                updateCars={updateCars}
              />
            ) : showDeleteCar ? (
              <DeleteCar
                car={currentSelectedCar}
                hide={() => setShowDeleteCar(false)}
                updateCars={updateCars}
              />
            ) : (
              <>
                <Button
                  className="w-25 mb-3"
                  onClick={() => navigate("/cars/add")}
                >
                  Add Car
                </Button>

                {/* Iterate over the data array and render car cards */}
                {data.map((car) => (
                  <Col md={8} lg={6} xs={12} key={car.id} className="mb-3">
                    <Card className={`shadow mx-auto ${styles.responsiveCard}`}>
                      {/* Show spinner while the image is loading */}
                      {!imageLoaded[car.id] && (
                        <div className="mt-4">
                          <SpinnerBorder />
                        </div>
                      )}

                      <Card.Img
                        className={styles.CarImage}
                        variant="top"
                        src={
                          car.picture === null
                            ? "https://via.placeholder.com/400x300.png?text=No+Image"
                            : `https://car-project-1-v5k4.onrender.com${car.picture}`
                        }
                        alt={`${car.make} ${car.model}`}
                        style={{
                          display: imageLoaded[car.id] ? "block" : "none",
                        }} // Hide until loaded
                        onLoad={() => handleImageLoad(car.id)} // Mark image as loaded
                      />

                      <Card.Body className="position-relative">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className={styles.EditIcon}
                          onClick={() => EditHandler(car)}
                        />

                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className={styles.DeleteIcon}
                          onClick={() => DeleteHandler(car)}
                        />
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
                            {car.mileage ? car.mileage : "N/A"}
                          </ListGroup.Item>
                        </ListGroup>
                        <div className="text-center">
                          <Button
                            variant="primary"
                            onClick={() =>
                              navigate(`/cars/maintenances/${car.id}`)
                            }
                          >
                            Maintenances
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </>
            )}
          </>
        )}
      </Row>
    </Container>
  );
};

export default Cars;
