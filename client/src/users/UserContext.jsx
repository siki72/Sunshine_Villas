import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [mailConfirmed, setMailConfirmed] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) {
          const resp = await fetch(`${import.meta.env.VITE_URL_USER}profile`, {
            credentials: "include",
          });
          if (resp.status === 200) {
            const data = await resp.json();
            setUser(data);
            if (data.role === "admin") {
              setIsAdmin(data);
            }
            if (data.confirmed) {
              setMailConfirmed(true);
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
      value={{
        user,
        setUser,
        ready,
        setReady,
        isAdmin,
        setIsAdmin,
        mailConfirmed,
        setMailConfirmed,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
