import { Button, Modal, Form } from "react-bootstrap";
import { EditUser } from "../../services/api.jsx";

const EditProfileModal = ({
  showModal,
  handleCloseModal,
  changeHandler,
  SubmitHandler,
  formData,
}) => {
  const Submitting = async (e) => {
    e.preventDefault();
    EditUser(formData);

    SubmitHandler();
  };
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add form fields to edit profile information */}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
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
                type="profile_picture"
                placeholder="Profile picture URL"
                name="profile_picture"
                onChange={changeHandler}
                autoComplete="profile_picture"
                value={formData.profile_picture}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>

          <Button onClick={handleCloseModal} variant="danger">
            Delete Profile
          </Button>
          <Button onClick={Submitting} variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProfileModal;
