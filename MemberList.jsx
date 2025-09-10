import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios.get("http://localhost:5000/api/members").then(res => setMembers(res.data));
  }, []);

  const handleEdit = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await axios.put(
        `http://localhost:5000/api/members/${id}`,
        { name: newName },
        { headers: { Authorization: auth.token } }
      );
      setMembers(members.map(m => m._id === id ? { ...m, name: newName } : m));
    }
  };

  return (
    <div>
      <h3>Church Members</h3>
      <ul>
        {members.map(member => (
          <li key={member._id} style={{marginBottom: "1rem", listStyle: "none"}}>
            {member.profilePic && <img src={member.profilePic} alt="Profile" width={60} style={{borderRadius: "30px"}}/>}
            <span style={{marginLeft: "1rem"}}>{member.name}</span>
            {(auth.role === "admin" || auth.role === "founder") ? (
              <button style={{marginLeft: "1rem"}} onClick={() => handleEdit(member._id)}>Edit</button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
