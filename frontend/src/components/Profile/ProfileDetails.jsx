import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import Logo from "../../assets/Logo.png";
import styles from "./profiledetais.module.css";
import ProfileDefault from "../../assets/profile-default.png";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";

const ProfileDetails = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [userName, setUserName] = useState(user.email.split("@")[0]);
  const [userEmail, setUserEmail] = useState(user.email);

  const [error, setError] = useState("Hardcoded error message");

  const [formData, setFormData] = useState([]);

  const SubmitHandler = () => {
    setUserName(formData.email.split("@")[0]);
    setUserEmail(formData.email);

    console.log(formData);
    handleCloseModal();
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
                  <h5 className="text-muted">{userName}</h5>
                </div>

                {/* Profile details section */}
                <div className={styles.profileDetails}>
                  <div className="mb-2">
                    <p>EMAIL</p>
                    <h5 className="text-muted">{userEmail}</h5>
                  </div>

                  {/* Add more profile details here */}
                </div>
                {/* Add more user details as needed */}
              </Card.Body>
              <Card.Footer>
                <Link
                  className={styles.LinkTo}
                  to="#"
                  onClick={handleShowModal}
                >
                  Edit Profile
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      <EditProfileModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        changeHandler={changeHandler}
        SubmitHandler={SubmitHandler}
      />

      <Modal show="" onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{error}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileDetails;
