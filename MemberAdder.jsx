import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const MemberAdder = ({ onMemberAdded }) => {
  const { auth } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/api/members",
      { name, profilePic, email, phone },
      { headers: { Authorization: auth.token } }
    );
    setName(""); setProfilePic(""); setEmail(""); setPhone("");
    onMemberAdded && onMemberAdded();
    alert("Member added!");
  };

  return (
    <form onSubmit={handleAdd}>
      <h4>Add Member</h4>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder="Profile Pic URL" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
      <button type="submit">Add Member</button>
    </form>
  );
};

export default MemberAdder;
