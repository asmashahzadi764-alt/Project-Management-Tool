import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [openNoti, setOpenNoti] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchNotifications = async () => {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    };

    if (user) {
      fetchProjects();
      fetchNotifications();
    }
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotiClick = async (n) => {
    await API.put(`/notifications/${n._id}/read`);

    setNotifications((prev) =>
      prev.map((x) => (x._id === n._id ? { ...x, read: true } : x))
    );

    navigate(`/task/${n.payload.taskId}`);
  };

  return (
    <>
      <div className="dashboard-page">
        <div className="dashboard-top">
          <div>
            <h2 className="dashboard-title">My Projects</h2>
            <p className="dashboard-subtitle">
              Welcome back, <b>{user?.name || "User"}</b>
            </p>
          </div>

          <div className="noti-wrapper">
            <div
              className="noti-icon"
              onClick={() => setOpenNoti(!openNoti)}
            >
              🔔
              {unreadCount > 0 && (
                <span className="noti-badge">{unreadCount}</span>
              )}
            </div>

            {openNoti && (
              <div className="noti-dropdown">
                {notifications.length === 0 ? (
                  <p className="noti-empty">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className={`noti-item ${n.read ? "read" : "unread"}`}
                      onClick={() => handleNotiClick(n)}
                    >
                      <b>{n.payload.title}</b>
                      <p>
                        Assigned by: <span>{n.payload.assignedBy}</span>
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="create-project" onClick={() => navigate("/create-project")}>
          + Create Project
        </div>

        {loading && <p className="info">Loading projects...</p>}
        {error && <p className="error">{error}</p>}

        <div className="project-grid">
          {!user && (
            <p className="info">
              Please <Link to="/">login</Link> to see your projects.
            </p>
          )}

          {user && !loading && projects.length === 0 && (
            <p className="info">No projects yet</p>
          )}

          {projects.map((project) => (
            <div
              key={project._id}
              className="project-card"
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ======= CSS (Same file) ======= */}
      <style>{`
        .dashboard-page {
          min-height: 100vh;
          padding: 30px;
          background: linear-gradient(135deg, #0b1220, #1f2a44);
          color: #fff;
        }

        .dashboard-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .dashboard-title {
          font-size: 28px;
          margin: 0;
          color: #fff;
        }

        .dashboard-subtitle {
          margin: 5px 0 0 0;
          color: rgba(255, 255, 255, 0.7);
        }

        .noti-wrapper {
          position: relative;
        }

        .noti-icon {
          font-size: 22px;
          cursor: pointer;
          position: relative;
        }

        .noti-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ff3b3b;
          color: #fff;
          border-radius: 50%;
          padding: 2px 7px;
          font-size: 12px;
        }

        .noti-dropdown {
          position: absolute;
          top: 35px;
          right: 0;
          width: 320px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 12px;
          padding: 10px;
          box-shadow: 0 3px 15px rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          z-index: 10;
        }

        .noti-empty {
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          padding: 10px 0;
        }

        .noti-item {
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
          margin-bottom: 8px;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .noti-item:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.12);
        }

        .noti-item.unread {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .noti-item.read {
          background: rgba(255, 255, 255, 0.06);
        }

        .noti-item p {
          margin: 6px 0 0 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
        }

        .create-project {
          margin-top: 15px;
          color: #a7b2ff;
          cursor: pointer;
          font-weight: 700;
        }

        .create-project:hover {
          text-decoration: underline;
        }

        .info {
          color: rgba(255, 255, 255, 0.7);
          margin-top: 15px;
        }

        .error {
          color: #ff6b6b;
          margin-top: 15px;
        }

        .project-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 20px;
        }

        .project-card {
          width: 250px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 16px;
          padding: 18px;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(0,0,0,0.25);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.12);
        }

        .project-card h3 {
          margin: 0;
          color: #a7b2ff;
        }

        .project-card p {
          color: rgba(255, 255, 255, 0.75);
          margin-top: 10px;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .project-card {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
