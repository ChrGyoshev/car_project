import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase"; // Adjust the path based on your folder structure

const PictureUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return onUploadComplete(""); // Call onUploadComplete with an empty string if no file is selected
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
  
      const url = await getDownloadURL(snapshot.ref);
      onUploadComplete(url); // Pass the URL back to the parent
    } catch (error) {
      console.error("Error uploading file:", error);
      onUploadComplete(""); // Indicate failure
    }
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
