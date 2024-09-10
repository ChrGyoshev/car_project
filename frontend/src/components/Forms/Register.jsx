import { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import Logo from "../../assets/main.png";
import { registerUser } from "../../services/api.jsx";
const Login = () => {
  const [formData, setFormData] = useState({});

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      // Handle successful response here
    } catch (err) {
      if (err.response && err.response.data) {
        // Extract the error messages from the response data
        const errorData = err.response.data;
        let errorMessage = "An error occurred.";

        // Check if there's an email error and get the message
        if (errorData.email && errorData.email.length > 0) {
          errorMessage = errorData.email[0];
        }

        // Log and/or display the error message
        console.log("Error:", errorMessage);
        alert(errorMessage); // Or set an error state to display in the UI
      } else {
        // Handle unexpected errors
        console.log("An unexpected error occurred:", err);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Container className="height mt-3">
        <Row className=" d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border-3 border-dark border"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-4">
                  <img
                    src={Logo}
                    width="60"
                    height="60"
                    className="d-inline-block align-top"
                    alt="MyGarageHub logo"
                  />
                  <h2 className="fw-bold text-uppercase mb-2">MyGarage Hub</h2>
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

                    <Form.Group className="mb-3" controlId="formBasicPassword">
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
                    <div className="d-grid text-center">
                      <Button variant="primary" type="submit">
                        Register
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
