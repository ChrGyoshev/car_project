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

  const handleUploadComplete = (uploadedPictureFile) => {
    // If no new picture is uploaded, retain the existing picture
    const updatedFormData = {
      ...formData,
      picture: uploadedPictureFile || car.picture,
    };
    submitCarData(updatedFormData);
  };

  const submitCarData = async (updatedFormData) => {
    setShow(true);
    try {
      // Create a FormData object to handle the file upload
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("mileage", updatedFormData.mileage);
      formDataToSubmit.append("year", updatedFormData.year);

      // Only append the picture file if it exists
      if (updatedFormData.picture && updatedFormData.picture instanceof File) {
        formDataToSubmit.append("picture", updatedFormData.picture);
      }

      // Send the form data to the API
      const response = await EditCar(formDataToSubmit, car.id);
      if (response.status === 200) {
        setModalContent("Car edited successfully");
        updateCars(response.data);
      } else {
        setModalContent("Error occurred. Try again later!");
      }
    } catch (err) {
      setModalContent("Error occurred. Try again later");
    }

    // Reset the form data after submission
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
                  <Modal.Title>Editing Car</Modal.Title>
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
                  <Form>
                    <Form.Group className="mb-4 w-100">
                      <Form.Label className="fw-bold">
                        Change mileage
                      </Form.Label>
                      <Form.Control
                        name="mileage"
                        value={formData.mileage}
                        onChange={ChangeHandler}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4 w-100">
                      <Form.Label className="fw-bold">Change year</Form.Label>
                      <Form.Control
                        name="year"
                        value={formData.year}
                        onChange={ChangeHandler}
                      />
                    </Form.Group>

                    <PictureUpload
                      onUploadComplete={handleUploadComplete}
                      car={car}
                      hide={hide}
                    />
                  </Form>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
