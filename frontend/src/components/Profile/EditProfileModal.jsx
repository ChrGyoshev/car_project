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
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false); // New state for delete confirmation modal
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
        logOff(); // Log the user off
        SubmitHandler(); // Perform any post-deletion actions
        setDeleteModal(true); // Show the delete success modal
      }
    } catch (error) {
      setDeleteModalContent("Error occurred");
      setDeleteModal(true); // Show delete error modal
    } finally {
      setLoading(false);
    }
  };

  const openDeleteConfirmationModal = () => {
    handleCloseModal(); // Close the Edit Profile modal
    setConfirmDeleteModal(true); // Show the delete confirmation modal
  };

  const closeDeleteConfirmationModal = () => {
    setConfirmDeleteModal(false); // Hide confirmation modal
  };

  const confirmDelete = () => {
    closeDeleteConfirmationModal();
    DeleteHandler(); // Proceed with delete if confirmed
  };

  const closeDeleteModalAndRedirect = () => {
    setDeleteModal(false); // Hide delete modal after confirmation
    navigate("/"); // Redirect user after closing delete modal
  };

  return (
    <>
      {/* Main Edit Modal */}
      <Modal show={showModal && !deleteModal} onHide={handleCloseModal} centered>
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
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            className="btn-sm"
          >
            Close
          </Button>
          <Button
            onClick={openDeleteConfirmationModal} // Trigger delete confirmation modal and close Edit modal
            variant="danger"
            className="btn-sm"
          >
            Delete Profile
          </Button>
          <Button
            onClick={Submitting}
            variant="primary"
            disabled={loading}
            className="btn-sm"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
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

      {/* Delete Confirmation Modal */}
      <Modal
        show={confirmDeleteModal} // Show modal for confirmation
        onHide={closeDeleteConfirmationModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeDeleteConfirmationModal}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDelete} // If confirmed, delete the profile
          >
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Success/Error Modal */}
      <Modal
        show={deleteModal} // Only show delete modal
        onHide={closeDeleteModalAndRedirect}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{deleteModalContent === "Error occurred" ? "Error" : "Success"}</Modal.Title>
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
    </>
  );
};

export default EditProfileModal;
