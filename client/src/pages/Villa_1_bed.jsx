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
import { faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";
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
import { Modal, Button, Alert, Toast } from "flowbite-react";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Villa_1_bed = () => {
  const { slug } = useParams();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [villaInfos, setVillaInfos] = useState([]);
  const [idReady, setIdReady] = useState(false);
  const cards = useSelector((state) => state.threeCards.cards);
  const [jsonData, setJsonData] = useState([]);
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
  console.log(slug);
  useEffect(() => {
    try {
      const idOfSelectedvilla = {
        idVilla: id,
      };
      fetch("https://alimissoum.app.3wa.io/villas/villas/availableDates", {
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
    fetch(`https://alimissoum.app.3wa.io/villas/villa/${id}`)
      .then((resp) => resp.json())
      .then((data) => setVillaInfos(data));
    setIdReady(true);
  }, [id]);

  return (
    <div className="booking">
      <header className="header_img">
        <img
          src="../../img/home/choose-villas.webp"
          alt="general villas view"
        />
      </header>
      <main className="container">
        <div className="title-choose">
          <h1>Choose your stay</h1>
          <Modal
            className="backdrop-blur-sm"
            show={isReserved}
            onClose={closeModal}
          >
            <Modal.Header className=" text-white text-3xl text-center bg-neutral-300 ">
              Thanks{" "}
              <span className="text-green-400 first-letter:text-xl ">
                {user?.name.toUpperCase()}
              </span>
            </Modal.Header>
            <Modal.Body className="bg-black">
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-white dark:text-gray-400">
                  Your booking at Sunshine Villas is{" "}
                  <span className="text-green-400">confirmer</span> .
                </p>
                <p className="text-base leading-relaxed text-white dark:text-gray-400">
                  Sunshine Villas all our staff is delighted to receive you !
                  Your payement will be handled directly in the reception
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer className="bg-black flex justify-center">
              <Button color="success" onClick={closeModal}>
                Done
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

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
          <div className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-indigo-400 flex-shrink-0">
            A
          </div>
        </div>
        <div className="choose-villas-cards">
          {idReady &&
            cards
              ?.filter((card) => card.id != id)
              .map((card) => <CardVilla key={card.id} card={card} />)}
        </div>
      </main>
    </div>
  );
};

export default Villa_1_bed;
