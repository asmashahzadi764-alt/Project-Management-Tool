import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import API from "../services/api";

export default function BoardColumn({ board, tasks, setTasks, onEdit, onDelete }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    drop: async (item) => {
      const res = await API.put(`/tasks/move/${item.id}`, {
        boardId: board._id,
      });

      setTasks((prev) =>
        prev.map((t) => (t._id === item.id ? res.data : t))
      );
    },
  }));

  const filtered = tasks.filter((t) => {
    if (!t.boardId) return false;
    if (typeof t.boardId === "string") return t.boardId === board._id;
    return t.boardId._id === board._id;
  });

  return (
    <>
      <div
        ref={drop}
        className={`board-column ${isOver ? "hover" : ""}`}
      >
        <div className="board-header">
          <h3>{board.name}</h3>
          <span className="board-count">{filtered.length}</span>
        </div>

        {filtered.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <style>{`
        .board-column {
          width: 320px;
          padding: 14px;
          border-radius: 20px;
          background: linear-gradient(145deg, rgba(108, 93, 211, 0.18), rgba(0, 0, 0, 0.25));
          border: 1px solid rgba(108, 93, 211, 0.40);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(12px);
          transition: transform 0.2s ease, border 0.2s ease, background 0.2s ease;
        }

        .board-column.hover {
          transform: translateY(-4px);
          border: 1px solid rgba(120, 255, 168, 0.35);
          background: linear-gradient(145deg, rgba(120, 255, 168, 0.10), rgba(108, 93, 211, 0.18));
        }

        .board-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .board-header h3 {
          margin: 0;
          color: #fff;
          font-size: 18px;
          letter-spacing: 0.2px;
        }

        .board-count {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.10);
          border: 1px solid rgba(255,255,255,0.18);
        }
      `}</style>
    </>
  );
}
