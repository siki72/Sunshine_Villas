import React, { useState } from "react";
import { useEffect } from "react";

const UserToolKit = () => {
  const [tryUser, setTryUser] = useState(null);

  useEffect(() => {
    if (!tryUser) {
      fetch("https://alimissoum.app.3wa.io/profile", {
        credentials: "include",
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
      setTryUser(true);
    }
  }, [tryUser]);

  return <div></div>;
};

export default UserToolKit;
