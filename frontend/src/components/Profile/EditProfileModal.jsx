import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EditUser } from "../../services/api.jsx";
import { useState } from "react";
import SpinnerBorder from "../../services/spinner.jsx";
import { DeleteUser } from "../../services/api.jsx";

const EditProfileModal = ({
  showModal,
  handleCloseModal,
  changeHandler,
  SubmitHandler,
  formData,
  logOff,
  handleShowModal,
}) => {
  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalContent, setDeleteModalContent] = useState("");
  const navigate = useNavigate();

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

  const DeleteHandler = async () => {
    setLoading(true);
    try {
      const response = await DeleteUser();
      if (response && response.status == 204) {
        localStorage.removeItem("jwt");
        setDeleteModalContent("Your account has been deleted");
        logOff();
        SubmitHandler();
      }
    } catch (error) {
      setDeleteModalContent("error occured");
    } finally {
      setLoading(false);
      setDeleteModal(true);
      handleShowModal();
    }
  };

  const closeDeleteModalAndRedirect = () => {
    handleCloseModal();
    navigate("/");
  };

  return (
    <>
      {deleteModal ? (
        <Modal
          show={deleteModal}
          onHide={deleteModal ? closeDeleteModalAndRedirect : handleCloseModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{deleteModalContent}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeDeleteModalAndRedirect} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loading ? (
              <SpinnerBorder />
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
                    name="profile_picture"
                    placeholder="Profile picture URL"
                    onChange={changeHandler}
                    autoComplete="profile_picture"
                    value={formData.profile_picture || ""}
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
      )}

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
