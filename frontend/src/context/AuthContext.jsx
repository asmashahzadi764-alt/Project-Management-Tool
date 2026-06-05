import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    const fetchCurrent = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("fetchCurrent user failed:", err.response?.data || err.message);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrent();
  }, []);

  if (loading) return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#0b1220", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      color: "#fff",
      fontSize: "18px"
    }}>
      Loading...
    </div>
  );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
