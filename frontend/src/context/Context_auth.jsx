import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur connecté au démarrage
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Remplace par la vraie route de ton API Laravel qui renvoie l'utilisateur connecté (ex: auth()->user())
        const response = await fetch("http://localhost:8000/api/current-admin", {
          headers: {
            // Si tu utilises Passport ou Sanctum, ajoute le token ici :
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Contient : nom, role, dashboard, clients, produits, etc.
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'admin connecté", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return context;
}