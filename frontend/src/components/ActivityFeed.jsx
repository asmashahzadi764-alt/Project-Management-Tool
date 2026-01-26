import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function ActivityFeed({ projectId }) {
  const { socket } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchActivities = async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await API.get(`/activity/project/${projectId}`);
      setActivities(res.data || []);
    } catch (err) {
      console.error("fetchActivities error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [projectId]);

  useEffect(() => {
    if (!socket || !projectId) return;
    const onRefresh = () => fetchActivities();
    socket.on("taskCreated", onRefresh);
    socket.on("commentAdded", onRefresh);
    socket.on("taskMoved", onRefresh);
    return () => {
      socket.off("taskCreated", onRefresh);
      socket.off("commentAdded", onRefresh);
      socket.off("taskMoved", onRefresh);
    };
  }, [socket, projectId]);

  return (
    <div style={{ width: 360, background: "#7e1e51", borderRadius: 8, padding: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
      <h4 style={{ marginTop: 0 }}>Activity</h4>
      {loading && <div>Loading...</div>}
      {!loading && activities.length === 0 && <div>No recent activity</div>}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {activities.map(a => (
          <li key={a._id} style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}>
            <div style={{ fontSize: 13, color: "#16978a" }}>
              {a.action.replace(/_/g, " ")}
            </div>
            <div style={{ fontSize: 12, color: "#8a1212" }}>
              {a.payload?.title || a.payload?.message || JSON.stringify(a.payload)}
            </div>
            <div style={{ fontSize: 11, color: "#d52121" }}>{new Date(a.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
