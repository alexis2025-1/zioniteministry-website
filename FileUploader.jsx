import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const FileUploader = ({ onUploaded }) => {
  const { auth } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("image");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("description", description);

    try {
      await axios.post(
        "http://localhost:5000/api/media/upload",
        formData,
        {
          headers: {
            Authorization: auth.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFile(null);
      setType("image");
      setDescription("");
      setLoading(false);
      if (onUploaded) onUploaded();
      alert("File uploaded!");
    } catch (err) {
      setLoading(false);
      alert("Upload failed.");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <h4>Upload Media File</h4>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      <input type="file" accept={type === "image" ? "image/*" : "video/*"} onChange={handleFileChange} required />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
    </form>
  );
};

export default FileUploader;
