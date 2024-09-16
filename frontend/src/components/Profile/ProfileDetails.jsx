import React from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import Logo from "../../assets/Logo.png";
import styles from "./profiledetais.module.css";
import ProfileDefault from "../../assets/profile-default.png";
import { useState } from "react";

import { Link } from "react-router-dom";

const ProfileDetails = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Container className="container-main">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={7}>
            <Card className="text-center p-4 p-md-5 shadow-lg">
              <Card.Body>
                <div className={styles.profileFrame}>
                  <img
                    src={ProfileDefault} // Use default if no image
                    alt="User Profile Picture"
                    className="img-fluid mb-3"
                    style={{ maxWidth: "150px", borderRadius: "50%" }} // Rounded profile image
                  />
                </div>

                <div className="mb-2">
                  <p>USERNAME</p>
                  <h5 className="text-muted">Krischan</h5>
                </div>

                {/* Profile details section */}
                <div className={styles.profileDetails}>
                  <div className="mb-2">
                    <p>EMAIL</p>
                    <h5 className="text-muted">krischan@abv.bg</h5>
                  </div>

                  {/* Add more profile details here */}
                </div>
                {/* Add more user details as needed */}
              </Card.Body>
              <Card.Footer>
                <Link className={styles.LinkTo} to="#" onClick={handleShowModal}>
                  Edit Profile
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add form fields to edit profile information */}
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                defaultValue="Krischan"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                defaultValue="krischan@abv.bg"
              />
            </div>

            {/* Add more fields as necessary */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileDetails;
