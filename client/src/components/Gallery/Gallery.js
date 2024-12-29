import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Gallery.css";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/gallery/photos"
        );
        setPhotos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setError("Failed to fetch photos.");
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="gallery-container">
      <h2>Photo Gallery</h2>
      <p>
        Explore the collection of photos you have uploaded. Click on any image
        to view it in full size.
      </p>
      {loading ? (
        <p>Loading photos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="gallery-grid">
          {photos.map((photo) => (
            <div key={photo._id} className="gallery-item">
              <img
                src={`data:${photo.contentType};base64,${photo.imageBase64}`}
                alt={photo.filename}
                className="gallery-image"
              />
            </div>
          ))}
        </div>
      )}
      <Link to="/" className="home-link">
        <button className="home-button">Go to Home/Upload pictures</button>
      </Link>
    </div>
  );
};

export default Gallery;
