import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEuroSign,
  faHotel,
  faUser,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import utils from "../users/utilsFunctions.js";
import { useEffect } from "react";
import ChartsVillas from "./ChartsVillas.jsx";

const Dashboard = () => {
  const [profits, setProfits] = useState([]);
  const [somme, setSomme] = useState(0);
  const [bookingTable, setBookingTable] = useState([]);
  const [guests, setGuests] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_ADMIN}widgets`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => setProfits(data));
  }, []);

  useEffect(() => {
    const sum = profits.reduce((acc, cur) => acc + cur.total_price, 0);
    setSomme(sum);
  }, [profits]);

  useEffect(() => {
    const getWalimaReservation = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_ADMIN}walima`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("unable to fetch table's reservation");
        } else {
          const data = await response.json();
          setBookingTable(data);
        }
      } catch (error) {
        const errorDatas = {
          url: `${import.meta.env.VITE_URL_ADMIN}walima`,
          message: error.message,
          stackTrace: error.stack,
        };
        await utils.sendErrorDatas(errorDatas);
      }
    };
    getWalimaReservation();
  }, []);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_ADMIN}users`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("unable to fetch users from DB");
        } else {
          const data = await response.json();
          setGuests(data);
        }
      } catch (error) {
        const errorDatas = {
          url: `${import.meta.env.VITE_URL_ADMIN}users`,
          message: error.message,
          stackTrace: error.stack,
        };
        await utils.sendErrorDatas(errorDatas);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <div className="widget walima">
          <div className="items">
            <span></span>

            <h3>{bookingTable.length} </h3>

            <h5>Walima reservation</h5>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faUtensils} />
          </div>
        </div>
        <div className="widget profit">
          <div className="items">
            <span></span>

            <h3>{somme} euros</h3>

            <h5>profit today</h5>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faEuroSign} />
          </div>
        </div>
        <div className="widget villa">
          <div className="items">
            <span></span>
            <h3>{profits.length} / 3 </h3>
            <h5>villas are booked today</h5>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faHotel} />
          </div>
        </div>
        <div className="widget users">
          <div className="items">
            <span></span>
            <h3>{guests.length} </h3>
            <h5>registered users</h5>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>
      <ChartsVillas />
    </div>
  );
};

export default Dashboard;
