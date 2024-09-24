import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styles from "./cars.module.css";
import { AddCar } from "../../services/api";

const CarAdd = () => {
  const [formData, setFormData] = useState({});
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedMake, setSelectedMake] = useState("");

  const [show, setShow] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const availableMakes = ["Mitsubishi", "Mercedes", "Audi", "BMW"].sort();
  // Makes array
  const years = Array.from({ length: 2024 - 1960 + 1 }, (_, i) => 1960 + i);

  // Fetch models based on the selected make
  useEffect(() => {
    const fetchModels = async () => {
      try {
        if (selectedMake) {
          const response = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${selectedMake}?format=json`
          );
          const data = await response.json();
          const modelNames = data.Results.map(
            (model) => model.Model_Name
          ).sort();

          setModels(modelNames);
        }
      } catch (err) {}
    };

    fetchModels();
  }, [selectedMake]); // Trigger fetching models whenever selectedMake changes

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);

    setFormData((prevModels) => ({
      ...prevModels,
      model: event.target.value,
    }));
  };

  const handleMakeChange = (event) => {
    setSelectedMake(event.target.value);
    setFormData((prevModels) => ({
      ...prevModels,
      make: event.target.value,
      model: "",
    }));
  };

  const handleChangeYear = (e) => {
    setFormData((prevModels) => ({
      ...prevModels,
      year: e.target.value,
    }));
  };

  const SubmitHandler = async () => {
    const response = await AddCar(formData);
    setResponseMsg(response.message);
    setShow(true);
    setFormData({});
  };

  return (
    <>
      <Container className={`height mt-1`}>
        <Row className="d-flex justify-content-center align-items-center mb-5">
          <Col md={8} lg={6} xs={12}>
            <Card className={`shadow-lg p-4 mx-auto ${styles.responsiveCard}`}>
              <Card.Body>
                <form>
                  <Form.Group className="mb-4 w-100">
                    <Form.Label className="fw-bold">Choose a Make</Form.Label>
                    <Form.Select
                      aria-label="Select car make"
                      id="make-select"
                      value={formData.make || ""}
                      onChange={handleMakeChange}
                      className="form-select"
                    >
                      <option value="">--Please choose a make--</option>
                      {availableMakes.map((make, index) => (
                        <option key={index} value={make}>
                          {make}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Car Model Select */}
                  <Form.Group className="mb-4 w-100">
                    <Form.Label className="fw-bold">Choose a Model</Form.Label>
                    <Form.Select
                      aria-label="Select car model"
                      id="model-select"
                      value={formData.model || ""}
                      onChange={handleModelChange}
                      className="form-select"
                    >
                      <option value="">--Please choose a model--</option>
                      {models.map((model, index) => (
                        <option key={index} value={model}>
                          {model}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-4 w-100">
                    <Form.Label className="fw-bold">Choose a Year</Form.Label>
                    <Form.Select
                      aria-label="Select year"
                      id="year"
                      value={formData.year || ""}
                      onChange={handleChangeYear}
                    >
                      <option value="">--Select year--</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </form>
                <div className="text-center">
                  <Button onClick={SubmitHandler}>Submit</Button>
                </div>
              </Card.Body>
            </Card>

            <>
              <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop={true}
                keyboard={true}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Adding Car</Modal.Title>
                </Modal.Header>
                <Modal.Body>{responseMsg}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CarAdd;
