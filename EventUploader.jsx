import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const EventUploader = ({ onEventUploaded }) => {
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [videos, setVideos] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/api/events",
      { title, description, date, posterUrl, videos: videos.split(",") },
      { headers: { Authorization: auth.token } }
    );
    setTitle(""); setDescription(""); setDate(""); setPosterUrl(""); setVideos("");
    onEventUploaded && onEventUploaded();
    alert("Event uploaded!");
  };

  return (
    <form onSubmit={handleUpload}>
      <h4>Upload New Event</h4>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input value={posterUrl} onChange={e => setPosterUrl(e.target.value)} placeholder="Poster/Image URL" />
      <input value={videos} onChange={e => setVideos(e.target.value)} placeholder="Video URLs (comma separated)" />
      <button type="submit">Upload Event</button>
    </form>
  );
};

export default EventUploader;
