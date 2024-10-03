import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const PictureUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);

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
        <div className="text-center mt-3">
          <Button onClick={handleUpload}>Submit</Button>
        </div>
      </Form.Group>
    </>
  );
};

export default PictureUpload;
