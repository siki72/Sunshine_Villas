import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../users/UserContext.jsx";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faHouseUser,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import Villas_datas from "../components/Villas_datas.jsx";
import Dashboard from "../components/Dashboard.jsx";

const Admin = () => {
  const { user, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [showData1, setShowData1] = useState(false);
  const [showData2, setShowData2] = useState(false);
  const [showData3, setShowData3] = useState(false);
  const [dashboard, setDashboard] = useState(true);
  // a refactoriser
  const handleshow = (setShowData) => {
    return () => {
      setShowData1(false);
      setShowData2(false);
      setShowData3(false);
      setShowData(true);
      setDashboard(false);
    };
  };
  const handleShowDashboard = () => {
    setDashboard(true);
    setShowData1(false);
    setShowData2(false);
    setShowData3(false);
  };

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
    <div className="admin-page">
      <div className="admin-container">
        <div className="dashboard">
          <h2>Weclom Admin</h2>
          <ul>
            <li onClick={handleShowDashboard}>
              <FontAwesomeIcon icon={faDatabase} /> Dashboard
            </li>

            <li onClick={handleshow(setShowData1)}>
              <FontAwesomeIcon icon={faHouseUser} /> <span>Villa 1 bed</span>
            </li>
            <li onClick={handleshow(setShowData2)}>
              <FontAwesomeIcon icon={faHouseUser} />
              <span>Villa 2 bed</span>
            </li>
            <li onClick={handleshow(setShowData3)}>
              <FontAwesomeIcon icon={faHouseUser} /> <span>Villa 3 bed</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faUtensils} /> <span>Walima </span>
            </li>
            <li>
              <FontAwesomeIcon icon={faUsers} /> <span>Guests</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faUsers} /> <span>Logout</span>
            </li>
          </ul>
        </div>
        <div className="datas">
          {dashboard && <Dashboard />}
          {showData1 && <Villas_datas id={1} />}
          {showData2 && <Villas_datas id={2} />}
          {showData3 && <Villas_datas id={3} />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
