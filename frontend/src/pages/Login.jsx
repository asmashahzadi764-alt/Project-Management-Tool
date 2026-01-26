import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Login to access your dashboard</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="register-text">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0b1220, #1f2a44);
          padding: 20px;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          padding: 30px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
        }

        .login-title {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 5px;
          text-align: center;
        }

        .login-subtitle {
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin-bottom: 20px;
        }

        .error {
          background: rgba(255, 0, 0, 0.1);
          color: #ff6b6b;
          padding: 10px 12px;
          border-radius: 10px;
          margin-bottom: 15px;
          text-align: center;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 12px;  /* ✅ proper spacing */
        }

        .login-form input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          outline: none;
          transition: all 0.3s ease;
        }

        .login-form input:focus {
          border-color: rgba(120, 200, 255, 0.8);
          box-shadow: 0 0 0 3px rgba(120, 200, 255, 0.18);
        }

        .login-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(135deg, #4fd1c5, #2a8cff);
          color: #fff;
          transition: transform 0.2s ease;
        }

        .login-btn:hover {
          transform: translateY(-2px);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .register-text {
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin-top: 15px;
        }

        .register-text a {
          color: #fff;
          font-weight: 700;
        }
      `}</style>
    </>
  );
}
