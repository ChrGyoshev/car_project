import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ProfilePictureUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      onUploadComplete(e); // Pass the selected file to the parent component
    } else {
      onUploadComplete(null);
    }
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
