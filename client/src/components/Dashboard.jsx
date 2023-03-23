import React, { Profiler, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faHotel } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import Recharts from "./Recharts.jsx";
import utils from "../users/utilsFunctions.js";
const Dashboard = () => {
  const [profits, setProfits] = useState([]);
  const [somme, setSomme] = useState(0);
  const [bookingTable, setBookingTable] = useState([]);
  useEffect(() => {
    fetch("https://alimissoum.app.3wa.io/admin/widgets")
      .then((resp) => resp.json())
      .then((data) => setProfits(data));
  }, []);

  useEffect(() => {
    const sum = profits.reduce((acc, cur) => acc + cur.total_price, 0);
    setSomme(sum);
  }, [profits]);

  useEffect(() => {
    const handleGetReservation = async () => {
      try {
        const response = await utils.fetchAdminDatas("walima");
        if (!response.ok) {
          throw new Error("unable to fetch table's reservation");
        } else {
          const data = await response.json();
          console.log(data);
          setBookingTable(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleGetReservation();
  }, []);

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <div className="widget profit">
          <span>
            <FontAwesomeIcon icon={faArrowTrendUp} />
          </span>

          <h3>{bookingTable.length} </h3>

          <h5>reservations for walima today</h5>
        </div>
        <div className="widget profit">
          <span>
            <FontAwesomeIcon icon={faArrowTrendUp} />
          </span>

          <h3>{somme} euros</h3>

          <h5>profit today</h5>
        </div>
        <div className="widget reservation">
          <span>
            <FontAwesomeIcon icon={faHotel} />
          </span>
          <h3>{profits.length} / 3 </h3>
          <h5>villas are booked today</h5>
        </div>
      </div>
      <div className="recharts">
        <Recharts />
        <div className="legend">
          <div className="legend-flex villa-1-bed">
            <div></div> <span>Villa 1 bed</span>
          </div>
          <div className="legend-flex villa-2-bed">
            <div></div> <span>Villa 2 bed</span>
          </div>
          <div className="legend-flex villa-3-bed">
            <div></div> <span>Villa 3 bed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
