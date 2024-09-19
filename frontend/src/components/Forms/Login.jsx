import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { loginUser } from "../../services/api.jsx";
import SpinnerBorder from "../../services/spinner.jsx";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const response = await loginUser(formData);
      console.log("login success", response);
      localStorage.setItem("jwt", response.jwt);
      onLogin();
      navigate("/");
    } catch (error) {
      setModalTitle("Login Errors");
      setModalContent(
        <ul>
          <li>{error.detail}</li>
        </ul>
      );

      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Container className="height">
        <Row className=" d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border-2 border-dark border"></div>
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
                    <p className="mb-5">
                      Please enter your login and password!
                    </p>
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

                      <div className=" d-grid text-center">
                        <Button variant="primary" type="submit">
                          Login
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
                          variant={"secondary"}
                          onClick={() => setShowModal(false)}
                        >
                          {"Close"}
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Don't have an account?{" "}
                        <Link className="text-primary fw-bold" to={"/register"}>
                          {" "}
                          Sign Up
                        </Link>
                      </p>
                    </div>
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
