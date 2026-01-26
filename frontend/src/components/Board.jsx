export default function Board({ tasks }) {
  return (
    <>
      {tasks.map((task) => (
        <div key={task._id} className="board-task">
          <div className="board-task-inner">
            <strong className="task-title">{task.title}</strong>
            <p className="task-priority">{task.priority}</p>
          </div>
        </div>
      ))}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .board-task {
          margin: 8px 0;
          width: 100%;
        }

        .board-task-inner {
          padding: 12px 14px;
          border-radius: 14px;
          background: linear-gradient(145deg, rgba(108, 93, 211, 0.20), rgba(0, 0, 0, 0.25));
          border: 1px solid rgba(108, 93, 211, 0.40);
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
          transition: transform 0.2s ease, border 0.2s ease;
          width: 100%;
        }

        .board-task-inner:hover {
          transform: translateY(-3px);
          border: 1px solid rgba(120, 255, 168, 0.35);
        }

        .task-title {
          color: #fff;
          font-size: 16px;
          display: block;
          margin-bottom: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis; /* ✅ long title fix */
        }

        .task-priority {
          color: rgba(255, 255, 255, 0.75);
          font-size: 13px;
          margin: 0;
        }
      `}</style>
    </>
  );
}
