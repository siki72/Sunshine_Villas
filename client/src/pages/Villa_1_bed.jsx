import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swiper_img_1 from "../components/swiper/imgs/Swiper_img_1";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faHouse,
  faPerson,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useParams } from "react-router-dom";

const Villa_1_bed = () => {
  const { id } = useParams();
  console.log(id);

  const [openDate1, setOpenDate1] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className="booking">
      <div
        style={{
          backgroundImage: `url(../img/home/choose_villas.jpeg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="main_img"
      ></div>

      <div className="container">
        <h2>choose your stay</h2>
        <div className="head-div">
          <h3>sunshine villas</h3>
        </div>

        <div className="choose-villas">
          <div className="choose-villa-card">
            <div className="swipe">
              <Swiper_img_1 />
            </div>
            <div className="choose-villa-infos">
              <div className="card-infos">
                <h2>1 BEDROOM APARTMENT</h2>
                <div className="guests">
                  <div className="infos">
                    <span>
                      <FontAwesomeIcon className="icons" icon={faUsers} />{" "}
                    </span>
                    <span>2</span>
                    {""}

                    <span className="house">
                      <FontAwesomeIcon className="icons" icon={faHouse} />{" "}
                    </span>

                    <span>40 m2</span>
                  </div>
                  <div className="header-book">
                    <FontAwesomeIcon
                      className="headerIcon"
                      icon={faCalendarDays}
                    />
                    <span
                      onClick={() => setOpenDate1(!openDate1)}
                      className="headerSearchText"
                    >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                      date[0].endDate,
                      "dd/MM/yyyy"
                    )}`}</span>
                  </div>
                  <div className="date">
                    {openDate1 && (
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="date"
                      />
                    )}
                  </div>
                </div>
                <Link className="button-book">
                  <button id="button">book now </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Villa_1_bed;
