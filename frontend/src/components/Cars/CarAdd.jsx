import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styles from "./cars.module.css";
import { AddCar } from "../../services/api";
import PictureUpload from "./CarPictureUpload";
import SpinnerBorder from "../../services/spinner";
import { years, availableMakes } from "../../services/api";

const CarAdd = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: 0,
    picture: null,
  });
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  // Group makes alphabetically
  const groupMakesAlphabetically = (makes) => {
    const grouped = {};

    makes.forEach((make) => {
      const firstLetter = make[0].toUpperCase(); // Get the first letter
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = []; // Initialize the group if it doesn't exist
      }
      grouped[firstLetter].push(make); // Add the make to the group
    });

    return grouped;
  };

  const groupedMakes = groupMakesAlphabetically(availableMakes);

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

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //  Upload picture logic here:

  const handleUploadComplete = (uploadedPictureFile) => {
    const updatedFormData = { ...formData, picture: uploadedPictureFile };
    submitCarData(updatedFormData);
  };

  const submitCarData = async (updatedFormData) => {
    setShow(true);
    setLoading(true);

    try {
      const response = await AddCar(updatedFormData);
      if (response.errors) {
        console.log(response.errors);
        setResponseMsg("Error occurred while adding the car.");
      } else {
        setResponseMsg("Car created successfully");
        // Reset the form data if the car is added successfully
        setFormData({
          make: "",
          model: "",
          year: "",
          mileage: 0,
          picture: null,
        });
      }
    } catch (error) {
      console.log("Error submitting car data:", error);
      setResponseMsg("An error occurred while adding the car.");
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <>
      <Container className={`height mt-1`}>
        <Row className="d-flex justify-content-center align-items-center mb-5">
          <Col md={8} lg={6} xs={12}>
            {show ? (
              <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop={true}
                keyboard={true}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Adding Car</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  {loading ? <SpinnerBorder /> : responseMsg}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShow(false)}>
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
                      <Form.Label className="fw-bold">Choose a Make</Form.Label>
                      <Form.Select
                        aria-label="Select car make"
                        id="make-select"
                        value={formData.make}
                        onChange={handleMakeChange}
                        className="form-select"
                      >
                        <option value="">--Please choose a make--</option>
                        {Object.keys(groupedMakes).map((group, index) => (
                          <optgroup key={index} label={group}>
                            {groupedMakes[group].map((make, idx) => (
                              <option key={idx} value={make}>
                                {make}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {/* Car Model Select */}
                    <Form.Group className="mb-4 w-100">
                      <Form.Label className="fw-bold">
                        Choose a Model
                      </Form.Label>
                      <Form.Select
                        aria-label="Select car model"
                        id="model-select"
                        value={formData.model}
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
                        name="year"
                        value={formData.year}
                        onChange={HandleChange}
                      >
                        <option value="">--Select year--</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4 w-100">
                      <Form.Label className="fw-bold">Mileage</Form.Label>
                      <Form.Control
                        type="number"
                        name="mileage"
                        id="mileage"
                        value={formData.mileage}
                        onChange={HandleChange}
                      ></Form.Control>
                    </Form.Group>

                    <PictureUpload
                      onUploadComplete={handleUploadComplete}
                      location={true}
                    />
                  </form>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CarAdd;
