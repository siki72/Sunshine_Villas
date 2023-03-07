import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../components/Navigation";

const Villa_1_bed = () => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className="booking">
      <div className="container">
        <h2>choose your stay</h2>
        <div className="head-div">
          <h3>sunshine villas</h3>
        </div>

        <div className="search-booking">
          <FontAwesomeIcon icon={faCalendarDays} />
          <span className="search-span">{`${format(
            date[0].startDate,
            "dd/MM/yy"
          )} to ${format(date[0].endDate, "dd/MM/yy")}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Villa_1_bed;
