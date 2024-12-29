import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Upload.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/upload/uploading",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.fileName) {
        setMessage("File uploaded successfully!");
        console.log(response.data.fileName);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Failed to upload file.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Photo</h2>
      <p>
        Choose an image from your device and click "Upload" to add it to your gallery.
        After uploading, you can view all your uploaded photos by clicking the button below.
      </p>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleUpload} className="upload-form">
        <input type="file" onChange={handleFileChange} accept="image/*" className="file-input" />
        {preview && (
          <div className="preview">
            <img
              src={preview}
              alt="Preview"
              className="preview-image"
            />
          </div>
        )}
        <button type="submit" className="upload-button">Upload</button>
      </form>
      <Link to="/gallery" className="gallery-link">
        <button className="gallery-button">Go to Gallery</button>
      </Link>
    </div>
  );
};

export default Upload;
