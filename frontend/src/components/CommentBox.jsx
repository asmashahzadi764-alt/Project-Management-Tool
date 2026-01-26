import { useDrop } from "react-dnd";
import API from "../services/api";

export default function BoardColumn({ board, tasks }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: async (item) => {
      await API.put(`/tasks/move/${item.id}`, {
        boardId: board._id,
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: "30%",
        padding: "10px",
        background: isOver ? "#e53c3c" : "#5aac13",
        borderRadius: "8px",
        minHeight: "500px",
      }}
    >
      <h3>{board.name}</h3>
      {tasks.map((t) => (
        <div key={t._id}>
          <h4>{t.title}</h4>
          <p>{t.description}</p>
        </div>
      ))}
    </div>
  );
}
