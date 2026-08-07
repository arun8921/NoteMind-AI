import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("notemind_token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    authApi.me(token)
      .then(({ user }) => setUser(user))
      .catch(() => { setToken(null); localStorage.removeItem("notemind_token"); })
      .finally(() => setLoading(false));
  }, [token]);

  const applySession = (data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("notemind_token", data.token);
  };

  const login = async (email, password) => applySession(await authApi.login(email, password));
  const register = async (name, email, password) => applySession(await authApi.register(name, email, password));
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("notemind_token");
  };
  const updateProfile = async (patch) => {
    const { user: updated } = await authApi.updateMe(token, patch);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
