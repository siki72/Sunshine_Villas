import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../users/UserContext.jsx";
import {
  faArrowRightFromBracket,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import MyBookings from "./MyBookings.jsx";
import Admin from "./Admin.jsx";
import UserProfile from "../components/UserProfile.jsx";

const Account = () => {
  const { pages } = useParams();
  const { user, ready, setUser, isAdmin, setIsAdmin } = useContext(UserContext);
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  const handleLogout = () => {
    fetch(`${import.meta.env.VITE_URL_USER}logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      setUser(null);
      setIsAdmin(null);
    });
  };

  function linkClasses(type = null) {
    let classes = "link";
    if (type === pages || (pages === undefined && type === "")) {
      classes += " active-nav";
    }
    return classes;
  }
  return (
    <div id="#" className="account-container">
      <div className="container">
        <div className="header-img"></div>
        {!isAdmin && (
          <nav className="nav-book">
            <Link className={linkClasses("")} to={"/account"}>
              <FontAwesomeIcon icon={faUser} />
              <span> My profile</span>
            </Link>
            <Link className={linkClasses("bookings")} to={"/account/bookings"}>
              <FontAwesomeIcon icon={faHouse} />
              <span>My Bookings</span>
            </Link>
            <button onClick={handleLogout}>
              Logout{" "}
              <span>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </span>
            </button>
          </nav>
        )}
        {pages === "dashboard" && <Admin logout={handleLogout} />}

        {pages === undefined && <UserProfile />}
        {pages === "bookings" && <MyBookings />}
      </div>
    </div>
  );
};

export default Account;
