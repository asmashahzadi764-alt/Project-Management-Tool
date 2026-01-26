import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function NotificationBell() {
  const { user, socket } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const res = await API.get("/notifications");
        setNotifications(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    const handler = (n) => {
      setNotifications((prev) => [n, ...(prev || [])]);
    };

    socket.on("notification", handler);
    return () => socket.off("notification", handler);
  }, [socket]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{ position: "relative" }}>
        🔔
        {unreadCount > 0 && (
          <span style={{ color: "red" }}> ({unreadCount})</span>
        )}
      </button>

      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "30px",
          width: 320,
          background: "white",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          zIndex: 50
        }}>
          <div style={{ padding: 10 }}>
            <h4>Notifications</h4>
            {notifications.length === 0 && <p>No notifications</p>}

            {notifications.map(n => (
              <div key={n._id} style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                <div style={{ fontSize: 13 }}>{n.type}</div>
                <div style={{ fontSize: 12, color: "#444" }}>
                  {n.payload?.title || n.payload?.message}
                </div>
                <div style={{ marginTop: 6 }}>
                  {!n.read && <button onClick={() => markRead(n._id)}>Mark read</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
