import React, { useEffect, useState } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events").then(res => setEvents(res.data));
  }, []);

  return (
    <div>
      <ul>
        {events.map(event => (
          <li key={event._id} style={{marginBottom: "2rem", listStyle: "none"}}>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
            <p><b>Date:</b> {event.date ? new Date(event.date).toLocaleDateString() : ""}</p>
            {event.posterUrl && (
              <img src={event.posterUrl} alt="Poster" width={180} style={{marginBottom: "1rem"}}/>
            )}
            {event.videos && event.videos.map((url, i) => (
              <div key={i}>
                <a href={url} target="_blank" rel="noopener noreferrer">Video {i+1}</a>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
