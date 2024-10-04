import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ProfilePictureUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    onUploadComplete(e); // Pass the selected file to the parent component
  };
  return (
    <>
      <Form.Group className="mb-4 w-100">
        <Form.Label className="fw-bold">Picture</Form.Label>
        <Form.Control
          type="file"
          name="profile_picture"
          onChange={handleFileChange}
        />
      </Form.Group>
    </>
  );
};

export default ProfilePictureUpload;
