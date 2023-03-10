import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../users/UserContext.jsx";
import index from "../components/Routes/index";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Mybookings = () => {
  const { user } = useContext(UserContext);

  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    fetch("https://alimissoum.app.3wa.io/bookings", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => setMyBookings(data));
  }, []);

  return (
    <div className="container-bookings">
      {!myBookings ? (
        <div className="loader">chargement ,,</div>
      ) : (
        myBookings.map((resa, index) => (
          <Link to={`/villas/${resa.id}`} key={index}>
            <div className="reservation-grid">
              <div
                style={{
                  backgroundImage: `url(${resa.url})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  objectFit: "cover",
                }}
                className="res-img"
              ></div>
              <div className="res-infos">
                <h2>Your booking details : </h2>
                <h3>
                  Villa: <span> {resa.name}</span>{" "}
                </h3>

                <div className="res-date">
                  <div className="start">
                    <p>Check-in</p>
                    <h4>
                      {" "}
                      {format(new Date(resa.start_date), "EEEE dd/MM/yyyy")}
                    </h4>
                    <p>From 4:00 PM</p>
                  </div>
                  <div className="end">
                    <p>Check-out</p>
                    <h4>
                      {format(new Date(resa.end_date), "EEEE dd/MM/yyyy")}
                    </h4>
                    <p>Until 11:00 AM</p>
                  </div>
                </div>
                <div className="totals">
                  <p>Total length of stay : </p>
                  <h4>{resa.nights} nights</h4>
                  <div>Total price : {resa.total_price} euros </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Mybookings;
