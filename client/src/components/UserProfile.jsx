import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import utils from "../users/utilsFunctions.js";
import UpdateUser from "./UpdateUser.jsx";
import { UserContext } from "../users/UserContext.jsx";
import PendingPage from "./PendingPage.jsx";
import { Alert } from "flowbite-react";

const UserProfile = () => {
  const [userDatas, setUserDatas] = useState([]);
  const [isEditing, setIsEditng] = useState(false);
  const [pending, setPendig] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const inputRef = useRef();
  const { setMailConfirmed, mailConfirmed } = useContext(UserContext);
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
        const errorDatas = {
          url: `${import.meta.env.VITE_URL_USER}user`,
          message: error.message,
          stackTrace: error.stack,
        };
        await utils.sendErrorDatas(errorDatas);
      }
    };
    getUserDarta();
  }, []);

  const handleSubmit = async (e) => {
    setPendig(true);
    try {
      e.preventDefault;
      const code = {
        code: inputRef.current.value,
      };
      const resposne = await fetch(
        `${import.meta.env.VITE_URL_USER}validation`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json ; charset=UTF-8",
          },
          body: JSON.stringify(code),
        }
      );
      if (resposne.status === 200) {
        setPendig(false);
        setMailConfirmed(true);
        setSuccess(true);
      } else {
        setPendig(false);
        setFailure(true);
      }
    } catch (error) {
      setPendig(false);
      const errorDatas = {
        url: `${import.meta.env.VITE_URL_USER}validation`,
        message: error.message,
        stackTrace: error.stack,
      };
      utils.sendErrorDatas(errorDatas);
    }
  };
  return (
    <>
      {pending && <PendingPage />}

      <div className="profile-container">
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

            <div className="send-div">
              <button className="btn send" onClick={() => setIsEditng(true)}>
                Edit
              </button>
            </div>
          </div>
        ) : (
          <UpdateUser data={userDatas} edit={setIsEditng} />
        )}
        {failure && (
          <Alert color="failure">
            <span>
              <span className="font-medium">Info alert! </span> invalid
              confirmation code, please try again
            </span>
          </Alert>
        )}
        {!userDatas.confirmed && !mailConfirmed && (
          <div className="confirmation-code" onClick={() => setFailure(false)}>
            <h2>confirmation code :</h2>
            <input
              className=""
              type="text"
              ref={inputRef}
              placeholder="Please Enter your confirmation code"
            />
            <button
              className="btn send-code"
              type="submit"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        )}
        {success && (
          <div className="success-div">
            <p>confirmation completed !</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
