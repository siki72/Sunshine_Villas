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
          <h1>Your profile :</h1>
          <div className="row">
            <h2>Firstname :</h2>
            <p> {userDatas.firstname} </p>
          </div>
          <div className="row">
            <h2>Last name :</h2>
            <p> {userDatas.lastname} </p>
          </div>
          <div className="row">
            <h2>Email :</h2>
            <p> {userDatas.email} </p>
          </div>
          <div className="row">
            <h2>Phone :</h2>
            <p> {userDatas?.phone} </p>
          </div>
          <div className="row">
            <h2>Location :</h2>
            <p> {userDatas?.location} </p>
          </div>
          <button className="send" onClick={() => setIsEditng(true)}>
            Edit
          </button>
        </div>
      ) : (
        <Update_user data={userDatas} edit={setIsEditng} />
      )}
    </div>
  );
};

export default User_profile;
