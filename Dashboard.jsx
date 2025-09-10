import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import EventUploader from "./EventUploader";
import EventList from "./EventList";
import MemberList from "./MemberList";
import MemberAdder from "./MemberAdder";
import FileUploader from "./FileUploader";
import Gallery from "./Gallery";
import FinancialRecords from "./FinancialRecords";
import FinancialAdder from "./FinancialAdder";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);

  if (!auth.token) return <p>Please login</p>;

  return (
    <div>
      <h2>Dashboard ({auth.role})</h2>
      {(auth.role === "admin" || auth.role === "founder") && (
        <>
          <EventUploader onEventUploaded={() => setRefresh(!refresh)} />
          <EventList key={refresh}/>
          <MemberAdder onMemberAdded={() => setRefresh(!refresh)} />
          <MemberList key={refresh}/>
          <FileUploader onUploaded={() => setRefresh(!refresh)} />
          <Gallery key={refresh}/>
        </>
      )}
      {auth.role === "founder" && (
        <>
          <FinancialAdder onAdded={() => setRefresh(!refresh)} />
          <FinancialRecords key={refresh}/>
        </>
      )}
      {auth.role === "admin" && (
        <>
          <FinancialRecords key={refresh}/>
        </>
      )}
    </div>
  );
};

export default Dashboard;
