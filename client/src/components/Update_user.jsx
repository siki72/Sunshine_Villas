import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../users/UserContext.jsx";
import utils from "../users/utilsFunctions.js";
const Update_user = () => {
  const { user } = useContext(UserContext); // je recupére la data de user depuis

  const formRef = useRef();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const formData = utils.getFormData(formRegisterRef, [
        "firstname",
        "lastname",
        "phone",
        "email",
        "location",
      ]);
      const response = await fetch(
        "https://alimissoum.app.3wa.io/user/update",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="update-container">
      <form action="" method="post" ref={formRef} onSubmit={handleUpdateUser}>
        <label htmlFor="firstname">First name</label>
        <input
          type="text"
          name="firstname"
          placeholder="First name"
          id="firstname"
        />

        <label htmlFor="lastname">Last name</label>
        <input
          type="text"
          name="lastname"
          placeholder="Last name"
          id="lastname"
        />

        <label htmlFor="phone">Phone</label>
        <input type="text" name="phone" placeholder="Phone" id="phone" />

        <label htmlFor="email">Email</label>
        <input type="text" name="email" placeholder="Email" id="email" />

        <label htmlFor="location">location</label>
        <input
          type="text"
          name="location"
          placeholder="location"
          id="location"
        />
        <button type="submit"></button>
        <input type="button" value="Reset" />
      </form>
    </div>
  );
};

export default Update_user;
