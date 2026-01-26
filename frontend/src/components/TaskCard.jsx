import { useDrag } from "react-dnd";

export default function TaskCard({ task, onEdit, onDelete }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div
        ref={drag}
        className={`task-card ${isDragging ? "dragging" : ""}`}
      >
        <div className="task-top">
          <h4 className="task-title">{task.title}</h4>
          <span className="task-badge">{task.status || "Pending"}</span>
        </div>

        <p className="task-desc">{task.description}</p>

        <div className="task-actions">
          <button className="btn edit" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="btn delete" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>

      <style>{`
        .task-card {
          padding: 16px 18px;
          margin: 12px 0;
          background: linear-gradient(145deg, rgba(108, 93, 211, 0.22), rgba(0, 0, 0, 0.25));
          border: 1px solid rgba(108, 93, 211, 0.40);
          border-radius: 18px;
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.55);
          transition: transform 0.25s ease, background 0.25s ease, border 0.25s ease;
          backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
        }

        .task-card::before {
          content: "";
          position: absolute;
          top: -40%;
          left: -40%;
          width: 180%;
          height: 180%;
          background: radial-gradient(circle at center, rgba(108, 93, 211, 0.35), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .task-card:hover::before {
          opacity: 1;
        }

        .task-card:hover {
          transform: translateY(-4px) scale(1.01);
          border: 1px solid rgba(108, 93, 211, 0.60);
          background: linear-gradient(145deg, rgba(108, 93, 211, 0.28), rgba(0, 0, 0, 0.28));
        }

        .dragging {
          opacity: 0.55;
          transform: scale(0.98);
        }

        .task-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .task-title {
          margin: 0;
          color: #fff;
          font-size: 18px;
          letter-spacing: 0.3px;
        }

        .task-badge {
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.9);
        }

        .task-desc {
          margin: 10px 0 14px;
          color: rgba(255, 255, 255, 0.75);
          font-size: 14px;
          line-height: 1.5;
        }

        .task-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .btn {
          padding: 9px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          cursor: pointer;
          font-weight: 700;
          letter-spacing: 0.2px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          backdrop-filter: blur(8px);
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
        }

        .btn.edit {
          border-color: rgba(120, 255, 168, 0.45);
          background: rgba(120, 255, 168, 0.12);
        }

        .btn.delete {
          border-color: rgba(90, 118, 255, 0.45);
          background: rgba(255, 90, 90, 0.12);
        }
      `}</style>
    </>
  );
}
