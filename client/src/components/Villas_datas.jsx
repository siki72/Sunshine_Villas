import React, { useEffect, useState } from "react";
import { format } from "date-fns";
const Villas_datas = ({ id }) => {
  console.log(id);
  const [data, setData] = useState([]);
  useEffect(() => {
    const body = {
      id,
    };
    const getDatas = async () => {
      const response = await fetch("https://alimissoum.app.3wa.io/admin/data", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json ; charset=UTF-8",
        },
      });
      return response.json().then((data) => {
        console.log(data);
        setData(data);
      });
    };
    getDatas();
  }, [id]);
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
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.firstname}</td>
              <td>{row.lastname}</td>
              <td>{row.email}</td>
              <td>{format(new Date(row.start_date), "dd/MM/yyyy")}</td>
              <td>{format(new Date(row.end_date), "dd/MM/yyyy")}</td>
              <td>{row.nights}</td>
              <td>{row.total_price} euros</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Villas_datas;
