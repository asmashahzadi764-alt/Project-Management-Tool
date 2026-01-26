import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchCurrent = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("fetchCurrent user failed:", err.response?.data || err.message);
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    fetchCurrent();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
