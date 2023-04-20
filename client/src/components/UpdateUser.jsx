import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import utils from "../users/utilsFunctions.js";
const UpdateUser = ({ data, edit }) => {
  const [pending, setPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [showError, setShowError] = useState("");

  const formRef = useRef();

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstname",
      "lastname",
      "phone",
      "email",
      "location",
    ];

    for (const field of requiredFields) {
      if (!formRef.current[field].value) {
        setErrorMsg(true);
        setShowError(`Field ${field} cannot be empty`);
        return;
      }
    }
    setPending(true);
    try {
      const formData = utils.getFormData(formRef, [
        "firstname",
        "lastname",
        "phone",
        "email",
        "location",
      ]);
      const response = await fetch(`${import.meta.env.VITE_URL_USER}update`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          edit(false);
        })
        .finally(() => {
          setPending(false);
          window.location.reload(false);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login">
      <h1>Update your profile</h1>
      <form
        action=""
        method="post"
        ref={formRef}
        onChange={() => setShowError(false)}
        onSubmit={handleUpdateUser}
      >
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
        {errorMsg && <div className="show-error-msg">{showError}</div>}
        <div className="send-div">
          <button
            className={pending ? "send-notAllowed" : "btn send"}
            type="submit"
          >
            {pending ? "Saving datas.." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
