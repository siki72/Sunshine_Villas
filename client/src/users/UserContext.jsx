import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) {
          const resp = await fetch(`${import.meta.env.VITE_URL_USER}profile`, {
            credentials: "include", // renvoi tes cookie dans la req
          });

          if (resp.status === 200) {
            const data = await resp.json();
            setUser(data);
            if (data.role === "admin") {
              setIsAdmin(data);
            }
            setReady(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, ready, setReady, isAdmin, setIsAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
}
