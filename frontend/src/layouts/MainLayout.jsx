import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="brand">Asana Clone</h2>

        <div
          className={`menu ${isActive("/dashboard") ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          My Projects
        </div>

        <div
          className={`menu ${isActive("/create-project") ? "active" : ""}`}
          onClick={() => navigate("/create-project")}
        >
          + Create Project
        </div>
      </div>

      {/* Main Area */}
      <div className="main">
        {/* Navbar */}
        <div className="topbar">
          <div className="topbar-left">
            <span className="top-title">Dashboard</span>
          </div>

          <div className="topbar-right">
            <input className="search" placeholder="Search projects..." />
            <div className="avatar">A</div>
          </div>
        </div>

        {/* Page Content */}
        <div className="content">
          <Outlet />
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .layout {
          display: flex;
          height: 100vh;
          color: #fff;
          background: linear-gradient(180deg, #0f0f18, #07070b);
        }

        .sidebar {
          width: 240px;
          padding: 22px;
          background: linear-gradient(180deg, #1a1a2b, #141426);
          border-right: 1px solid rgba(108, 93, 211, 0.35);
        }

        .brand {
          margin: 0;
          font-size: 22px;
          color: #fff;
          letter-spacing: 0.5px;
          margin-bottom: 18px;
        }

        .menu {
          margin-top: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.10);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .menu:hover {
          transform: translateX(4px);
          background: rgba(108, 93, 211, 0.22);
          border-color: rgba(108, 93, 211, 0.55);
        }

        .menu.active {
          background: rgba(108, 93, 211, 0.35);
          border-color: rgba(108, 93, 211, 0.75);
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .topbar {
          height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          background: linear-gradient(180deg, #2a2a3d, #23233a);
          border-bottom: 1px solid rgba(108, 93, 211, 0.25);
        }

        .top-title {
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search {
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          outline: none;
        }

        .search:focus {
          border-color: rgba(108, 93, 211, 0.55);
          box-shadow: 0 0 14px rgba(108, 93, 211, 0.35);
        }

        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(108, 93, 211, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 800;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .content {
          padding: 20px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
