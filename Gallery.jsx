import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/media")
      .then(res => setMedia(res.data));
  }, []);

  return (
    <div className="media-grid">
      {media.map(item => (
        <div className="media-item" key={item._id}>
          {item.type === "image" ? (
            <img src={item.url} alt={item.description} width={200} />
          ) : (
            <video src={item.url} controls width={200} />
          )}
          <div style={{marginTop: "8px", fontSize: "14px"}}>{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
