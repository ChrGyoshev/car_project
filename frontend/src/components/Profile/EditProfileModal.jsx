import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EditUser } from "../../services/api.jsx";
import { useState } from "react";
import SpinnerBorder from "../../services/spinner.jsx";

const EditProfileModal = ({
  showModal,
  handleCloseModal,
  changeHandler,
  SubmitHandler,
  formData,
}) => {
  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const Submitting = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await EditUser(formData);

      if (response && response.status == 200) {
        SubmitHandler();
      } else {
        setError("API ERROR EDIT PROFILE");
        setErrorModal(true);
        handleCloseModal();
        console.error("API ERROR EDIT PROFILE");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const DeleteHandler = () => {
    console.log("deleting");
    setDeleteModal(true);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <SpinnerBorder />
          ) : deleteModal ? (
            <h2>Profile deleted</h2>
          ) : (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={changeHandler}
                  autoComplete="username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPicture">
                <Form.Label className="text-center">
                  Profile picture URL
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Profile picture URL"
                  name="profile_picture"
                  onChange={changeHandler}
                  autoComplete="profile_picture"
                  value={formData.profile_picture}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button onClick={DeleteHandler} variant="danger">
            Delete Profile
          </Button>
          <Button onClick={Submitting} variant="primary" disabled={loading}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={errorModal} onHide={() => setErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{error}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setErrorModal(false)} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProfileModal;
