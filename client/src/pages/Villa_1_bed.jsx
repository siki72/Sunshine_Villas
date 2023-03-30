import React, { useContext, useEffect, useState, CSSProperties } from "react";
import { Link } from "react-router-dom";
import Swiper_img_1 from "../components/swiper/imgs/Swiper_img_1";
import {
  differenceInCalendarDays,
  parseISO,
  format,
  eachDayOfInterval,
} from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faHouse,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useParams } from "react-router-dom";
import Swiper_img_3 from "../components/swiper/imgs/Swiper_img_3.jsx";
import Swiper_img_2 from "../components/swiper/imgs/Swiper_img_2.jsx";
import { UserContext } from "../users/UserContext.jsx";
import CardVilla from "../components/CardVilla.jsx";
import { useSelector } from "react-redux";
import BarLoader from "react-spinners/BarLoader";
import ReactModal from "react-modal";
import Modal_content from "../components/Modal_content.jsx";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Villa_1_bed = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [villaInfos, setVillaInfos] = useState([]);
  const [idReady, setIdReady] = useState(false);
  const cards = useSelector((state) => state.threeCards.cards);
  const [jsonData, setJsonData] = useState([]);
  const [jsonReady, setJsonReady] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
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
  function closeModal() {
    setIsReserved(false);
    window.location.reload(false);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#aaa1a1";
  }

  const handleBooking = () => {
    if (checkIn < checkOut) {
      setLoading(true);
      const reservationData = {
        checkIn,
        checkOut,
        villaId: id,
        userId: user.id,
        nights: numberOfnights,
        total: numberOfnights * villaInfos.price,
        selectedDates: JSON.stringify(selectedDates),
      };
      try {
        fetch("https://alimissoum.app.3wa.io/booking", {
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

  useEffect(() => {
    try {
      const idOfSelectedvilla = {
        idVilla: id,
      };
      fetch("https://alimissoum.app.3wa.io/availableDates", {
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

  const selectedDates = date.flatMap((range) =>
    eachDayOfInterval({
      start: range.startDate.getTime(),
      end: range.endDate.getTime(),
    })
  );

  useEffect(() => {
    fetch(`https://alimissoum.app.3wa.io/villas/${id}`)
      .then((resp) => resp.json())
      .then((data) => setVillaInfos(data));
    setIdReady(true);
  }, [id]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (isReserved) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  }, [isReserved]);

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
          <h1>Choose your stay</h1>
        </div>

        <div className="choose-villas">
          <div className="choose-villa-card">
            <div className="swipe">
              {id == 1 && <Swiper_img_1 />}
              {id == 2 && <Swiper_img_2 />}
              {id == 3 && <Swiper_img_3 />}
            </div>
            {isReserved && (
              <ReactModal
                closeTimeoutMS="4000"
                className="modale"
                isOpen={isReserved}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="confirmation of sending a message"
              >
                <Modal_content user={user} closeModal={closeModal} />
              </ReactModal>
            )}
            {/*     <ReservationPopUp setopen={setIsReserved} /> */}
            {}
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
                      {villaInfos.price} € / per night
                    </span>
                  </div>

                  <div className="date">
                    {user ? (
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
