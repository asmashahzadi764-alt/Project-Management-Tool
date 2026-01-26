import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BoardColumn from "../components/BoardColumn";
import AddTaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";

import { io } from "socket.io-client";

export default function ProjectBoard() {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [boards, setBoards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.emit("joinProject", id);

    socket.on("refreshTasks", async () => {
      const res = await API.get(`/tasks/${id}`);
      setTasks(res.data);
    });

    return () => socket.disconnect();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const boardRes = await API.get(`/boards/${id}`);
      setBoards(boardRes.data);

      const taskRes = await API.get(`/tasks/${id}`);
      setTasks(taskRes.data);
    };

    fetchData();
  }, [id]);

  const handleEdit = (task) => setEditingTask(task);

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
  };

  const handleDeleteTask = async (taskId) => {
    await API.delete(`/tasks/${taskId}`);   // ✅ Correct URL
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
  };

  return (
    <>
      <div className="board-page">
        <div className="board-header">
          <div>
            <h2 className="board-title">Project Board</h2>
            <p className="board-subtitle">
              Drag & drop tasks to move between stages
            </p>
          </div>

          <div className="board-actions">
            <button className="btn btn-secondary" onClick={() => setShowAddModal(true)}>
              + Add Task
            </button>
          </div>
        </div>

        <DndProvider backend={HTML5Backend}>
          <div className="board-grid">
            {boards.map((board) => (
              <BoardColumn
                key={board._id}
                board={board}
                tasks={tasks}
                setTasks={setTasks}
                onEdit={handleEdit}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </DndProvider>
      </div>

      {showAddModal && (
        <AddTaskModal
          projectId={id}
          boards={boards}
          close={() => setShowAddModal(false)}
          setTasks={setTasks}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          close={() => setEditingTask(null)}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}

      {/* ======= CSS (Same file) ======= */}
      <style>{`
        .board-page {
          min-height: 100vh;
          padding: 25px;
          background: linear-gradient(135deg, #0b1220, #1f2a44);
          color: #fff;
        }

        .board-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .board-title {
          margin: 0;
          font-size: 28px;
        }

        .board-subtitle {
          margin: 5px 0 0 0;
          color: rgba(255, 255, 255, 0.7);
        }

        .board-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .btn {
          padding: 10px 16px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: linear-gradient(135deg, #4fd1c5, #2a8cff);
          color: #fff;
        }

        .board-grid {
          display: flex;
          gap: 18px;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        /* Hide scrollbar */
        .board-grid::-webkit-scrollbar {
          height: 8px;
        }
        .board-grid::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }

        @media (max-width: 768px) {
          .board-grid {
            gap: 14px;
          }
        }
      `}</style>
    </>
  );
}
