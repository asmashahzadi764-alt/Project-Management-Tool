import { useState } from "react";
import API from "../services/api";

export default function EditTaskModal({ task, close, onUpdate, onDelete }) {
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);

  const editTask = async () => {
    const res = await API.put(`/tasks/${task._id}`, {
      title,
      description: desc,
    });

    onUpdate(res.data);
    close();
  };

  const deleteTask = async () => {
    await API.delete(`/tasks/${task._id}`);
    onDelete(task._id);
    close();
  };

  return (
    <>
      <div className="modal-overlay" onClick={close}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Edit Task</h3>
            <button className="close-btn" onClick={close}>
              ✕
            </button>
          </div>

          <div className="modal-body">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />

            <label>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="textarea"
            />
          </div>

          <div className="modal-actions">
            <button className="btn update" onClick={editTask}>
              Update
            </button>
            <button className="btn delete" onClick={deleteTask}>
              Delete
            </button>
            <button className="btn close" onClick={close}>
              Close
            </button>
          </div>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;   /* ✅ Important fix */
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal-box {
          width: 420px;
          max-width: 95%;  /* ✅ Mobile friendly */
          padding: 18px;
          border-radius: 20px;
          background: linear-gradient(145deg, rgba(108, 93, 211, 0.22), rgba(0, 0, 0, 0.28));
          border: 1px solid rgba(108, 93, 211, 0.45);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(12px);
          position: relative;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .modal-header h3 {
          margin: 0;
          color: #fff;
          font-size: 20px;
        }

        .close-btn {
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
          cursor: pointer;
        }

        .modal-body {
          display: flex;
          flex-direction: column;
          gap: 10px; /* ✅ Proper spacing */
        }

        .modal-body label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
        }

        .input, .textarea {
          width: 100%;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          outline: none;
        }

        .textarea {
          min-height: 90px;
          resize: vertical;
        }

        .input:focus, .textarea:focus {
          border-color: rgba(108, 93, 211, 0.65);
          box-shadow: 0 0 12px rgba(108, 93, 211, 0.35);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 14px;
        }

        .btn {
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          cursor: pointer;
          font-weight: 700;
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 22px rgba(0, 0, 0, 0.35);
        }

        .btn.update {
          border-color: rgba(120, 255, 168, 0.45);
          background: rgba(120, 255, 168, 0.12);
        }

        .btn.delete {
          border-color: rgba(255, 90, 90, 0.45);
          background: rgba(255, 90, 90, 0.12);
        }

        .btn.close {
          border-color: rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </>
  );
}
