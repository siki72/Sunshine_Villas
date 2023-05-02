import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const ChartsVillas = () => {
  const chartRef = useRef(null);
  const [bookings, setBookings] = useState([]);
  const bookingVilla1 = bookings.filter((villa) => villa.villa_id === 1);
  const bookingVilla2 = bookings.filter((villa) => villa.villa_id === 2);
  const bookingVilla3 = bookings.filter((villa) => villa.villa_id === 3);
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
        const datas = await fetch(
          "https://alimissoum.app.3wa.io/admin/villas/bookings",
          { credentials: "include" }
        );
        if (datas.status === 200) {
          const reserations = await datas.json();
          setBookings(reserations);
        } else {
          alert("rien");
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchBookings();
  }, []);
  useEffect(() => {});
  return (
    <div className="charts_container">
      <canvas ref={chartRef} id="myChart"></canvas>
    </div>
  );
};

export default ChartsVillas;
