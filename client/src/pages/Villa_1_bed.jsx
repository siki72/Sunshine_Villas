import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swiper_img_1 from "../components/swiper/imgs/Swiper_img_1";
import { differenceInCalendarDays, format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useParams } from "react-router-dom";
import Swiper_img_3 from "../components/swiper/imgs/Swiper_img_3.jsx";
import Swiper_img_2 from "../components/swiper/imgs/Swiper_img_2.jsx";
import { UserContext } from "../users/UserContext.jsx";
import { userSlice } from "../feature/user.slice";
import CardVilla from "../components/CardVilla.jsx";
import { useSelector } from "react-redux";

const Villa_1_bed = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [villaInfos, setVillaInfos] = useState([]);
  const [idReady, setIdReady] = useState(false);
  const cards = useSelector((state) => state.threeCards.cards);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const checkIn = date[0].startDate;
  const checkOut = date[0].endDate;

  let numberOfnights = "";
  if (checkIn && checkOut) {
    numberOfnights = differenceInCalendarDays(checkOut, checkIn);
  }
  const handleBooking = () => {
    if (checkIn < checkOut) {
      const reservationData = {
        checkIn,
        checkOut,
        villaId: id,
        userId: user.id,
        nights: numberOfnights,
        total: numberOfnights * villaInfos.price,
      };
      try {
        fetch("https://alimissoum.app.3wa.io/booking", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(reservationData),
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please select ?? chekout !");
    }
  };

  useEffect(() => {
    fetch(`https://alimissoum.app.3wa.io/villas/${id}`)
      .then((resp) => resp.json())
      .then((data) => setVillaInfos(data));
    setIdReady(true);
    console.log("redy");
  }, [id]);

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
        <div className="title-choose">
          <h3>Choose your stay</h3>
        </div>

        <div className="choose-villas">
          <div className="choose-villa-card">
            <div className="swipe">
              {id == 1 && <Swiper_img_1 />}
              {id == 2 && <Swiper_img_2 />}
              {id == 3 && <Swiper_img_3 />}
            </div>
            <div className="choose-villa-infos">
              <div className="card-infos">
                <h2>{villaInfos.name}</h2>
                <div className="guests">
                  <div className="infos">
                    <div>
                      <span>
                        <FontAwesomeIcon className="icons" icon={faUsers} />{" "}
                      </span>
                      <span> {villaInfos.max_guests} </span>
                      {""}

                      <span className="house">
                        <FontAwesomeIcon className="icons" icon={faHouse} />{" "}
                      </span>

                      <span>{villaInfos.area} m2</span>
                    </div>
                    <span className="price">
                      {villaInfos.price} ??? / per night
                    </span>
                  </div>

                  <div className="date">
                    {user ? (
                      <>
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setDate([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={date}
                          className="date"
                        />
                      </>
                    ) : (
                      <div className="link">
                        <Link to={""}>
                          <p>Authentifiaction required ,, Please login</p>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                {user ? (
                  <div className="button-book">
                    <button id="button" onClick={handleBooking}>
                      {user ? "Book now   " : "Login"}
                      {numberOfnights > 0 ? (
                        <span> : {numberOfnights * villaInfos.price} ???</span>
                      ) : (
                        ""
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="button-book">
                    <button id="button">{user ? "Book now" : "Login"}</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="title-cards">
          <h3>Check our others luxury villas and apartments</h3>
        </div>
        <div className="choose-villas-cards">
          {idReady &&
            cards
              ?.filter((card) => card.id != id)
              .map((card) => <CardVilla key={card.id} card={card} />)}
        </div>
      </div>
    </div>
  );
};

export default Villa_1_bed;
