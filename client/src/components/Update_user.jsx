import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { UserContext } from "../users/UserContext.jsx";
import utils from "../users/utilsFunctions.js";
const Update_user = ({ data, edit }) => {
  const [pending, setPending] = useState(false);

  const formRef = useRef();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const formData = utils.getFormData(formRef, [
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
        .then((data) => edit(false))
        .finally(() => setPending(false));
    } catch (err) {
      console.error(err);
    }
  };

  console.log(data);

  return (
    <div className="login">
      <h3>Update your profile</h3>
      <form action="" method="post" ref={formRef} onSubmit={handleUpdateUser}>
        <div className="row">
          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            name="firstname"
            defaultValue={data?.firstname}
            id="firstname"
          />
        </div>
        <div className="row">
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            name="lastname"
            defaultValue={data?.lastname}
            id="lastname"
          />
        </div>
        <div className="row">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            defaultValue={data?.phone}
            id="phone"
          />
        </div>

        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            defaultValue={data?.email}
            id="email"
          />
        </div>
        <div className="row">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={data?.location}
            id="location"
          />
        </div>
        <button className={pending ? "send-notAllowed" : "send"} type="submit">
          {pending ? "Saving datas.." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default Update_user;
