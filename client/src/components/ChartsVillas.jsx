import React, { useEffect, useRef, useState } from "react";
import utils from "../users/utilsFunctions.js";
import Chart from "chart.js/auto";
import { format } from "date-fns";
import WorldMapUser from "./WorldMapUser.jsx";

const ChartsVillas = () => {
  const chartRef = useRef(null);
  const lineRef = useRef(null);
  const [bookings, setBookings] = useState([]);
  const [profits, setProfits] = useState([]);
  const bookingVilla1 = bookings.filter((villa) => villa.villa_id === 1);
  const bookingVilla2 = bookings.filter((villa) => villa.villa_id === 2);
  const bookingVilla3 = bookings.filter((villa) => villa.villa_id === 3);

  useEffect(() => {
    const fetchProfts = async () => {
      try {
        const datas = await fetch(import.meta.env.VITE_URL_BOOKING_PROFITS);
        if (datas.status === 200) {
          const data = await datas.json();
          setProfits(data.map(({ day, profit }) => ({ day, profit })));
        }
      } catch (error) {
        const errorDatas = {
          url: import.meta.env.VITE_URL_BOOKING_PROFITS,
          message: error.message,
          stackTrace: error.stack,
        };
        const log = await utils.sendErrorDatas(errorDatas);
      }
    };
    fetchProfts();
  }, [bookings]);
  useEffect(() => {
    const villa1Percentage = (bookingVilla1.length / bookings.length) * 100;
    const villa2Percentage = (bookingVilla2.length / bookings.length) * 100;
    const villa3Percentage = (bookingVilla3.length / bookings.length) * 100;
    const chartRefCurrent = chartRef.current;
    const chart = new Chart(chartRefCurrent, {
      type: "pie",
      data: {
        labels: [" 1 bed appartement", "villa 2 bed", "Villa 3 bed"],
        datasets: [
          {
            label: "Bookings",
            data: [villa1Percentage, villa2Percentage, villa3Percentage],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Percentage of reservation of villas",
          },
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, [bookings]);
  useEffect(() => {
    const handleFetchBookings = async () => {
      try {
        const datas = await fetch(import.meta.env.VITE_URL_BOOKING_PERCENTAGE, {
          credentials: "include",
        });
        if (datas.status === 200) {
          const reserations = await datas.json();
          setBookings(reserations);
        } else {
          throw new Error("unable to fetch datas");
        }
      } catch (error) {
        const errorDatas = {
          url: import.meta.env.VITE_URL_BOOKING_PROFITS,
          message: error.message,
          stackTrace: error.stack,
        };
        const log = await utils.sendErrorDatas(errorDatas);
      }
    };
    handleFetchBookings();
  }, []);

  useEffect(() => {
    const lineRefCurrent = lineRef.current;
    const chart = new Chart(lineRefCurrent, {
      type: "line",
      data: {
        labels: profits.map(({ day }) => format(new Date(day), "dd/MM/yyyy")),
        datasets: [
          {
            label: "Profits",
            data: profits.map(({ profit }) => profit),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Last 7 days profits",
          },
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, [profits]);
  return (
    <>
      <div className="charts_container">
        <canvas ref={chartRef} className="myChart"></canvas>
        <canvas ref={lineRef} className="myChart"></canvas>
      </div>
      <div className="world-map">
        <div className="widget">
          <h3>Guest's location Map</h3>
        </div>
        <WorldMapUser />
      </div>
    </>
  );
};

export default ChartsVillas;
