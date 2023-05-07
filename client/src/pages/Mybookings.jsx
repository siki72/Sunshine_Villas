import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../users/UserContext.jsx";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyBookingsSkeleton from "../components/MyBookingsSkeleton.jsx";
import utils from "../users/utilsFunctions.js";

const MyBookings = () => {
  const { user } = useContext(UserContext);

  const [myBookings, setMyBookings] = useState([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);
        const response = await fetch(
          `${import.meta.env.VITE_URL_VILLAS_USER}myBookings`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          setPending(false);
          throw new Error("network response fail");
        }
        const data = await response.json();
        setMyBookings(data);
        setPending(false);
      } catch (error) {
        const errorDatas = {
          url: `${import.meta.env.VITE_URL_VILLAS_USER}myBookings`,
          message: error.message,
          stackTrace: error.stack,
        };
        await utils.sendErrorDatas(errorDatas);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-bookings">
      {!myBookings.length ? (
        <div className="myBookings">
          <div className="no-bookings">
            <h1>Ooops ! {user?.name} ..</h1>
            <p>
              you have no reservation for the moment, but you can go and see our
              villas by following this link
            </p>
            <Link to={"/villas/1-BED-APARTEMENT/1"}>
              <button className="btn click">visit ours villas</button>
            </Link>
          </div>
        </div>
      ) : pending ? (
        <MyBookingsSkeleton />
      ) : (
        myBookings?.map((resa, index) => (
          <Link to={`/villas/${resa.name}/${resa.id}`} key={index}>
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

export default MyBookings;
