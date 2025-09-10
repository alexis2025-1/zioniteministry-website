import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Events from "./Event";
import Contact from "./Contact";
import GalleryPage from "./GalleryPage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PrayerRoom from "./PrayerRoom";

function App() {
  return (
    <Router>
      <header>
        <h1>Zionite Ministry International</h1>
      </header>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prayer-room" element={<PrayerRoom />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
