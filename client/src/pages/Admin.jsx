import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../users/UserContext.jsx";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faDatabase,
  faHouseUser,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import Villas_datas from "../components/Villas_datas.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Walima_datas from "../components/walima_datas.jsx";
import Users_table from "../components/Users_table.jsx";

const Admin = ({ logout }) => {
  const { user, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [showData1, setShowData1] = useState(false);
  const [showData2, setShowData2] = useState(false);
  const [showData3, setShowData3] = useState(false);
  const [showData4, setShowData4] = useState(false);
  const [showData5, setShowData5] = useState(false);
  const [dashboard, setDashboard] = useState(true);

  // a refactoriser
  const handleshow = (setShowData) => {
    return () => {
      setShowData1(false);
      setShowData2(false);
      setShowData3(false);
      setShowData4(false);
      setShowData5(false);
      setShowData(true);
      setDashboard(false);
    };
  };
  const handleShowDashboard = () => {
    setDashboard(true);
    setShowData1(false);
    setShowData2(false);
    setShowData3(false);
    setShowData4(false);
    setShowData5(false);
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
          <ul>
            <li
              onClick={handleShowDashboard}
              className={dashboard ? "li-active" : ""}
            >
              <FontAwesomeIcon icon={faDatabase} /> Dashboard
            </li>

            <li
              onClick={handleshow(setShowData1)}
              className={showData1 ? "li-active" : ""}
            >
              <FontAwesomeIcon icon={faHouseUser} /> <span>Villa 1 bed</span>
            </li>
            <li
              onClick={handleshow(setShowData2)}
              className={showData2 ? "li-active" : ""}
            >
              <FontAwesomeIcon icon={faHouseUser} />
              <span>Villa 2 bed</span>
            </li>
            <li
              onClick={handleshow(setShowData3)}
              className={showData3 ? "li-active" : ""}
            >
              <FontAwesomeIcon icon={faHouseUser} /> <span>Villa 3 bed</span>
            </li>
            <li
              onClick={handleshow(setShowData4)}
              className={showData4 ? "li-active" : ""}
            >
              <FontAwesomeIcon icon={faHouseUser} /> <span>Walima</span>
            </li>
            <li
              onClick={handleshow(setShowData5)}
              className={showData5 ? "li-active" : ""}
            >
              <FontAwesomeIcon icon={faUsers} /> <span>Users</span>
            </li>

            <li onClick={logout}>
              <FontAwesomeIcon icon={faArrowRightToBracket} />{" "}
              <span>Logout</span>
            </li>
          </ul>
        </div>
        <div className="datas">
          {dashboard && <Dashboard />}
          {showData1 && <Villas_datas id={1} />}
          {showData2 && <Villas_datas id={2} />}
          {showData3 && <Villas_datas id={3} />}
          {showData4 && <Walima_datas />}
          {showData5 && <Users_table />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
