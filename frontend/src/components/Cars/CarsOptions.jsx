import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styles from "./cars.module.css";

const CarAdd = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
  });
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const availableMakes = ["Mitsubishi", "Mercedes", "Audi", "BMW"].sort();
  // Makes array
  const years = Array.from({ length: 2024 - 1960 + 1 }, (_, i) => 1960 + i);

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
    setSelectedYear(e.target.value);
    setFormData((prevModels) => ({
      ...prevModels,
      year: e.target.value,
    }));
  };

  const SubmitHandler = () => {
    console.log(formData);
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
                      <option value="">--Please choose a model--</option>
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
                  <Form.Group className="mb-4 w-100">
                    <Form.Label className="fw-bold">Choose a Year</Form.Label>
                    <Form.Select
                      aria-label="Select year"
                      id="year"
                      value={selectedYear}
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CarAdd;
