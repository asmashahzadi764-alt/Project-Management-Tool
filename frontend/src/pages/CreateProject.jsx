import { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleCreate = async () => {
    if (!user) {
      setError("User not authenticated");
      return;
    }

    if (title.trim() === "") {
      setError("Project title is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await API.post("/projects", {
        title: title.trim(),
        description: description.trim(),
      });

      console.log("Project Created:", res.data);

      setTitle("");
      setDescription("");

      navigate("/dashboard");
    } catch (err) {
      console.error("Create project error:", err.response?.data);
      setError(err.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="create-page">
        <div className="create-card">
          <h2 className="create-title">Create New Project</h2>
          <p className="create-subtitle">
            Add a project title and description to start.
          </p>

          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />

            <textarea
              placeholder="Project Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea"
            />
          </div>

          <button onClick={handleCreate} disabled={loading} className="btn">
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </div>

      {/* ======= CSS (Same file) ======= */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .create-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0b1220, #1f2a44);
          padding: 20px;
        }

        .create-card {
          width: 100%;
          max-width: 520px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          padding: 30px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
        }

        .create-title {
          font-size: 26px;
          margin: 0;
          color: #fff;
          text-align: center;
        }

        .create-subtitle {
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin: 8px 0 20px 0;
        }

        .error {
          background: rgba(255, 0, 0, 0.1);
          color: #ff6b6b;
          padding: 10px 12px;
          border-radius: 10px;
          margin-bottom: 15px;
          text-align: center;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 12px; /* ✅ spacing fix */
        }

        .input,
        .textarea {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          outline: none;
          transition: all 0.3s ease;
        }

        .input:focus,
        .textarea:focus {
          border-color: rgba(120, 200, 255, 0.8);
          box-shadow: 0 0 0 3px rgba(120, 200, 255, 0.18);
        }

        .textarea {
          min-height: 120px;
          resize: vertical;
        }

        .btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(135deg, #4fd1c5, #2a8cff);
          color: #fff;
          transition: transform 0.2s ease;
          margin-top: 15px;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </>
  );
}
