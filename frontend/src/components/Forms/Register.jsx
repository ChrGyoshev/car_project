import { useEffect, useState } from "react";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Modal,
} from "react-bootstrap";
import Logo from "../../assets/main.png";
import { registerUser } from "../../services/api.jsx";
import SpinnerBorder from "../../services/spinner.jsx";

const Login = () => {
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await registerUser(formData);
      console.log("Registration successful", response);
      // Set Modal content for success message
      setModalTitle("Registration successful");
      setModalContent(`You have registered successfully ${response.email}`);
      setIsSuccess(true);
      setShowModal(true);
    } catch (error) {
      let errorMessages = [];

      for (const key in error) {
        if (error[key] && Array.isArray(error[key])) {
          error[key].forEach((message) => {
            errorMessages.push(message);
          });
        }
      }

      //set modal for errors
      setModalTitle("Registration Errors");
      setModalContent(
        <ul>
          {errorMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      );
      setIsSuccess(false);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="height mt-1">
        <Row className=" d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border-3 border-dark border"></div>
            <Card className="shadow">
              <Card.Body>
                {!loading ? (
                  <div className="mb-3 mt-4">
                    <img
                      src={Logo}
                      width="60"
                      height="60"
                      className="d-inline-block align-top"
                      alt="MyGarageHub logo"
                    />
                    <h2 className="fw-bold text-uppercase mb-2">
                      MyGarage Hub
                    </h2>

                    <h3 className="mb-5 mt-3">Register</h3>
                    <Form className="mb-3" onSubmit={HandleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          onChange={HandleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={HandleChange}
                        />
                      </Form.Group>
                      <div className="mb-3">
                        <p className="small"></p>
                      </div>
                      <div></div>
                      <div className="d-grid text-center ">
                        <Button variant="primary" type="submit">
                          Register
                        </Button>
                      </div>
                    </Form>

                    {/* Modal for showing success or errors */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>{modalContent}</Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant={isSuccess ? "success" : "secondary"}
                          onClick={() => setShowModal(false)}
                        >
                          {isSuccess ? "OK" : "Close"}
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                ) : (
                  <div className="p-5 m-5 h">
                    <SpinnerBorder />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
