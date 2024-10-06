import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PictureUpload = ({ onUploadComplete, hide, location }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return onUploadComplete(null); // Call onUploadComplete with an empty string if no file is selected
    onUploadComplete(file);
  };

  return (
    <>
      <Form.Group className="mb-4 w-100">
        <Form.Label className="fw-bold">Picture</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
        <div className="text-center mt-3 ">
          <Button className="m-" onClick={handleUpload}>
            Submit
          </Button>
          {location ? (
            <Button variant="danger" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          ) : (
            <Button variant="danger" onClick={hide}>
              Cancel
            </Button>
          )}
        </div>
      </Form.Group>
    </>
  );
};

export default PictureUpload;
