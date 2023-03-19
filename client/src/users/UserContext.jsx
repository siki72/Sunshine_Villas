import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (!user) {
      fetch("https://alimissoum.app.3wa.io/profile", {
        credentials: "include", // renvoi tes cookie dans la req
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((data) => {
            setUser(data);
            if (data.role === "admin") {
              setIsAdmin(data);
            }
            setReady(true);
          });
        }
      });
    }
  }, []);
  console.log(user);
  console.log(isAdmin);

  return (
    <UserContext.Provider
      value={{ user, setUser, ready, setReady, isAdmin, setIsAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
}
