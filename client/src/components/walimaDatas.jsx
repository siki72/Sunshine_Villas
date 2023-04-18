import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
const WalimaDatas = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleGetReservation = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_ADMIN}walima`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("unable to fetch table's reservation");
        } else {
          const data = await response.json();
          console.log(data);
          setData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleGetReservation();
  }, []);

  const handleDeleteRow = async (id) => {
    await fetch("");
  };

  return (
    <div className="data">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>guests</th>
            <th>date</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.guests}</td>
              <td>{row.date}</td>
              <td className="dlt-td" onClick={() => handleDeleteRow(row.id)}>
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

export default WalimaDatas;
