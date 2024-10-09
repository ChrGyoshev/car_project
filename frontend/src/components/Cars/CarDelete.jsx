import { Modal, Button } from "react-bootstrap";
import { DeleteCarAPI } from "../../services/api";
import SpinnerBorder from "../../services/spinner";
import { useState } from "react";

export default function DeleteCar({ car, hide, updateCars }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [content, setContent] = useState(false);

  const deleteHandler = async () => {
    setLoading(true);
    try {
      const response = await DeleteCarAPI(car.id);
      setResult(response.data);
      updateCars(car, true);
    } catch (err) {
      setResult(err);
      console.log(err);
    } finally {
      setLoading(false);
      setContent(true);
    }
  };
  return (
    <Modal
      show={true} // Show modal for confirmation
      onHide={hide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <SpinnerBorder />
        ) : content ? (
          <p>{result}</p>
        ) : (
          <p>
            Are you sure you want to delete your{" "}
            <span className="fw-bold fst-italic">
              {car.make} {car.model}
            </span>
            ? This action cannot be undone.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>
          Cancel
        </Button>
        {!content && (
          <Button variant="danger" onClick={deleteHandler}>
            Yes, Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
