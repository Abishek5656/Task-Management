import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingRequests } from "../../store/pending/pendingSlice";
import  Button  from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading } = useSelector((state) => state.pending);

  useEffect(() => {
    dispatch(fetchPendingRequests());
  }, [dispatch]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Pending Approvals</h2>

      {loading && <p>Loading...</p>}

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
              <td>{r.managerName}</td>
              <td>{r.createdByName}</td>

              {/* Manager Status: 1 = PENDING */}
              <td>{r.managerStatus === 1 ? "AWAIT_MGR" : r.managerStatus}</td>

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
