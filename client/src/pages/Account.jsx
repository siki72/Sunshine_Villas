import React, { useContext } from "react";
import { Link, Navigate, NavLink, useParams } from "react-router-dom";
import { UserContext } from "../users/UserContext.jsx";

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

  function linkClasses(type = null) {
    let classes = "link";
    if (type === pages || (pages === undefined && type === "")) {
      classes += " active";
    }
    return classes;
  }
  return (
    <div className="account-container">
      <div className="container">
        <nav className="nav-book">
          <Link className={linkClasses("")} to={"/account"}>
            My profile
          </Link>
          <Link className={linkClasses("bookings")} to={"/account/bookings"}>
            My Booking
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Account;
