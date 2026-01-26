import { useEffect, useState } from "react";
import API from "../services/api";

export default function CommentSection({ taskId }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/comments/${taskId}`);
        setComments(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) fetchComments();
  }, [taskId]);

  // Add comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await API.post("/comments", {
        taskId,
        message,
      });

      setComments((prev) => [...prev, res.data]);
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Comments</h3>

      {loading && <p>Loading comments...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Comments List */}
      <div style={{ maxHeight: "250px", overflowY: "auto", marginBottom: "10px" }}>
        {comments.map((c) => (
          <div
            key={c._id}
            style={{
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          >
            <b>{c.userId?.name || "Unknown"}</b>
            <p style={{ margin: "5px 0" }}>{c.message}</p>
            <small>{new Date(c.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
          style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
        />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "#6C5DD3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}
