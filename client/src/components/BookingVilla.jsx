import React, { useContext, useEffect, useState } from "react";
import Swiper_img_1 from "../components/swiper/imgs/Swiper_img_1";
import Swiper_img_3 from "../components/swiper/imgs/Swiper_img_3.jsx";
import Swiper_img_2 from "../components/swiper/imgs/Swiper_img_2.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../users/UserContext.jsx";
import { Link } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  differenceInCalendarDays,
  parseISO,
  eachDayOfInterval,
} from "date-fns";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const BookingVilla = ({ slug, id, setIdReady, setIsReserved }) => {
  const [villaInfos, setVillaInfos] = useState([]);
  const { user, setMailConfirmed, mailConfirmed } = useContext(UserContext);
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const selectedDates = date.flatMap((range) =>
    eachDayOfInterval({
      start: range.startDate.getTime(),
      end: range.endDate.getTime(),
    })
  );

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_URL_USER}profile`, {
          credentials: "include",
        });
        if (resp.status === 200) {
          const data = await resp.json();
          console.log(data);
          if (data.emailStatus) {
            setMailConfirmed(true);
          } else {
            setMailConfirmed(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDatas();
  }, [id]);
  const handleBooking = () => {
    if (checkIn < checkOut) {
      setLoading(true);
      const reservationData = {
        slug,
        checkIn,
        checkOut,
        villaId: id,
        userId: user.id,
        nights: numberOfnights,
        total: numberOfnights * villaInfos.price,
        selectedDates: JSON.stringify(selectedDates),
      };
      try {
        fetch(`${import.meta.env.VITE_URL_VILLAS_BOOKING}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(reservationData),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setLoading(false);
            setIsReserved(true);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please select à chekout !");
    }
  };
  //import datas villa by villa id
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_VILLAS}${id}`)
      .then((resp) => resp.json())
      .then((data) => setVillaInfos(data));
    setIdReady(true);
  }, [id]);

  //import availables dates to book from DB
  useEffect(() => {
    try {
      const idOfSelectedvilla = {
        idVilla: id,
      };
      fetch(`${import.meta.env.VITE_URL_AVAILAIBLES_DATES}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(idOfSelectedvilla),
      })
        .then((resp) => resp.json(resp))
        .then((data) => {
          const t = data.flatMap((item) => JSON.parse(item.selected_dates));

          setJsonData(t);
        });
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    const checkConfirmationMailStaus = async (id) => {
      await fetch(`${import.meta.env.VITE_URL_USER}`);
    };
  }, []);

  return (
    <div className="choose-villas">
      <div className="choose-villa-card">
        <div className="swipe">
          {slug === "1-BED-APARTEMENT" && <Swiper_img_1 />}
          {slug === "2-BED-VILLA" && <Swiper_img_2 />}
          {slug === "3-BED-VILLA" && <Swiper_img_3 />}
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
                <span className="price">{villaInfos.price} € / per night</span>
              </div>

              <div className="date">
                {user ? (
                  mailConfirmed ? (
                    <>
                      <DateRange
                        months={1}
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        minDate={new Date()}
                        disabledDates={jsonData.map((a) => parseISO(a))}
                        ranges={date}
                        className="date"
                      />
                    </>
                  ) : (
                    <p>Please confirm your email address to book a villa. </p>
                  )
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
              mailConfirmed ? (
                <div className="button-book">
                  {loading ? (
                    <BarLoader
                      color="#8381a5"
                      loading={loading}
                      cssOverride={override}
                      size={300}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    <button id="button" onClick={handleBooking}>
                      {user ? "Book now   " : "Login"}
                      {numberOfnights > 0 ? (
                        <span> : {numberOfnights * villaInfos.price} €</span>
                      ) : (
                        ""
                      )}
                    </button>
                  )}
                </div>
              ) : (
                ""
              )
            ) : (
              <div className="button-book">
                <Link to={"/login"}>
                  <button id="button">{user ? "Book now" : "Login"}</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingVilla;
