import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import utils from "../users/utilsFunctions.js";
const Walima_datas = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleGetReservation = async () => {
      try {
        const response = await utils.fetchAdminDatas("walima");
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
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.guests}</td>
              {/*               <td>{format(new Date(row.date), "dd/MM/yyyy")}</td> */}
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Walima_datas;
