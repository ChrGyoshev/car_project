import React from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

import styles from "./profiledetais.module.css";
import ProfileDefault from "../../assets/profile-default.png";
import { useState, useEffect } from "react";
import SpinnerBorder from "../../services/spinner";
import { Link } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";

const ProfileDetails = ({
  user,
  onUpdateUser,
  logOff,
  picture,
  setPicture,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [error, setError] = useState("Hardcoded error message");
  const [profilePicture, setProfilePicture] = useState(user.profile_picture);
  const [formData, setFormData] = useState([]);
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      profile_picture: user.profile_picture,
    });

    // setTimeout(() => {
    //   setLoadingImage(false);
    // }, 100);
  }, [user]);

  const SubmitHandler = () => {
    onUpdateUser(formData);

    handleCloseModal();
  };

  const changeHandler = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      const selectedFile = files[0];
      if (selectedFile) {
        setProfilePicture(selectedFile);
        const url = URL.createObjectURL(selectedFile);
        setPicture(url);
        setProfilePicture(url);
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedFile,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Update the value as before
      }));
    }
  };

  return (
    <>
      <Container className="container-main">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={7}>
            <Card className="text-center p-4 p-md-5 shadow-lg">
              <Card.Body>
                <div className={styles.profileFrame}>
                  {loadingImage && <SpinnerBorder />}
                  <img
                    key={profilePicture}
                    src={
                      picture
                        ? picture
                        : `https://car-project-1-v5k4.onrender.com${user.profile_picture}`

                      // picture ||
                      // (user.profile_picture
                      //   ? `https://car-project-1-v5k4.onrender.com${user.profile_picture}`
                      //   : ProfileDefault)
                    }
                    alt="User Profile Picture"
                    className="img-fluid mb-3"
                    style={{
                      display: loadingImage ? "none" : "block",
                    }}
                    onLoad={() => {
                      setLoadingImage(false), console.log("done");
                    }}
                  />
                </div>

                {/* Profile details section */}

                <div
                  className={`styles.profileDetails`}
                  style={{ display: loadingImage ? "none" : "block" }}
                >
                  {user.username ? (
                    <div className={styles.profileBox}>
                      <p className={styles.profileLabel}>Username</p>
                      <h5 className={styles.profileData}>{user.username}</h5>
                    </div>
                  ) : null}

                  <div className={styles.profileBox}>
                    <p className={styles.profileLabel}>Email</p>
                    <h5 className={styles.profileData}>{formData.email}</h5>
                  </div>
                </div>
              </Card.Body>

              <Card.Footer
                className={`${styles.footer}`}
                onClick={handleShowModal}
              >
                <Link className={styles.LinkTo}>Edit Profile</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      <EditProfileModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        handleCloseModal={handleCloseModal}
        changeHandler={changeHandler}
        SubmitHandler={SubmitHandler}
        formData={formData}
        setFormData={setFormData}
        logOff={logOff}
        profile_picture={profilePicture}
      />

      <Modal show="" onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Errors</Modal.Title>
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
