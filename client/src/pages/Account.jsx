import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link, Navigate, NavLink, useParams } from "react-router-dom";
import { UserContext } from "../users/UserContext.jsx";
import {
  faArrowRightFromBracket,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Account = () => {
  const { pages } = useParams();
  console.log(pages);

  const { user, ready } = useContext(UserContext);
  if (!ready) {
    return "loading";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  const handleTestMe = () => {
    fetch("https://alimissoum.app.3wa.io/testme", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };

  const handleLogout = () => {
    fetch("https://alimissoum.app.3wa.io/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };

  function linkClasses(type = null) {
    let classes = "link";
    if (type === pages || (pages === undefined && type === "")) {
      classes += " active-nav";
    }
    return classes;
  }
  return (
    <div className="account-container">
      <div className="container">
        <div
          style={{
            backgroundImage: `url(./img/home/login.jpeg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="header-img"
        ></div>
        <nav className="nav-book">
          <Link className={linkClasses("")} to={"/account"}>
            <FontAwesomeIcon icon={faUser} />
            <span> My profile</span>
          </Link>
          <Link className={linkClasses("bookings")} to={"/account/bookings"}>
            <FontAwesomeIcon icon={faHouse} />
            <span>My Booking</span>
          </Link>
        </nav>
        {pages === undefined && (
          <div className="login">
            <h2>Welcome Home {user.name} ..</h2>
            logged in as {user.name} {user.email} <br />
            <button onClick={handleLogout}>
              Logout{" "}
              <span>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
