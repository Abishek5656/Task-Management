import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  approveRequest,
  rejectRequest
} from "../../store/pending/pendingSlice";
import { requestApi } from "../../api/requestApi";
import Button from "../../components/ui/Button.jsx";

export default function RequestDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reqData, setReqData] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    requestApi.getById(id).then((res) => setReqData(res.data.data));
  }, [id]);

  if (!reqData) return <p>Loading...</p>;

  const handleApprove = async () => {
    await dispatch(
      approveRequest({
        id,
        comment,
      })
    );
    navigate("/manager");
  };


  // -------- REJECT ----------
  const handleReject = async () => {
    await dispatch(
      rejectRequest({
        id,
        comment,
      })
    );
    navigate("/manager");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>
        Request #{id} – {reqData.title}
      </h2>

      <p><b>Assigned To:</b> {reqData.assignedTo}</p>
      <p><b>Created By:</b> {reqData.createdBy}</p>
      <p><b>Description:</b> {reqData.description}</p>

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
