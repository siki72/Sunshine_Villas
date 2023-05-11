import React, { useEffect, useState } from "react";
import { format, compareAsc } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookDatas, setBookDatas } from "../feature/villa1.slice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import utils from "../users/utilsFunctions.js";
const VillasDatas = ({ id }) => {
  const data = useSelector((state) => state.villa_1_book.book);
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const actuelDate = new Date();
  const date = actuelDate.toISOString().slice(0, 10);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const body = {
          id,
        };
        const response = await fetch(`${import.meta.env.VITE_URL_ADMIN}data`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((resp) => resp.json())

          .then((data) => {
            data.flatMap((date) => date.start_date.split("T", 1));
            dispatch(setBookDatas(data));
          })
          .finally(() => setReady(true));
      } catch (error) {
        const errorDatas = {
          url: `${import.meta.env.VITE_URL_ADMIN}data`,
          message: error.message,
          stackTrace: error.stack,
        };
        await utils.sendErrorDatas(errorDatas);
      }
    };
    getDatas();
  }, [id]);

  const compareDates = (date1, date2) => {
    return compareAsc(new Date(date1), new Date(date2));
  };

  const handleDeleteRow = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_ADMIN}bookings/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("unable to delelte datas");
      } else {
        dispatch(deleteBookDatas(id));
      }
    } catch (error) {
      const errorDatas = {
        url: `${import.meta.env.VITE_URL_ADMIN}bookings/${id}`,
        message: error.message,
        stackTrace: error.stack,
      };
      await utils.sendErrorDatas(errorDatas);
    }
  };
  console.log(data);

  return (
    <div className="data">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>firstname</th>
            <th>lastname</th>
            <th>email</th>
            <th>Checkin</th>
            <th>Checkout</th>
            <th>Nights</th>
            <th>date of reservation</th>
            <th>Total</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {ready &&
            data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.firstname}</td>
                <td>{row.lastname}</td>
                <td>{row.email}</td>

                <td
                  className={
                    compareDates(row.start_date, date) === -1
                      ? "red-background"
                      : "green-background"
                  }
                >
                  {format(new Date(row.start_date), "dd/MM/yyyy")}
                </td>
                <td
                  className={
                    compareDates(row.end_date, date) === -1
                      ? "red-background"
                      : "green-background"
                  }
                >
                  {format(new Date(row.end_date), "dd/MM/yyyy")}
                </td>
                <td>{row.nights}</td>
                <td>{format(new Date(row.created_at), "dd/MM/yyyy")}</td>
                <td>{row.total_price} euros</td>
                <td
                  className="dlt-td"
                  onClick={() => {
                    if (
                      window.confirm(
                        "do you really want to remove this booking ?"
                      )
                    )
                      handleDeleteRow(row.id);
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default VillasDatas;
