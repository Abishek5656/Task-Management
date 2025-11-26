// import React, { useEffect, useState } from "react";
// import { requestApi } from "../../api/requestApi";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "../../components/ui/Button";

// export default function RequestDetailsPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [reqData, setReqData] = useState(null);
//   const [comment, setComment] = useState("");

//   useEffect(() => {
//     requestApi.getById(id).then(res => setReqData(res.data.data));
//   }, [id]);

//   if (!reqData) return <p>Loading...</p>;

//   const handleApprove = async () => {
//     await requestApi.approve(id, comment);
//     navigate("/manager");
//   };

//   const handleReject = async () => {
//     await requestApi.reject(id, comment);
//     navigate("/manager");
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Request #{id} – {reqData.title}</h2>

//       <p><b>Assigned To:</b> {reqData.assignedTo}</p>
//       <p><b>Created By:</b> {reqData.createdBy}</p>
//       <p><b>Description:</b> {reqData.description}</p>

//       <div style={{ marginTop: 20 }}>
//         <label>Manager Comment:</label>
//         <br />
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           style={{ width: "100%", height: 80 }}
//         />
//       </div>

//       <div style={{ marginTop: 20 }}>
//         <Button onClick={handleReject} style={{ marginRight: 10 }}>Reject</Button>
//         <Button onClick={handleApprove}>Approve</Button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import  Button  from "../../components/ui/Button";

export default function RequestDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reqData, setReqData] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // -------------------------
    // 🔹 Dummy Request Details
    // -------------------------
    const dummyRequests = [
      {
        id: "1",
        title: "Fix Login Bug",
        assignedTo: "Employee A",
        createdBy: "Employee X",
        description: "The login button does not redirect properly.",
      },
      {
        id: "2",
        title: "Update Dashboard UI",
        assignedTo: "Employee B",
        createdBy: "Employee Y",
        description: "Improve layout, spacing, and chart alignment.",
      },
      {
        id: "3",
        title: "Database Optimization",
        assignedTo: "Employee C",
        createdBy: "Employee Z",
        description: "Slow queries need indexing improvements.",
      },
    ];

    const found = dummyRequests.find((req) => req.id === id);
    setReqData(found);
  }, [id]);

  if (!reqData) return <p>Loading...</p>;

  const handleApprove = () => {
    console.log("Approved:", { id, comment });
    navigate("/manager");
  };

  const handleReject = () => {
    console.log("Rejected:", { id, comment });
    navigate("/manager");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>
        Request #{id} – {reqData.title}
      </h2>

      <p>
        <b>Assigned To:</b> {reqData.assignedTo}
      </p>
      <p>
        <b>Created By:</b> {reqData.createdBy}
      </p>
      <p>
        <b>Description:</b> {reqData.description}
      </p>

      <div style={{ marginTop: 20 }}>
        <label>Manager Comment:</label>
        <br />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: "100%", height: 80 }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <Button onClick={handleReject} style={{ marginRight: 10 }}>
          Reject
        </Button>
        <Button onClick={handleApprove}>Approve</Button>
      </div>
    </div>
  );
}

