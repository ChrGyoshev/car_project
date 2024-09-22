import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styles from "./cars.module.css";

const ModelDropdown = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const availableMakes = ["Mitsubishi", "Mercedes", "Audi"]; // Makes array

  const [selectedMake, setSelectedMake] = useState(""); // Default selected make

  // Fetch models based on the selected make
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${selectedMake}?format=json`
        );
        const data = await response.json();
        const modelNames = data.Results.map((model) => model.Model_Name).sort();

        setModels(modelNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchModels();
  }, [selectedMake]); // Trigger fetching models whenever selectedMake changes

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleMakeChange = (event) => {
    setSelectedMake(event.target.value);
    setSelectedModel(""); // Reset model when make changes
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
                      value={selectedMake}
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
                    {selectedMake && (
                      <Form.Text className="text-muted">
                        You selected: {selectedMake}
                      </Form.Text>
                    )}
                  </Form.Group>

                  {/* Car Model Select */}
                  <Form.Group className="mb-4 w-100">
                    <Form.Label className="fw-bold">Choose a Model</Form.Label>
                    <Form.Select
                      aria-label="Select car model"
                      id="model-select"
                      value={selectedModel}
                      onChange={handleModelChange}
                      className="form-select"
                    >
                      <option value="">--Choose Model--</option>
                      {models.map((model, index) => (
                        <option key={index} value={model}>
                          {model}
                        </option>
                      ))}
                    </Form.Select>
                    {selectedModel && (
                      <Form.Text className="text-muted">
                        You selected: {selectedModel}
                      </Form.Text>
                    )}
                  </Form.Group>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ModelDropdown;
