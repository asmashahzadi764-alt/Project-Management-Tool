import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await API.post("/auth/register", form);
      setSuccess("Registered successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="register-page">
        <div className="register-card">
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">Sign up to start your journey</p>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
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

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="login-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .register-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0b1220, #1f2a44);
          padding: 20px;
        }

        .register-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          padding: 30px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
        }

        .register-title {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 5px;
          text-align: center;
        }

        .register-subtitle {
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

        .success {
          background: rgba(79, 209, 197, 0.15);
          color: #4fd1c5;
          padding: 10px 12px;
          border-radius: 10px;
          margin-bottom: 15px;
          text-align: center;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .register-form input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          outline: none;
          transition: all 0.3s ease;
        }

        .register-form input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .register-form input:focus {
          border-color: rgba(120, 200, 255, 0.8);
          box-shadow: 0 0 0 3px rgba(120, 200, 255, 0.18);
        }

        .register-btn {
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

        .register-btn:hover {
          transform: translateY(-2px);
        }

        .register-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .login-text {
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin-top: 15px;
        }

        .login-text a {
          color: #fff;
          font-weight: 700;
        }
      `}</style>
    </>
  );
}
