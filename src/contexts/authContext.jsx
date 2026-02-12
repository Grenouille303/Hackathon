import { createContext, useContext, useEffect, useState } from "react";

const apiURL = "";
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // données user
  const [token, setToken] = useState(null); // JWT
  const [loading, setLoading] = useState(true); // vérif initiale

  // Au montage, on vérifie le localStorage et on fetch le profil complet si token
  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) return setLoading(false);

      try {
        const res = await fetch(apiURL + "/api/users/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (!res.ok) throw new Error("Token invalide ou expiré");

        const data = await res.json();
        setUser(data);
        setToken(storedToken);
        localStorage.setItem("user", JSON.stringify(data)); // on synchronise
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    // localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user & !loading,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
