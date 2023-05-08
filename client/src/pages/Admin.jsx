import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../users/UserContext.jsx";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faDatabase,
  faHouseUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import VillasDatas from "../components/VillasDatas.jsx";
import Dashboard from "../components/Dashboard.jsx";
import WalimaDatas from "../components/walimaDatas.jsx";
import UsersTable from "../components/UsersTable.jsx";
import VillasEditor from "../components/VillasEditor.jsx";

const Admin = ({ logout }) => {
  const { user, ready } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [redirect, setRedirect] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
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
              onClick={() => {
                handleTabClick("dashboard");
              }}
              className={activeTab === "dashboard" ? "li-active" : ""}
            >
              <FontAwesomeIcon className="icon-dash" icon={faDatabase} />{" "}
              <span>Dashboard</span>
            </li>

            <li
              onClick={() => handleTabClick("villa1")}
              className={activeTab === "villa1" ? "li-active" : ""}
            >
              <FontAwesomeIcon className="icon-dash" icon={faHouseUser} />{" "}
              <span>Villa 1 bed</span>
            </li>
            <li
              onClick={() => handleTabClick("villa2")}
              className={activeTab === "villa2" ? "li-active" : ""}
            >
              <FontAwesomeIcon className="icon-dash" icon={faHouseUser} />
              <span>Villa 2 bed</span>
            </li>
            <li
              onClick={() => handleTabClick("villa3")}
              className={activeTab === "villa3" ? "li-active" : ""}
            >
              <FontAwesomeIcon className="icon-dash" icon={faHouseUser} />{" "}
              <span>Villa 3 bed</span>
            </li>
            <li
              onClick={() => handleTabClick("villasEditor")}
              className={activeTab === "villasEditor" ? "li-active" : ""}
            >
              <FontAwesomeIcon className="icon-dash" icon={faHouseUser} />{" "}
              <span>Villas infos</span>
            </li>
            <li
              onClick={() => handleTabClick("walima")}
              className={activeTab === "walima" ? "li-active" : ""}
            >
              <FontAwesomeIcon className="icon-dash" icon={faHouseUser} />{" "}
              <span>Walima</span>
            </li>
            <li
              onClick={() => handleTabClick("users")}
              className={activeTab === "users" ? "li-active" : ""}
            >
              <FontAwesomeIcon className="icon-dash" icon={faUsers} />{" "}
              <span>Users</span>
            </li>

            <li onClick={logout}>
              <FontAwesomeIcon
                className="icon-dash"
                icon={faArrowRightToBracket}
              />{" "}
              <span>Logout</span>
            </li>
          </ul>
        </div>
        <div className="datas">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "villa1" && <VillasDatas id={1} />}
          {activeTab === "villa2" && <VillasDatas id={2} />}
          {activeTab === "villa3" && <VillasDatas id={3} />}
          {activeTab === "villasEditor" && <VillasEditor id={3} />}
          {activeTab === "walima" && <WalimaDatas />}
          {activeTab === "users" && <UsersTable />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
