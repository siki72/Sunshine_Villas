import React, { useState } from "react";
import { useEffect } from "react";
import utils from "../users/utilsFunctions.js";
import Update_user from "./Update_user.jsx";

const User_profile = () => {
  const [userDatas, setUserDatas] = useState([]);
  const [isEditing, setIsEditng] = useState(false);
  useEffect(() => {
    const getUserDarta = async () => {
      try {
        const response = await utils.fetchUserDatas("user");
        if (!response.ok) {
          throw new Error("unable to login");
        } else {
          const user = await response.json();
          setUserDatas(user[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserDarta();
  }, []);
  return (
    <div>
      {!isEditing ? (
        <div className="login">
          <h3>Your profile</h3>
          <div className="row">
            <h4>Firstname</h4>
            <p> {userDatas.firstname} </p>
          </div>
          <div className="row">
            <h4>Last name</h4>
            <p> {userDatas.lastname} </p>
          </div>
          <div className="row">
            <h4>Email</h4>
            <p> {userDatas.email} </p>
          </div>
          <div className="row">
            <h4>Phone</h4>
            <p> {userDatas?.phone} </p>
          </div>
          <div className="row">
            <h4>Location</h4>
            <p> {userDatas?.location} </p>
          </div>
          <button onClick={() => setIsEditng(true)}>Edit</button>
        </div>
      ) : (
        <Update_user data={userDatas} edit={setIsEditng} />
      )}
    </div>
  );
};

export default User_profile;
