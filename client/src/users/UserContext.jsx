import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      fetch("https://alimissoum.app.3wa.io/profile", {
        credentials: "include", // renvoi tes cookie dans la req
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((data) => {
            setUser(data);
            setReady(true);
          });
        }
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  );
}
