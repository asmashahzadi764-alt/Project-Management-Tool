import { useEffect, useState } from "react";
import API from "../services/api";

export default function AddTaskModal({ projectId, close, setTasks, boards }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [boardId, setBoardId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (boards?.length > 0) {
      setBoardId(boards[0]._id);
    }
  }, [boards]);

  const addTask = async () => {
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }
    if (!boardId) {
      setError("Please select a board");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/tasks", {
        title,
        desc,
        projectId,
        boardId,
      });
      const newTask = res.data.task || res.data;
      setTasks((prev) => [newTask, ...prev]);
      close();
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-inner">
        <h2>Add New Task</h2>

        <label>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />

        <label>Task Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter task description"
        />

        <label>Choose Board</label>
        <select value={boardId} onChange={(e) => setBoardId(e.target.value)}>
          {boards?.length > 0 ? (
            boards.map((board) => (
              <option key={board._id} value={board._id}>
                {board.name || board.title || "Board"}
              </option>
            ))
          ) : (
            <option value="">Loading boards...</option>
          )}
        </select>

        {error && <p className="error">{error}</p>}

        <button onClick={addTask} disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
        <button className="cancel" onClick={close}>
          Cancel
        </button>
      </div>

      <style>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }
        .modal-inner {
          width: 420px;
          background: #1e1e2f;
          padding: 20px;
          border-radius: 18px;
          border: 1px solid rgba(108, 93, 211, 0.5);
          box-shadow: 0 12px 30px rgba(0,0,0,0.5);
          color: white;
        }
        input, textarea, select {
          width: 100%;
          margin-top: 8px;
          margin-bottom: 12px;
          padding: 10px;
          border-radius: 12px;
          border: 1px solid rgba(108, 93, 211, 0.6);
          background: rgba(0,0,0,0.4);
          color: white;
          outline: none;
        }
        select option {
          background: #1e1e2f;
          color: white;
        }
        button {
          width: 100%;
          padding: 12px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          margin-top: 10px;
          font-weight: 600;
          background: linear-gradient(135deg, #4fd1c5, #2a8cff);
          color: #fff;
          transition: opacity 0.2s ease;
        }
        button:hover {
          opacity: 0.9;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .cancel {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.4);
          color: rgba(255,255,255,0.8);
        }
        .error {
          color: #f7530d;
          margin-top: -6px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}
