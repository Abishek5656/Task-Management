// import React, { useEffect, useState } from "react";
// // import { requestApi } from "../../api/requestApi";
// import { Button } from "../../components/ui/Button";
// import { useNavigate } from "react-router-dom";

// export default function ManagerDashboard() {
//   const [list, setList] = useState([]);
//   const navigate = useNavigate();

// //   useEffect(() => {
// //     requestApi.getPending().then(res => setList(res.data.data));
// //   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Pending Approvals</h2>

//       <table border="1" width="100%" cellPadding={8}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Assigned To</th>
//             <th>Created By</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {list.map((r) => (
//             <tr key={r.id}>
//               <td>{r.id}</td>
//               <td>{r.title}</td>
//               <td>{r.assignedTo}</td>
//               <td>{r.createdBy}</td>
//               <td>AWAIT_MGR</td>

//               <td>
//                 <Button onClick={() => navigate(`/request/${r.id}`)}>View</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import Button from "../../components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // -------------------------
    // 🔹 Dummy Data (Replace API)
    // -------------------------
    const dummyData = [
      {
        id: 1,
        title: "Fix Login Bug",
        assignedTo: "Employee A",
        createdBy: "Employee X",
        managerStatus: "PENDING",
      },
      {
        id: 2,
        title: "Update Dashboard UI",
        assignedTo: "Employee B",
        createdBy: "Employee Y",
        managerStatus: "PENDING",
      },
      {
        id: 3,
        title: "Database Optimization",
        assignedTo: "Employee C",
        createdBy: "Employee Z",
        managerStatus: "PENDING",
      },
    ];

    setList(dummyData);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Pending Approvals</h2>

      <table border="1" width="100%" cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.title}</td>
              <td>{r.assignedTo}</td>
              <td>{r.createdBy}</td>
              <td>{r.managerStatus}</td>

              <td>
                <Button onClick={() => navigate(`/request/${r.id}`)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
