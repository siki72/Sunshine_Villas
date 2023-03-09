import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      fetch("https://alimissoum.app.3wa.io/profile", {
        credentials: "include",
      })
        .then((resp) => resp.json())
        .then((data) => setUser(data));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
