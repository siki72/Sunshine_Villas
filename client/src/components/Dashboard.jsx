import React, { Profiler, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faHotel } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
const Dashboard = () => {
  const [profits, setProfits] = useState([]);
  const [somme, setSomme] = useState(0);
  useEffect(() => {
    fetch("https://alimissoum.app.3wa.io/admin/widgets")
      .then((resp) => resp.json())
      .then((data) => setProfits(data));
  }, []);

  useEffect(() => {
    const sum = profits.reduce((acc, cur) => acc + cur.total_price, 0);
    setSomme(sum);
  }, [profits]);

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
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
          <h3>We have : {profits.length}</h3>
          <h5>reservation(s) today</h5>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
