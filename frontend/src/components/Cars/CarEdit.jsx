import {
  Container,
  Row,
  Col,
  Modal,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./cars.module.css";
import { EditCar } from "../../services/api";
import PictureUpload from "./CarPictureUpload";

export default function CarEdit({ car, hide, updateCars }) {
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [formData, setFormData] = useState({
    mileage: car.mileage,
    picture: car.picture,
    year: car.year,
  });

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUploadComplete = (uploadedPictureUrl) => {
    // If no new picture is uploaded
    if (!uploadedPictureUrl) {
      uploadedPictureUrl = car.picture; // Retain the existing picture

      setShow(true);
    }

    const updatedFormData = { ...formData, picture: uploadedPictureUrl };
    submitCarData(updatedFormData);
  };

  const submitCarData = async (updatedFormData) => {
    setShow(true);
    try {
      const response = await EditCar(updatedFormData, car.id);
      if (response.status === 200) {
        setModalContent("Car edited successfully");
        updateCars(response.data);
      } else {
        setModalContent("Error occured try again later!");
      }
    } catch (err) {
      setModalContent("Error occured try again later");
    }

    setFormData({ make: "", model: "", year: "", mileage: 0, picture: "" });
  };

  return (
    <>
      <Container className={`height mt-1`}>
        <Row className="d-flex justify-content-center align-items-center mb-5">
          <Col md={8} lg={6} xs={12}>
            {show ? (
              <Modal
                show={show}
                onHide={() => {
                  setShow(false);
                  hide();
                }}
                backdrop={true}
                keyboard={true}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Adding Car</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShow(false);
                      hide();
                    }}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            ) : (
              <Card
                className={`shadow-lg p-4 mx-auto ${styles.responsiveCard}`}
              >
                <Card.Body>
                  <form>
                    <Form.Group className="mb-4 w-100">
                      <Form.Label className="fw-bold">
                        Change mileage
                      </Form.Label>
                      <Form.Control
                        name="mileage"
                        id="mileage"
                        value={formData.mileage}
                        onChange={ChangeHandler}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-4 w-100">
                      <Form.Label className="fw-bold">
                        Change picture
                      </Form.Label>
                      <Form.Control
                        name="picture"
                        id="picture"
                        value={formData.picture}
                        placeholder="change picture"
                        onChange={ChangeHandler}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-4 w-100">
                      <Form.Label className="fw-bold">Change year</Form.Label>
                      <Form.Control
                        name="year"
                        id="year"
                        value={formData.year}
                        placeholder="change year"
                        onChange={ChangeHandler}
                      ></Form.Control>
                    </Form.Group>
                  </form>
                  <PictureUpload
                    onUploadComplete={handleUploadComplete}
                    car={car}
                  />
                  <div className="text-center"></div>
                </Card.Body>
                <div className="d-flex justify-content-end gap-2">
                  <Button variant="danger" className="" onClick={hide}>
                    Cancel
                  </Button>
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
