import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../users/UserContext.jsx";
import { Navigate } from "react-router-dom";
const Admin = () => {
  const { user, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    // Rediriger l'utilisateur vers la page d'accueil s'il est connecté et qu'il accède à la page de connexion
    if (ready && user.role === "guest") {
      setRedirect(true);
    }

    return () => {};
  }, [user, ready]);

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome {user?.username}!</p>
      <p>You are currently viewing the admin page.</p>
    </div>
  );
};

export default Admin;
